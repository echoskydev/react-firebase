import React, { useState } from "react";
import { storage } from "../database/firebase";

export default function Storage() {
  const [file, setFile] = useState("");
  const [link, setLink] = useState("");
  const [progress, setProgress] = useState(1);
  const [progressStatus, setProgressStatus] = useState(false);

  const mainBucketRef = storage.child("mainBucket");
  const subBucketRef = storage.child("mainBucket/subBucket");
  const uploadHandler = (e) => {
    e.preventDefault();
    if (!!file) {
      const fileName = file.name;
      const targetRef = subBucketRef.child(fileName);
      //   const targetRef = subBucketRef.child(
      //     `/user-profiles/${userId}/${photoURL}`
      //   );
      const uploadTask = targetRef.put(file);
      setProgressStatus(true);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        },
        (error) => {
          console.log(error);
        },
        () => {
          setProgressStatus(false);
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            setLink(downloadURL);
          });
        }
      );
      //   targetRef.put(file).then((response) => {
      //     console.log(response);
      //     response.ref.getDownloadURL().then((photoURL) => {
      //       console.log(photoURL);
      //       setLink(photoURL);
      //     });
      //   });
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

      {progressStatus ? (
        <div className="row mt-4">
          <div className="col-sm-6 mx-auto">
            <div className="progress">
              <div
                className="progress-bar progress-bar-striped bg-info"
                role="progressbar"
                style={{ width: `${progress}%` }}
                aria-valuenow={progress}
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>
        </div>
      ) : null}

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
