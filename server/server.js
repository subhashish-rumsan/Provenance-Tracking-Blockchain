require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const pinataSDK = require("@pinata/sdk");
const cors = require("cors");
const busboy = require("busboy");
const { Readable } = require("stream");

const port = process.env.PORT || 5000;
const PINATA_JWT = process.env.PINATA_JWT;

const pinata = new pinataSDK({ pinataJWTKey: PINATA_JWT });

const PINATA_GATEWAY = "https://gateway.pinata.cloud/ipfs/";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const busboyFileHandler = (req, res, next) => {
  const bb = busboy({ headers: req.headers });
  const payload = {};
  let fileName;
  bb.on("field", (fieldname, val) => {
    payload[fieldname] = JSON.parse(val);
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
      ...payload.metadata,
      image: imageURL,
      createdAt: new Date(),
    };
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

app.post("/upload", async (req, res) => {
  busboyFileHandler(req, res);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
