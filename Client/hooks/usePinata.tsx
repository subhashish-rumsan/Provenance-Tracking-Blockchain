"use client";
import { useState } from "react";
import { UploadFilePropsI } from "@types";
import snackbar from "@components/snackbar";
import axios from "axios";
import useContract from "./useContract";

const usePinata = () => {
  const [file, setFile] = useState("");
  const [cid, setCid] = useState("");
  const [uploading, setUploading] = useState(false);

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const { contract } = useContract();

  const uploadFile = async ({
    model,
    plate,
    description,
    file,
  }: UploadFilePropsI) => {
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("carModel", model);
      formData.append("carPlate", plate);
      formData.append("carDescription", description);
      formData.append("file", file);
      const res = await axios.post(`${BACKEND_URL}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // setCid(ipfsHash);
      const transaction = await contract.mintCar(
        model,
        "HX",
        res?.data?.IpfsHash,
        5000
      );
      console.log("transaction", transaction);
      await transaction.wait();
      console.log("Response", res);
      setUploading(false);
      snackbar.success("Successfully Uploaded");
    } catch (e) {
      console.log(e);
      setUploading(false);
      snackbar.error("Trouble uploading file. Please try again.");
    }
  };
  return { file, cid, uploading, uploadFile };
};

export default usePinata;
