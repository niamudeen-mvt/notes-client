import React, {
    forwardRef,
    useImperativeHandle,
    useRef,
    useState,
} from 'react';
import CustomTooltip from '../CustomTooltip';
import { sendNotification } from '../../utils/notifications';
import { RxCross2 } from 'react-icons/rx';

const FileUploader = ({ images, setImages }, ref) => {
    const fileInputRef = useRef();
    const [imgList, setImgList] = useState([]);

    const handleFileChange = (e) => {
        const uploadedFiles = e.target.files;

        Array.from(uploadedFiles).forEach((file) => {
            // Check if the file type is an image
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();

                reader.onload = function (event) {
                    const newImage = {
                        key: Date.now(),
                        data: event.target.result,
                    };

                    setImages((prevImages) => [...prevImages, newImage]);
                };

                reader.readAsDataURL(file);
            } else {
                sendNotification(
                    'warning',
                    `File '${file.name}' is not an image and will be skipped.`,
                );
            }
        });

        const newImages = Array.from(uploadedFiles)
            .filter((file) => file.type.startsWith('image/'))
            .map((file) => URL.createObjectURL(file));

        setImgList([...imgList, ...newImages]);
    };

    // Function to clear file input value
    const clearFileInput = () => {
        setImages([]); // Clear the image list
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const removeImage = (event, index) => {
        event.preventDefault();

        const temp = images.filter((obj, i) => i !== index);
        setImages(temp);

        const tempList = imgList.filter((obj, i) => i !== index);
        setImgList(tempList);
    };

    useImperativeHandle(ref, () => ({
        clearFileInput,
    }));

    return (
        <div>
            {/* <Row>
        {images?.length
          ? images.map((file, index) => {
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
      </Row> */}
            <label
                htmlFor="fileInput"
                className="w-100 mt-3 p-3 text-center text-secondary rounded-3 border mb-4 cursor"
            >
                Upload images (optional)
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
                {imgList?.length
                    ? imgList.map((image, index) => {
                          return (
                              <div
                                  className="d-flex justify-content-between align-items-center h-25 rounded-3 px-3 mb-3 shadow-sm"
                                  style={{ height: '40px' }}
                              >
                                  <img
                                      src={image}
                                      alt="note-img"
                                      loading="lazy"
                                      style={{
                                          height: '50px',
                                          width: '50px',
                                      }}
                                  />

                                  <CustomTooltip msg="delete">
                                      <RxCross2
                                          fontSize={'22px'}
                                          onClick={(event) =>
                                              removeImage(event, index)
                                          }
                                          className="cursor"
                                          color="black"
                                      />
                                  </CustomTooltip>
                              </div>
                          );
                      })
                    : null}
            </div>
        </div>
    );
};

export default forwardRef(FileUploader);
