import React, { useCallback, useEffect, useRef, useState } from "react";
import { Col, Container, Dropdown, Row } from "react-bootstrap";
// import { CiImageOn } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import {
  addNotes,
  deleteImgById,
  deleteNotesById,
  getNotes,
} from "../services/api/notes";
import { sendNotification } from "../utils/notifications";
import { useNotes } from "../context/noteContext";
import FileUploader from "../components/shared/FileUploader";
import ImagePreviewModal from "../components/modal/ImagePreviewModal";
import CustomModal from "../components/shared/CustomModal";
import CustomTooltip from "../components/CustomTooltip";
import CustomLoader from "../components/shared/CustomLoader";
import { FaPlus } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiEdit, FiEye } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { formattedDate, formattedTime } from "../utils/helper";
import useWindowSize from "../hooks/useWindowSize";
import { config } from "../config";

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
    key: "",
    note: "",
  });
  const [images, setImages] = useState({});
  const [showImgModal, setShowImgModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedNote, setSelectedNote] = useState({});
  const [imgUrl, setImgUrl] = useState();
  const windowSize = useWindowSize();

  // console.log(note, "note");
  // console.log(contentType, "contentType");
  // console.log(selectedNote, "selectedNote");
  // console.log(notes, "notes");
  // console.log(selectedNote?.images?.length, "selectedNote?.images?.length");

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
        setContentType({
          key: "ADD_NOTES",
          note,
          heading: "ADD NOTES",
        });
        setShowModal(true);
        setNote({ message: "" });
      }
    },
    [showModal]
  );

  const handleAddNotes = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    if (note.message && note.title) {
      const fd = new FormData();

      fd.append("title", note.title);
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

    setIsLoading(false);
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
    setShowModal(true);

    const note = notes?.filter((e, i) => i === index);
    console.log(index, note);

    setSelectedNote(note[0]);
    setNote(note[0]);

    setIsEdit({
      edit: !isEdit.edit,
      disabled: !isEdit.disabled,
      index: index,
    });
    setContentType({
      key: "EDIT_NOTE",
      note,
      heading: "EDIT NOTE",
    });
  };

  const handleEditNote = async (index) => {
    setIsLoading(true);
    const id = note?._id;
    if (id && note.message) {
      if (note.message && note.title) {
        const fd = new FormData();

        fd.append("title", note.title);
        fd.append("message", note.message);

        for (const key of Object.keys(images)) {
          fd.append("images", images[key]);
        }
        const queryObj = {
          type: "edit",
          noteId: id,
        };

        const res = await addNotes(fd, queryObj);

        if (res?.status === 200) {
          sendNotification("success", res?.data?.message);
          setShowModal(false);
          setNote({ message: "" });
          setRefresh(!refresh);
          setIsEdit({
            edit: !isEdit.edit,
            disabled: !isEdit.disabled,
            index: index,
          });
        } else {
          sendNotification("warning", res?.response?.data?.message);
          setShowModal(false);
          setNote({ message: "" });
        }
      } else {
        sendNotification("warning", "Please enter your note");
      }
    } else {
      setIsEdit({
        edit: !isEdit.edit,
        disabled: !isEdit.disabled,
        index: index,
      });
    }
    setIsLoading(false);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedNote({});
    // Clear file input in FileUploader component
    if (fileInputRef.current) {
      fileInputRef.current.clearFileInput();
    }
  };

  const handleSeeNoteDetails = (index) => {
    const note = notes?.filter((e, i) => i === index);

    setSelectedNote(note[0]);
    setNote(note[0]);

    setShowModal(true);
    setContentType({
      key: "NOTE",
      note,
      heading: "NOTE",
    });
    setNote({ message: "" });
  };

  const handleRemoveImg = async (event, imgId) => {
    event.preventDefault();
    event.stopPropagation();

    setIsLoading(true);

    if (selectedNote?._id && imgId) {
      let res = await deleteImgById({
        noteId: selectedNote._id,
        imgId: imgId,
      });
      if (res?.status === 200) {
        setRefresh(!refresh);
        const tempList = selectedNote.images.filter(
          (file) => file._id !== imgId
        );
        setSelectedNote({
          ...selectedNote,
          images: tempList,
        });
        sendNotification("success", res?.data?.message);
      } else {
        sendNotification("warning", res?.response?.data?.message);
      }
    }

    setIsLoading(false);
  };

  const iconStyles = {
    color: "black",
    cursor: "pointer",
    fontSize: "18px",
  };
  if (isLoading) return <CustomLoader />;
  return (
    <Container className=" min-vh-100 z-1">
      <section>
        <Row>
          {notes?.length
            ? notes.map((note, index) => {
                const dateTime = new Date(note.updatedAt);
                return (
                  <Col className="flex_center  mb-5" xs={12} md={6} lg={4}>
                    <div
                      style={{
                        width: "300px",
                        height: "470px",
                        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                        // backgroundColor: generateRandomColors(),
                      }}
                      className="p-5 rounded-5 position-relative cursor  flex-column bg-white"
                    >
                      <p className="">{formattedDate(dateTime)}</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <h5 className="fw-medium">
                          {note.title.substring(0, 15)}
                        </h5>
                        <Dropdown>
                          <Dropdown.Toggle
                            variant="light"
                            id="dropdown-basic"
                            style={{
                              backgroundColor: "transparent",
                              border: "none",
                            }}
                          >
                            <BsThreeDotsVertical />
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item
                              className="d-flex align-items-center  gap-2 fs-6 "
                              onClick={() => handleSeeNoteDetails(index)}
                            >
                              <FiEye style={iconStyles} />
                              <span>View</span>
                            </Dropdown.Item>
                            <Dropdown.Item
                              className="d-flex align-items-center  gap-2 fs-6 "
                              onClick={() => handleEdit(index)}
                            >
                              <FiEdit
                                style={iconStyles}
                                className="cursor d-block"
                              />
                              <span>Edit</span>
                            </Dropdown.Item>
                            <Dropdown.Item
                              className="d-flex align-items-center gap-2 fs-6 "
                              onClick={() => handleDelteNote(note._id)}
                            >
                              <AiOutlineDelete
                                style={{ ...iconStyles, fontSize: "20px" }}
                              />
                              <span>Delete</span>
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                      <hr />
                      <p className="mb-3">
                        {note.message.substring(0, 180)}
                        {note.message.length > 180 ? (
                          <span>{`  `}...more</span>
                        ) : null}
                      </p>
                      <p
                        className="position-absolute "
                        style={{ bottom: "15px" }}
                      >
                        {formattedTime(dateTime)}
                      </p>
                    </div>
                  </Col>
                );
              })
            : null}
        </Row>

        {/* ADD NOTES BUTTON */}

        <div
          className={`rounded-circle ${
            windowSize.width < 768 ? "bg-white" : "bg-primary"
          }  p-4`}
          style={{
            cursor: "pointer",
            position: "fixed",
            right: windowSize.width < 768 ? "10%" : "375px",
            top: "80%",
          }}
          onClick={handleOpenModal}
        >
          <FaPlus
            size={24}
            color={`${windowSize.width < 768 ? "primary" : "white"}`}
          />
        </div>

        {/* ADD NOTES MODEL */}
        <CustomModal
          showModal={showModal}
          setShowModal={setShowModal}
          modalHeading={contentType.heading}
          handleSubmit={
            contentType.key === "NOTE"
              ? handleAddNotes
              : contentType.key === "EDIT_NOTE"
              ? handleEditNote
              : handleAddNotes
          }
          contentType={contentType.key}
          handleClose={handleClose}
          showFooter={contentType.key === "NOTE" ? false : true}
          showSpinner={isLoading}
        >
          {/* add note form */}

          {contentType.key === "MORE" ? (
            <p>{contentType.note}</p>
          ) : contentType.key === "NOTE" ? (
            <div className="mb-3">
              <p className="fw-bold">{selectedNote.title}</p>
              <p className="mb-5">{selectedNote.message}</p>

              <Row>
                {selectedNote?.images?.length
                  ? selectedNote.images.map((file) => {
                      return (
                        <Col xs={12} md={4}>
                          <div
                            className="h-75 cursor"
                            onClick={() => {
                              setImgUrl(file.image);
                              setShowImgModal(true);
                            }}
                          >
                            <img
                              src={file.image}
                              alt="note-img"
                              className="w-full  cursor"
                              style={{
                                boxShadow: config.theme.form_btn_box_shadow,
                              }}
                            />
                          </div>
                        </Col>
                      );
                    })
                  : null}
              </Row>
            </div>
          ) : contentType.key === "EDIT_NOTE" ? (
            <section className="common_section">
              <Container>
                <div>
                  <form>
                    <div className="mb-3">
                      <div>
                        <label className="fw-bold">Title</label>
                        <input
                          type="text"
                          name="title"
                          className="px-2 py-3 border-0 w-100 input_focus_outline"
                          placeholder="Title"
                          autoComplete="off"
                          spellCheck="off"
                          value={note.title}
                          onChange={(e) => handleChange(e)}
                        />
                      </div>

                      {selectedNote?.message ? (
                        <div>
                          <label className="fw-bold">message</label>
                          <textarea
                            type="text"
                            name="message"
                            className="px-2 py-3 border-0 w-100 input_focus_outline"
                            placeholder="Start Typing .........."
                            autoComplete="off"
                            spellCheck="off"
                            style={{
                              // boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                              minHeight: "300px",
                            }}
                            rows={8}
                            value={note.message}
                            onChange={(e) => handleChange(e)}
                          />
                        </div>
                      ) : null}

                      <Row>
                        {selectedNote?.images?.length ? (
                          selectedNote.images.map((file) => {
                            return (
                              <Col xs={12} md={4}>
                                <div
                                  className="h-75 cursor position-relative"
                                  onClick={() => {
                                    setImgUrl(file.image);
                                    setShowImgModal(true);
                                  }}
                                >
                                  <img
                                    src={file.image}
                                    alt="note-img"
                                    className="w-full  cursor"
                                    style={{
                                      boxShadow:
                                        config.theme.form_btn_box_shadow,
                                    }}
                                  />
                                  <p className="position-absolute top-0 end-0">
                                    <CustomTooltip msg="delete">
                                      <MdDelete
                                        fontSize={"25px"}
                                        onClick={(event) =>
                                          handleRemoveImg(event, file._id)
                                        }
                                        className="cursor"
                                        color="red"
                                      />
                                    </CustomTooltip>
                                  </p>
                                </div>
                              </Col>
                            );
                          })
                        ) : (
                          <FileUploader
                            images={images}
                            setImages={setImages}
                            ref={fileInputRef}
                          />
                        )}
                      </Row>
                    </div>
                  </form>
                </div>
              </Container>
            </section>
          ) : contentType.key === "ADD_NOTES" ? (
            <section className="common_section">
              <Container>
                <div>
                  <form>
                    <div className="mb-3">
                      <label className="fw-bold px-2 ">Title</label>
                      <input
                        type="text"
                        name="title"
                        className="px-2 py-3 border-0 w-100 mb-3 rounded"
                        placeholder="Title"
                        value={note.title}
                        onChange={(e) => handleChange(e)}
                        spellCheck={false}
                        autoCorrect="off"
                        autoComplete="off"
                      />
                      <label className="fw-bold px-2">Message</label>
                      <textarea
                        type="text"
                        name="message"
                        className="px-2 py-3 border-0 w-100 input_focus_outline"
                        placeholder="Start Typing .........."
                        rows={8}
                        value={note.message}
                        onChange={(e) => handleChange(e)}
                        spellCheck={false}
                        autoCorrect="off"
                        autoComplete="off"
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
          ) : null}
        </CustomModal>

        {/* IMAGE PREVIEW MODAL */}
        {showImgModal ? (
          <ImagePreviewModal
            showImgModal={showImgModal}
            setShowImgModal={setShowImgModal}
            imgUrl={imgUrl}
          />
        ) : null}
      </section>
    </Container>
  );
};

export default NotesPage;
