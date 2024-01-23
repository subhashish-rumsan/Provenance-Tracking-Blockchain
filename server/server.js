require("dotenv").config();
const { Sequelize, Op, Model, DataTypes } = require("sequelize");
const db = require("./db");
const express = require("express");
const bodyParser = require("body-parser");
const pinataSDK = require("@pinata/sdk");
const cors = require("cors");
const busboy = require("busboy");
const { Readable } = require("stream");

const port = process.env.PORT || 5000;
const PINATA_JWT = process.env.PINATA_JWT;

const pinata = new pinataSDK({ pinataJWTKey: PINATA_JWT });

const PINATA_GATEWAY = process.env.PINATA_GATEWAY;

const app = express();
app.use(cors());
app.use(bodyParser.json());

async function insertCar(metadata) {
  try {
    const car = await Car.create({
      model: metadata.carModel,
      number: metadata.carPlate,
      description: metadata.carDescription,
      imgUrl: metadata.image,
    });
    return car;
  } catch (error) {
    console.log(error);
  }
}

const busboyFileHandler = (req, res, next) => {
  const bb = busboy({ headers: req.headers });
  const payload = {};
  let fileName;
  bb.on("field", (fieldname, val) => {
    payload[fieldname] = val;
  });
  let buffer = Buffer.alloc(0);
  bb.on("file", async (field, file, filename) => {
    file.on("data", (data) => {
      fileName = filename.filename;
      buffer = Buffer.concat([buffer, data]);
    });
  });
  bb.on("error", (err) => {
    next(err);
  });
  bb.on("finish", async () => {
    const options = {
      pinataMetadata: {
        name: fileName,
      },
    };
    const readableStream = Readable.from(buffer);
    const result = await pinata.pinFileToIPFS(readableStream, options);
    const imageURL = `${PINATA_GATEWAY}/${result.IpfsHash}`;
    let metadata = {
      ...payload,
      image: imageURL,
      createdAt: new Date(),
    };
    // upload metadata to db
    const out = await insertCar(metadata);

    const metadataString = JSON.stringify(metadata);
    const metadataReadableStream = Readable.from(metadataString);
    const metadataOptions = {
      pinataMetadata: {
        name: `${fileName}_metadata`,
      },
    };
    let metadataResult = await pinata.pinFileToIPFS(
      metadataReadableStream,
      metadataOptions
    );
    metadataResult.IpfsHash = `${PINATA_GATEWAY}/${metadataResult.IpfsHash}`;
    console.log(JSON.stringify(result));
    res.json(metadataResult);
  });
  req.pipe(bb);
};

const Car = db.define("car", {
  model: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  number: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  imgUrl: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
});

app.post("/upload", async (req, res) => {
  busboyFileHandler(req, res);
});

app.get("/getCars", async (req, res) => {
  const cars = await Car.findAll();
  res.json(cars);
});
db.authenticate()
  .then(() => {
    db.sync();
    console.log("Connection has been established successfully.");

    app.listen(port, () => {
      console.log(`Server started successfully in ${port}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
