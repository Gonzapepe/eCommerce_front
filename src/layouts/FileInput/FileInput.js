import React, { useRef, useState } from "react";
import uploadImg from "../../assets/images/upload.png";
import { imageConfig } from "./imageConfig";
import "./fileInputStyles.css";

const FileInput = ({ onFileChange }) => {
  const wrapperRef = useRef(null);
  const [fileList, setFileList] = useState([]);

  const onDragEnter = () => wrapperRef.current.classList.add("dragover");
  const onDragLeave = () => wrapperRef.current.classList.remove("dragover");
  const onDrop = () => wrapperRef.current.classList.remove("dragover");

  const onFileDrop = (e) => {
    const newFile = e.target.files[0];

    if (
      (newFile.type === "image/jpeg" ||
        newFile.type === "image/png" ||
        newFile.type === "image/jpg") &&
      fileList.length < 8
    ) {
      console.log("NUEVO ARCHIVO: ", newFile);
      const updatedList = [...fileList, newFile];

      setFileList(updatedList);
      onFileChange(updatedList);
    }
  };

  const fileRemove = (file) => {
    console.log(file);
    const updatedList = [...fileList];
    updatedList.splice(fileList.indexOf(file), 1);
    setFileList(updatedList);
    onFileChange(updatedList);
  };

  return (
    <div>
      <div
        ref={wrapperRef}
        className="drop-file-input relative w-[400px] h-44 border-2 border-dashed border-sky-700 rounded-2xl flex items-center justify-center
         hover:opacity-60 dragover:opacity-60"
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
      {fileList.length > 0 && (
        <div className="drop-file-preview mt-8">
          <p className="drop-file-preview__title font-medium mb-5 ">
            Preparado para subir
          </p>
          {fileList.map((item, index) => (
            <div
              key={index}
              className="drop-file-preview__item relative bg-slate-200 flex mb-2.5 p-4 rounded-2xl hover:opacity-100"
            >
              <img
                src={
                  imageConfig[item.type.split("/")[1]] || imageConfig["default"]
                }
                className="w-14 mr-5"
                alt=""
              />
              <div className="drop-file-preview__item__info flex flex-col justify-between">
                <p>{item.name}</p>
                <p> {item.size}B </p>
              </div>
              <span
                className="drop-file-preview__item__del bg-white w-10 h-10 rounded-full flex items-center justify-center absolute right-2.5 top-1/2 cursor-pointer opacity-0 hover:opacity-100"
                onClick={() => fileRemove(item)}
              >
                x
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileInput;
