import React from "react";

const FileUploader = ({ images, setImages }) => {

  const handleFileChange = (e) => {
    setImages(e.target.files)
  };

  // const removeImage = (index) => {
  //   // const updatedImages = [...images];
  //   // updatedImages.splice(index, 1);
  //   // setImages(updatedImages);

  // };

  return (
    <div>
      <label htmlFor="fileInput" className=" w-100 mt-3 p-3 text-center text-secondary cursor rounded border" >
        Upload image (optional)
        ({images.length} {images.length === 1 ? "file" : "files"})
      </label>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        id="fileInput"
        hidden
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
