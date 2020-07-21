import React, { useState } from "react";
import { storage } from "../database/firebase";

export default function Storage() {
  const [file, setFile] = useState("");
  const [link, setLink] = useState("");

  const mainBucketRef = storage.child("mainBucket");
  const subBucketRef = storage.child("mainBucket/subBucket");
  const uploadHandler = (e) => {
    e.preventDefault();
    if (!!file) {
      const fileName = file.name;
      const targetRef = subBucketRef.child(fileName);
      targetRef.put(file).then((response) => {
        console.log(response);
        response.ref.getDownloadURL().then((photoURL) => {
          console.log(photoURL);
          setLink(photoURL);
        });
      });
    } else {
      console.log("not file upload!!");
    }
  };
  return (
    <div className="container mt-4">
      <form className="d-flex justify-content-center align-items-center">
        <div style={{ display: "block", position: "relative" }}>
          <input
            type="file"
            className="custom-file-input"
            id="customFile"
            onChange={(e) => {
              const file = e.target.files[0];
              setFile(file);
              setLink("");
            }}
          ></input>
          <label className="custom-file-label" htmlFor="customFile">
            {!file ? <div>เลือกรูปภาพ</div> : <div>{file.name}</div>}
          </label>
        </div>
        <div className="ml-3">
          <button
            type="submit"
            onClick={uploadHandler}
            className="btn btn-success"
          >
            Upload
          </button>
        </div>
      </form>
      {!!link ? (
        <div className="text-center mt-4">
          <hr></hr>
          <a className="text-secondary" href={link}>
            คลิกไฟล์ {file.name}
          </a>
        </div>
      ) : null}
    </div>
  );
}
