/* eslint-disable react/prop-types */
import React from "react";
import { clsx } from "clsx";
import styled from "styled-components";
import { useDropzone } from "react-dropzone";

const Container = styled.div`
  .text {
    font-size: 14px;
  }

  .text.error-text {
    color: red;
  }

  .filename {
    font-weight: bold;
    margin-top: 9px;
  }

  .error {
    margin-top: 9px;
    font-size: 14px;
    color: red;
  }

  .download {
    margin-top: 5px;
    p {
      margin-left: 7px;
      font-size: 13px;
      font-weight: bold;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

const Inner = styled.div`
  margin-top: 30px;
  border: 3px dotted #ccc;
  padding: 30px 0;
  flex: 1;

  &.error-file {
    border: 3px dotted red;
  }
`;

const FileUploadComponent = ({ file, setFile, noFile }) => {
  const [error, setError] = React.useState("");

  const onDrop = React.useCallback(
    (acceptedFiles, rejectedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        const fileType = file.type; // Get the MIME type of the file
        if (
          fileType ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        ) {
          // Only proceed if the file is of the correct type (.xlsx)
          setFile(file);
          setError(""); // Clear any previous error message
        } else {
          setError("Only .xlsx files are allowed.");
          setFile(null);
        }
      } else if (rejectedFiles.length > 0) {
        setError("Only .xlsx files are allowed.");
        setFile(null);
      }
    },
    [setFile]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ".xlsx", // Restrict file type to .xlsx
  });

  return (
    <Container>
      <div className="flex ai-end">
        <Inner
          {...getRootProps()}
          className={clsx("dropzone center", noFile && "error-file")}
        >
          <input {...getInputProps()} />
          <p className={clsx("text", noFile && "error-text")}>
            Drag & drop an .xlsx file here, or click to select one
          </p>
        </Inner>
        <div className="download cursor">
          <p>Download sample</p>
        </div>
      </div>
      {error ? (
        <p className="error">{error}</p>
      ) : (
        <p className="filename">{file?.name}</p>
      )}
    </Container>
  );
};

export default FileUploadComponent;
