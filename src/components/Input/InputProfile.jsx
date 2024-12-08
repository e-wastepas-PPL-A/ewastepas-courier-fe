/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import Swal from "sweetalert2";
import Avatar from 'react-avatar';
import { useCourier } from "../../stores/courier";
import ImageWithFallback from "../TagImage/ImageWithFallback"

const FileUploader = ({
  id,
  value = [],
  format = "all", // Can be 'image', 'file', or 'all'
  required = false,
  onChange,
}) => {
  const [file, setFile] = useState(value);
  const fileInputRef = useRef(null);
  const user = useCourier((state) => state.user);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => { 
    if(value?.length > 0 ){
      setFile(value);
    }
}, [value]);

  const acceptedFormats = {
    image: "image/png, image/jpg, image/jpeg",
    file: "application/pdf",
    all: "image/png, image/jpg, image/jpeg, application/pdf",
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
      files?.length === 1 &&
      validTypes.includes(files[0].type) &&
      files[0].size <= 5 * 1024 * 1024 // Limit size to 5 MB
    );
  };

  const handleRemoveFile = () => {
    setFile([]);
    onChange?.(null);
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
        {file?.length > 0 && file[0]?.type?.startsWith("image") || file[0]?.url ? (
            <div
            onMouseEnter={() => setIsHovered(true)} // Set hover state true
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleRemoveFile}
            className={`relative w-fit flex items-center justify-center mb-2 mx-auto cursor-pointer`}
            >
            <ImageWithFallback
              src={generateURL(file[0])}
              alt="profile"
              fallbackSrc={"https://claritycareconsulting.co.uk/wp-content/uploads/2023/05/Blank-Profile-Picture.jpg"}
              className="w-[100px] h-[100px] rounded-full object-cover"
            />
            <div className={`absolute bg-[black] rounded-full duration-300 w-full h-full`} style={{opacity: isHovered ? '0.6' : '0'}}></div>
            <div className={`absolute text-white font-[500] duration-300`} style={{opacity: isHovered ? '1' : '0'}}>Clear</div>
            </div>
        ):(
        <label
          htmlFor={id}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`relative w-fit flex items-center justify-center mb-2 mx-auto cursor-pointer`}
        >
              <Avatar name={user?.name} round={true} className="w-[120px] h-[120px] rounded-full object-cover" />
            <div className={`absolute bg-[black] rounded-full duration-300 w-full h-full`} style={{opacity: isHovered ? '0.6' : '0'}}></div>
            <div className={`absolute text-white font-[500] duration-300`} style={{opacity: isHovered ? '1' : '0'}}>Edit</div>
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
