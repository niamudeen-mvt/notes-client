import api from "../../utils/axios";
import {
  ADD_NOTES,
  DELETE_NOTES,
  DELETE_NOTE_IMG,
  EDIT_NOTES,
  FETCH_NOTES,
} from "../url";

export const addNotes = async (body, queryObj) => {
  try {
    if (queryObj?.type === "edit") {
      let response = await api.post(
        ADD_NOTES + `?type=${queryObj.type}&noteId=${queryObj.noteId}`,
        body,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
        }
      );
      return response;
    } else {
      let response = await api.post(ADD_NOTES, body, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      });
      return response;
    }
  } catch (error) {
    return error;
  }
};

export const getNotes = async () => {
  try {
    let response = await api.get(FETCH_NOTES);
    return response;
  } catch (error) {
    return error;
  }
};

export const deleteNotesById = async (id) => {
  try {
    let response = await api.patch(DELETE_NOTES + id);
    return response;
  } catch (error) {
    return error;
  }
};

export const editNotesById = async (id, body) => {
  try {
    let response = await api.patch(EDIT_NOTES + id, body);
    return response;
  } catch (error) {
    return error;
  }
};

export const deleteImgById = async (body) => {
  try {
    let response = await api.patch(DELETE_NOTE_IMG, body);
    return response;
  } catch (error) {
    return error;
  }
};
