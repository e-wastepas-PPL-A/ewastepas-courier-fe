/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import Swal from "sweetalert2";
import IcEmptyFile from "../../assets/empty-file.svg"
import IcImages from "../../assets/ic-images.svg"
import ImageWithFallback from "../TagImage/ImageWithFallback"

const FileUploader = ({
  id,
  value = [],
  label = "",
  subLabel = "",
  format = "all", // Can be 'image', 'file', or 'all'
  required = false,
  onChange,
}) => {
  const [file, setFile] = useState(value);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => { 
    if(value.length > 0 ){
      setFile(value);
    }
}, [value]);

  const acceptedFormats = {
    image: "image/png, image/jpg, image/jpeg",
    file: "application/pdf",
    all: "image/png, image/jpg, image/jpeg, application/pdf",
  }[format];

  const acceptedFormatsText = {
    image: ".png, .jpg, .jpeg",
    file: ".pdf",
    all: ".png, .jpg, .jpeg, .pdf",
  }[format];

  const handleFileChange = (e) => {
    const incomingFiles = Array.from(e.target.files);
    const isValid = validateFile(incomingFiles);

    if (!isValid) {
      Swal.fire({
        title: "Upload File",
        text: `File must be a valid ${format === "image" ? "image" : "PDF"}.`,
        icon: "warning",
        confirmButtonColor: "#7066e0",
      });
      return;
    }

    if (incomingFiles?.length > 1 || file?.length === 1) {
      Swal.fire({
        title: "Upload File",
        text: "Only 1 file can be uploaded at a time.",
        icon: "warning",
        confirmButtonColor: "#7066e0",
      });
      return;
    }

    const fileExists = file.some(
      (r) =>
        incomingFiles.some(
          (f) => f.name === r.name && f.size === r.size
        )
    );

    if (fileExists) {
      Swal.fire({
        title: "Upload File",
        text: "A file with the same name already exists.",
        icon: "warning",
        confirmButtonColor: "#7066e0",
      });
      return;
    }

    setFile(incomingFiles);
    onChange?.(incomingFiles[0]);
  };

  const validateFile = (files) => {
    const validTypes = acceptedFormats.split(", ").map((type) => type.trim());
    return (
      files.length === 1 &&
      validTypes.includes(files[0].type) &&
      files[0].size <= 5 * 1024 * 1024 // Limit size to 5 MB
    );
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e) => {
    e.preventDefault();
    fileInputRef.current.files = e.dataTransfer.files;
    handleFileChange({ target: fileInputRef.current });
    setIsDragging(false);
  };

  const handleRemoveFile = () => {
    setFile([]);
    onChange?.([]);
  };


  const generateURL = (file) => {
    let fileSrc;
    if(!file?.url){
      fileSrc = URL.createObjectURL(file);
      setTimeout(() => URL.revokeObjectURL(fileSrc), 1000);
    }else{
        fileSrc=file?.url;
      }
    return fileSrc;
  };

  return (
    <div className="my-2">
      <div className="flex flex-col">
        <label className="text-sm text-start capitalize font-[600]">
          {label?.replace(/_/g, " ")} {required && <span>*</span>}
        </label>
        {subLabel && (
          <label
            className="text-sm capitalize font-[400]"
            dangerouslySetInnerHTML={{
              __html: subLabel.replace(
                /\[([^\]]+)\]\(([^)]+)\)/g,
                `<a href="$2" target="_blank" class="text-blue-500">$1</a>`
              ),
            }}
          ></label>
        )}
      </div>
      {file?.length > 0 ? (
        <div className="flex items-center gap-2 mt-2 w-full h-[80px] border border-gray-400 border-dashed rounded-[8px] p-2">
          {file[0]?.type?.startsWith("image") || file[0]?.url ? (
            <ImageWithFallback
              src={generateURL(file[0])}
              alt="Preview"
              fallbackSrc={IcEmptyFile}
              className="w-[50px] h-[50px] object-cover"
            />
          ) : (
            <ImageWithFallback
            src={IcEmptyFile}
            alt="Preview"
            fallbackSrc={IcEmptyFile}
            className="w-[50px] h-[50px] object-cover"
          />
          )}
          <span className="flex-grow text-sm truncate">{file[0].name}</span>
          <button
            onClick={handleRemoveFile}
            className="text-red-500 text-xl font-bold"
          >
            ×
          </button>
        </div>
      ) : (
        <label
          htmlFor={id}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`cursor-pointer hover:opacity-[0.8] ${
            isDragging ? "opacity-[0.8]" : ""
          }`}
        >
          <div className="mt-1 w-full h-[120px] border border-gray-400 border-dashed rounded-[8px] flex justify-center items-center">
            <div className="text-center">
              <p className="text-gray-600 text-[14px] flex items-center gap-2 font-[600] justify-center">
                <img
                  src={IcImages}
                  alt="icon"
                  className="rounded-lg w-[74px] h-auto"
                />
              </p>
              <p className="text-revamp-neutral-10 text-[12px] font-[400]">
                Drop your image here, or browse
              </p>
              <p className="text-revamp-neutral-8 text-[8px]">
                Support: {acceptedFormatsText} files
              </p>
              <p className="text-revamp-neutral-8 text-[8px]">Size limit: 5 MB</p>
            </div>
          </div>
        </label>
      )}
      <input
        type="file"
        ref={fileInputRef}
        id={id}
        onChange={handleFileChange}
        className="hidden"
        accept={acceptedFormats}
        required={required}
      />
    </div>
  );
};

export default FileUploader;
