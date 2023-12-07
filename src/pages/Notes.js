import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import {
  addNotes,
  deleteNotesById,
  editNotesById,
  getNotes,
} from "../services/api/notes";
import { sendNotification } from "../utils/notifications";
import { MdDelete } from "react-icons/md";
import { useNotes } from "../context/noteContext";
import { FaCheck } from "react-icons/fa6";
import CustomButton from "../components/shared/CustomButton";
import CustomModal from "../components/shared/CustomModal";
import { BiSolidMessageSquareEdit } from "react-icons/bi";
import moment from "moment";
import FileUploader from "../components/shared/FileUploader";

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

  useEffect(() => {
    (async () => {
      let res = await getNotes();
      if (res?.status === 200) {
        setNotes(res?.data?.user?.notes);
      } else {
        // sendNotification("warning", res?.response?.data?.message);
      }
    })();
  }, [refresh]);

  const handleOpenModal = (note, content_type) => {
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
  };

  const handleAddNotes = async (e) => {
    e.preventDefault();

    if (note.message) {
      const res = await addNotes(note);

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
      sendNotification("warning", "Please enter your note");
    }
  };

  return (
    <section className="common_container flex_center">
      <Container>
        <div className="mb-5 shadow-sm p-3 flex_SB">
          <h2>Notes</h2>
          <CustomButton text="ADD NOTES" onClick={handleOpenModal} />
        </div>
        <Row>
          {notes?.length ? (
            notes.map((el, index) => {
              const timeAgo = moment(el.createdAt).fromNow();
              return (
                <Col className="flex_center mb-5" lg={3}>
                  <div className="note_card p-5">
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
                        <FaCheck
                          color="green"
                          fontSize={"25px"}
                          onClick={() => handleEditNote(el._id, index)}
                          className="cursor"
                        />
                      ) : null}
                      <BiSolidMessageSquareEdit
                        color="#0d6efd"
                        fontSize={"25px"}
                        onClick={() => handleEdit(index)}
                        className="cursor"
                      />
                      <MdDelete
                        color="red"
                        fontSize={"25px"}
                        onClick={() => handleDelteNote(el._id)}
                        className="cursor"
                      />
                    </div>

                    <p
                      className="text-secondary position-absolute position-absolute bottom-0"
                      style={{ right: "20px" }}
                    >
                      {timeAgo}
                    </p>
                  </div>
                </Col>
              );
            })
          ) : (
            <div className="text-center">No Notes found</div>
          )}
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

                    {/* <FileUploader /> */}
                  </div>
                </form>
              </div>
            </Container>
          </section>
        )}
      </CustomModal>
    </section>
  );
};

export default NotesPage;
