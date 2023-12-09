import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

const FileUploader = ({ images, setImages }, ref) => {
  const [imgList, setImgList] = useState([]);

  console.log(imgList, "imgList");
  console.log(images, "images");
  const fileInputRef = useRef();

  const handleFileChange = (e) => {
    const uploadedFiles = e.target.files;
    setImages(uploadedFiles);

    const newImages = Array.from(uploadedFiles).map((file) =>
      URL.createObjectURL(file)
    );

    setImgList([...imgList, ...newImages]);
  };

  // Function to clear file input value
  const clearFileInput = () => {
    setImgList([]); // Clear the image list
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Clear the file input value
    }
  };

  const removeImage = (event, index) => {
    event.preventDefault();

    const updatedImages = [...imgList];
    updatedImages.splice(index, 1);
    setImgList(updatedImages);

    const temp = [...images];
    temp.splice(index, 1);
    setImages(temp);
    // clearFileInput();
  };

  useImperativeHandle(ref, () => ({
    clearFileInput,
  }));

  return (
    <div>
      <label
        htmlFor="fileInput"
        className=" w-100 mt-3 p-3 text-center text-secondary cursor rounded border"
      >
        Upload images
      </label>
      <input
        id="fileInput"
        type="file"
        ref={fileInputRef}
        accept="image/*"
        multiple
        hidden
        onChange={handleFileChange}
      />
      <div>
        {imgList?.map((image, index) => (
          <div key={index}>
            <img
              src={image}
              alt={`uploaded ${index}`}
              style={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
              }}
            />
            <button
              type="button"
              onClick={(event) => removeImage(event, index)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default forwardRef(FileUploader);
