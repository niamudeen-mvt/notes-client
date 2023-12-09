import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Col, Row } from "react-bootstrap";
import CustomTooltip from "../CustomTooltip";
import { MdDelete } from "react-icons/md";

const FileUploader = ({ images, setImages }, ref) => {
  const [imgList, setImgList] = useState([]);

  console.log(images, "images");
  const fileInputRef = useRef();

  const handleFileChange = (e) => {
    const uploadedFiles = e.target.files;
    // setImages([...images, ...uploadedFiles]);
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
        className=" w-100 mt-3 p-3 text-center text-secondary cursor rounded border mb-5"
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
        <Row>
          {imgList?.length
            ? imgList.map((image, index) => {
                return (
                  <Col xs={12} md={4} className="">
                    <div className="position-relative">
                      <img
                        src={image}
                        alt="note-img"
                        className="box_shadow cursor"
                        style={{
                          height: "100px",
                        }}
                        loading="lazy"
                      />

                      <p className="position-absolute top-0 end-0">
                        <CustomTooltip msg="delete">
                          <MdDelete
                            fontSize={"25px"}
                            onClick={(event) => removeImage(event, index)}
                            className="cursor"
                            color="red"
                          />
                        </CustomTooltip>
                      </p>
                    </div>
                  </Col>
                );
              })
            : null}
        </Row>
      </div>
    </div>
  );
};

export default forwardRef(FileUploader);
