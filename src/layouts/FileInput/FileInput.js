import React, { useRef, useState } from "react";
import uploadImg from "../../assets/images/upload.png";
import "./fileInputStyles.css";

const FileInput = ({ onFileChange }) => {
  const wrapperRef = useRef(null);
  const [fileList, setFileList] = useState([]);

  const onDragEnter = () => wrapperRef.current.classList.add("dragover");
  const onDragLeave = () => wrapperRef.current.classList.remove("dragover");
  const onDrop = () => wrapperRef.current.classList.remove("dragover");

  const onFileDrop = (e) => {
    const newFile = e.target.files[0];
    if (newFile) {
      const updatedList = [...fileList, newFile];
      setFileList(updatedList);
      onFileChange(updatedList);
    }
  };

  return (
    <div
      ref={wrapperRef}
      className="drop-file-input relative w-[400px] h-44 border-2 border-dashed border-sky-700 rounded-2xl flex items-center justify-center hover:opacity-60 dragover:opacity-60"
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <div className="drop-file-input__label flex flex-col items-center text-center font-semibold p-2.5">
        <img src={uploadImg} alt="Subir imagen" className="w-24" />
        <p>Arrastra y soltá la imagen que quieras subir</p>
      </div>
      <input
        className="opacity-0 absolute top-0 left-0 w-full h-full cursor-pointer"
        type="file"
        value=""
        onChange={onFileDrop}
      />
    </div>
  );
};

export default FileInput;
