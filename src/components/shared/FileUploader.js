import React, { useState } from "react";

const FileUploader = () => {
  const [images, setImages] = useState([]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setImages([...images, ...selectedFiles]);
  };

  const removeImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  return (
    <div>
      {/* <label htmlFor="fileInput">
        Choose Files ({images.length} {images.length === 1 ? "file" : "files"})
      </label> */}
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        id="fileInput"
      />
      {/* <div>
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
      </div> */}
    </div>
  );
};

export default FileUploader;
