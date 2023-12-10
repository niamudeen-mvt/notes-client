import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Col, Row } from "react-bootstrap";
import CustomTooltip from "../CustomTooltip";
import { MdDelete } from "react-icons/md";
import { CiImageOn } from "react-icons/ci";

const FileUploader = ({ images, setImages }, ref) => {
  const fileInputRef = useRef();
  const [imgList, setImgList] = useState([]);

  const handleFileChange = (e) => {
    const uploadedFiles = e.target.files;

    Array.from(uploadedFiles).forEach((file) => {
      const reader = new FileReader();

      reader.onload = function (event) {
        const newImage = {
          key: Date.now(), // Unique key using Date.now()
          data: event.target.result, // File data (base64)
        };

        setImages((prevImages) => [...prevImages, newImage]); // Update the image list with new object
      };

      reader.readAsDataURL(file); // Read the file as data URL
    });

    const newImages = Array.from(uploadedFiles).map((file) =>
      URL.createObjectURL(file)
    );

    setImgList([...imgList, ...newImages]);
  };

  // Function to clear file input value
  const clearFileInput = () => {
    setImages([]); // Clear the image list
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeImage = (event, key) => {
    event.preventDefault();

    const temp = images.filter((obj) => obj.key !== key);
    setImages(temp);
  };

  useImperativeHandle(ref, () => ({
    clearFileInput,
  }));

  return (
    <div>
      <Row>
        {images?.length
          ? images.map((file, i) => {
              return (
                <Col xs={12} md={4}>
                  <div
                    className={`position-relative  flex_center py-4 mb-3`}
                    style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
                  >
                    <CiImageOn size={25} color="green" />

                    <p className="position-absolute top-0 end-0">
                      <CustomTooltip msg="delete">
                        <MdDelete
                          fontSize={"25px"}
                          onClick={(event) => removeImage(event, file.key)}
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

      {/* <div>
        <Row>
          {imgList?.length
            ? imgList.map((image, index) => {
                return (
                  <Col xs={12} md={4} className="">
                    <div className="position-relative">
                      <img
                        src={image}
                        alt="note-img"
                        loading="lazy"
                        style={{
                          height: "100px",
                          boxShadow: config.theme.form_btn_box_shadow,
                          cursor: "pointer",
                        }}
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
      </div> */}
    </div>
  );
};

export default forwardRef(FileUploader);
