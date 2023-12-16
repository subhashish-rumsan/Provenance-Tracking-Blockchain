"use client";
import { useState } from "react";
import { UploadFilePropsI } from "@types";
import snackbar from "@components/snackbar";

const usePinata = () => {
  const [file, setFile] = useState("");
  const [cid, setCid] = useState("");
  const [uploading, setUploading] = useState(false);

  const uploadFile = async ({ fileToUpload }: UploadFilePropsI) => {
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", fileToUpload, fileToUpload.name);
      const res = await fetch("/api/v1/upload", {
        method: "POST",
        body: formData,
      });
      // setCid(ipfsHash);
      console.log("Response", res);
      setUploading(false);
    } catch (e) {
      console.log(e);
      setUploading(false);
      snackbar.error("Trouble uploading file. Please try again.");
    }
  };
  return { file, cid, uploading, uploadFile };
};

export default usePinata;
