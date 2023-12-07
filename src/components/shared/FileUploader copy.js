import React, { useState } from "react";

const FileUploader = () => {
  const [images, setImages] = useState([]);

  console.log(images);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setImages([...images, ...selectedFiles]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setImages([...images, ...droppedFiles]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const removeImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        // style={{ display: "none" }}
        id="fileInput"
      />
      {/* <label htmlFor="fileInput">Choose Files</label>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        style={{
          width: "300px",
          height: "200px",
          border: "2px dashed #ccc",
          margin: "20px 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Drop Images Here
      </div> */}
      <div>
        {images.map((image, index) => (
          <div key={index}>
            <img
              src={URL.createObjectURL(image)}
              alt={`uploaded ${index}`}
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
            />
            <button onClick={() => removeImage(index)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUploader;
