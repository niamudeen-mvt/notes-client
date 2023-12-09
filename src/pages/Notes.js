import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { CiImageOn } from "react-icons/ci";
import { FaCheck } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { BiSolidMessageSquareEdit } from "react-icons/bi";
import {
  addNotes,
  deleteNotesById,
  editNotesById,
  getNotes,
} from "../services/api/notes";
import { sendNotification } from "../utils/notifications";
import { useNotes } from "../context/noteContext";
import FileUploader from "../components/shared/FileUploader";
import ImagePreviewModal from "../components/modal/ImagePreviewModal";
import CustomButton from "../components/shared/CustomButton";
import CustomModal from "../components/shared/CustomModal";
import CustomTooltip from "../components/CustomTooltip";
import CustomLoader from "../components/shared/CustomLoader";

const NotesPage = () => {
  const [notes, setNotes] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [isEdit, setIsEdit] = useState({
    edit: false,
    disabled: true,
    index: null,
  });
  const { note, setNote, handleChange } = useNotes();
  const [showModal, setShowModal] = useState(false);
  const [contentType, setContentType] = useState({
    key: "ADD_NOTES",
    note: "",
  });
  const [images, setImages] = useState({});
  const [showImgModal, setShowImgModal] = useState(false);
  const [noteImgList, setNoteImgList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fileInputRef = useRef();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      let res = await getNotes();
      if (res?.status === 200) {
        setNotes(res?.data?.user?.notes);
        setIsLoading(false);
      } else {
        // sendNotification("warning", res?.response?.data?.message);
      }
    })();
  }, [refresh]);

  const handleOpenModal = useCallback(
    (note, content_type) => {
      if (content_type === "MORE") {
        setContentType({
          key: content_type,
          note,
          heading: "NOTE",
        });
        setShowModal(true);
      } else {
        setContentType("ADD_NOTES");
        setShowModal(true);
        setNote({ message: "" });
      }
    },
    [showModal]
  );

  const handleAddNotes = async (e) => {
    e.preventDefault();

    if (note.message) {
      const fd = new FormData();

      fd.append("message", note.message);

      for (const key of Object.keys(images)) {
        fd.append("images", images[key]);
      }

      const res = await addNotes(fd);

      if (res?.status === 201) {
        sendNotification("success", res?.data?.message);
        setShowModal(false);
        setNote({ message: "" });
        setRefresh(!refresh);
      } else {
        sendNotification("warning", res?.response?.data?.message);
        setShowModal(false);
        setNote({ message: "" });
      }
    } else {
      sendNotification("warning", "Please enter your note");
    }
  };

  const handleDelteNote = async (id) => {
    if (id) {
      let res = await deleteNotesById(id);
      if (res?.status === 200) {
        setNotes(res?.data?.user?.notes);
        sendNotification("success", res?.data?.message);
        setRefresh(!refresh);
      } else {
        sendNotification("warning", res?.response?.data?.message);
      }
    }
  };

  const handleEdit = async (index) => {
    setIsEdit({
      edit: !isEdit.edit,
      disabled: !isEdit.disabled,
      index: index,
    });
    setNote({ message: "" });
  };

  const handleEditNote = async (id, index) => {
    if (id && note.message) {
      let res = await editNotesById(id, note);
      if (res?.status === 200) {
        setNotes(res?.data?.user?.notes);
        sendNotification("success", res?.data?.message);
        setRefresh(!refresh);
        setNote({ message: "" });
        setIsEdit({
          edit: !isEdit.edit,
          disabled: !isEdit.disabled,
          index: index,
        });
      } else {
        sendNotification("warning", res?.response?.data?.message);
      }
    } else {
      setIsEdit({
        edit: !isEdit.edit,
        disabled: !isEdit.disabled,
        index: index,
      });
    }
  };

  const handleClose = () => {
    setShowModal(false);
    // Clear file input in FileUploader component
    fileInputRef.current.clearFileInput();
  };

  if (isLoading) return <CustomLoader />;
  return (
    <section className="common_container flex_center">
      <Container>
        <div className="mb-5 shadow-sm p-3 flex_SB">
          <h2>Notes</h2>
          <CustomButton text="ADD NOTES" onClick={handleOpenModal} />
        </div>
        <Row>
          {notes?.length
            ? notes.map((el, index) => {
                return (
                  <Col className="flex_center mb-5" lg={3}>
                    <div className="note_card px-5 py-5">
                      <div className="mt-3">
                        {isEdit?.edit && isEdit.index === index ? (
                          <>
                            <textarea
                              type="text"
                              className="px-2 py-3 border-0 w-100  messge_field"
                              value={note.message.substring(0, 140)}
                              onChange={(e) => handleChange(e)}
                              placeholder="Enter new note .........."
                              autoComplete="off"
                              rows={6}
                            />
                            {note.message?.length > 150 ? (
                              <span
                                className="cursor"
                                onClick={() =>
                                  handleOpenModal(note.message, "MORE")
                                }
                              >
                                ...more
                              </span>
                            ) : null}
                          </>
                        ) : (
                          <p>
                            {el.message.substring(0, 200)}
                            {el.message?.length > 200 ? (
                              <span
                                className="cursor"
                                onClick={() =>
                                  handleOpenModal(el.message, "MORE")
                                }
                              >
                                ...more
                              </span>
                            ) : null}
                          </p>
                        )}
                      </div>
                      <div className="icon_menu">
                        {" "}
                        {isEdit?.edit && isEdit.index === index ? (
                          <CustomTooltip msg="submit">
                            <FaCheck
                              color="green"
                              fontSize={"25px"}
                              onClick={() => handleEditNote(el._id, index)}
                              className="cursor"
                            />
                          </CustomTooltip>
                        ) : null}
                        <CustomTooltip msg="edit">
                          <Button
                            variant="secondary"
                            className="p-0 bg-light border-0"
                          >
                            <BiSolidMessageSquareEdit
                              color="#0d6efd"
                              fontSize={"25px"}
                              onClick={() => handleEdit(index)}
                              className="cursor d-block"
                            />
                          </Button>
                        </CustomTooltip>
                        <CustomTooltip msg="delete">
                          <MdDelete
                            color="red"
                            fontSize={"25px"}
                            onClick={() => handleDelteNote(el._id)}
                            className="cursor"
                          />
                        </CustomTooltip>
                      </div>
                      {/* {
                        el?.images?.length && isEdit?.edit && isEdit.index !== index ?
                          <div className="mb-3">
                            <CustomTooltip msg="images" placement="right">
                              <CiImageOn size={25}
                                color="green" className="cursor" onClick={() => {
                                  setShowImgModal(true)
                                  setNoteImgList(el.images)
                                }
                                } /></CustomTooltip>
                          </div>
                          : null
                      } */}

                      {el?.images?.length ? (
                        <div className="mb-3">
                          <CustomTooltip msg="images" placement="right">
                            <CiImageOn
                              size={25}
                              color="green"
                              className="cursor"
                              onClick={() => {
                                setShowImgModal(true);
                                setNoteImgList(el.images);
                              }}
                            />
                          </CustomTooltip>
                        </div>
                      ) : null}
                      {/* <p
                      className="text-secondary position-absolute position-absolute bottom-0"
                      style={{ right: "20px" }}
                    >
                      {timeAgo}
                    </p> */}
                    </div>
                  </Col>
                );
              })
            : null}
        </Row>
      </Container>

      <CustomModal
        showModal={showModal}
        setShowModal={setShowModal}
        modalHeading={
          contentType.key === "MORE" ? contentType.heading : "ADD NOTES"
        }
        handleSubmit={handleAddNotes}
        contentType={contentType.key}
        handleClose={handleClose}
      >
        {/* add note form */}

        {contentType.key === "MORE" ? (
          <p>{contentType.note}</p>
        ) : (
          <section className="common_section">
            <Container>
              <div>
                <form>
                  <div className="mb-3">
                    <textarea
                      type="text"
                      className="px-2 py-3 border-0 w-100 ouline_none"
                      value={note.message}
                      onChange={(e) => handleChange(e)}
                      placeholder="Enter Message .........."
                      autoComplete="off"
                      style={{
                        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                        minHeight: "300px",
                      }}
                      rows={8}
                    />
                    <FileUploader
                      images={images}
                      setImages={setImages}
                      ref={fileInputRef}
                    />
                  </div>
                </form>
              </div>
            </Container>
          </section>
        )}
      </CustomModal>

      {showImgModal ? (
        <ImagePreviewModal
          showImgModal={showImgModal}
          setShowImgModal={setShowImgModal}
          noteImgList={noteImgList}
        />
      ) : null}
    </section>
  );
};

export default NotesPage;
