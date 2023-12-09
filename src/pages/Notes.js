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
import { IoIosLink } from "react-icons/io";
import { GoLinkExternal } from "react-icons/go";

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

  console.log("note", note);
  console.log(contentType, "contentType");
  console.log(selectedNote, "selectedNote");

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
          heading: "ADD_NOTES",
        });
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
    const id = note?._id;
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
        setShowModal(false);
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
    if (fileInputRef.current) {
      fileInputRef.current.clearFileInput();
    }
  };

  const handleSeeNoteDetails = (index) => {
    const note = notes?.filter((e, i) => i === index);

    setSelectedNote(note[0]);

    setShowModal(true);
    setContentType({
      key: "NOTE",
      note,
      heading: "NOTE",
    });
    setNote({ message: "" });
  };

  // CSS

  const noteSyles = {
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
    width: "250px",
    minHeight: "150px",
  };

  const noteGoToIconStyles = {
    position: "absolute",
    top: "10px",
    right: "10px",
    cursor: "pointer",
    display: "flex",
    gap: "10px",
  };

  if (isLoading) return <CustomLoader />;
  return (
    <section className="common_container  py-5">
      <Container>
        <div className="mb-5 shadow-sm p-3 flex_SB justify-content-end">
          <CustomButton text="ADD NOTES" onClick={handleOpenModal} />
        </div>
        <Row>
          {notes?.length
            ? notes.map((el, index) => {
                return (
                  <Col
                    className="flex_center justify-content-start mb-5 "
                    lg={3}
                  >
                    <div
                      style={noteSyles}
                      className="p-5 rounded flex_center position-relative cursor"
                    >
                      Notes {index + 1}
                      <IoIosLink
                        style={noteGoToIconStyles}
                        onClick={() => handleSeeNoteDetails(index)}
                      />
                      <div>
                        {/* {isEdit?.edit && isEdit.index === index ? (
                          <CustomTooltip msg="submit">
                            <FaCheck
                              color="green"
                              fontSize={"25px"}
                              onClick={() => handleEditNote(el._id, index)}
                              className="cursor"
                            />
                          </CustomTooltip>
                        ) : null} */}
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
                      </div>
                      {/* <CustomTooltip msg="delete">
                        <MdDelete
                          color="red"
                          fontSize={"25px"}
                          onClick={() => handleDelteNote(el._id)}
                          className="cursor"
                        />
                      </CustomTooltip> */}
                    </div>
                    {/* <div className="note_card px-5 py-5">
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
                          <>
                            <h2 className="text-captialize">
                              {el?.title?.substring(0, 30)}
                            </h2>
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
                          </>
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
                    </div> */}
                  </Col>
                );
              })
            : null}
        </Row>
      </Container>

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
                            className="w-full box_shadow cursor"
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
                        className="px-2 py-3 border-0 w-100 ouline_none"
                        placeholder="Title"
                        autoComplete="off"
                        spellCheck="off"
                        // style={{
                        //   boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                        // }}
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
                          className="px-2 py-3 border-0 w-100 ouline_none"
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
                                className="h-75 cursor"
                                onClick={() => {
                                  setImgUrl(file.image);
                                  setShowImgModal(true);
                                }}
                              >
                                <img
                                  src={file.image}
                                  alt="note-img"
                                  className="w-full box_shadow cursor"
                                />
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
                    <input
                      type="text"
                      name="title"
                      className="px-2 py-3 border-0 w-100 mb-3"
                      placeholder="Title"
                      autoComplete="off"
                      spellCheck="off"
                      // style={{
                      //   boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                      // }}
                      value={note.title}
                      onChange={(e) => handleChange(e)}
                    />
                    <textarea
                      type="text"
                      name="message"
                      className="px-2 py-3 border-0 w-100 ouline_none"
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
  );
};

export default NotesPage;
