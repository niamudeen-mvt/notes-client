import api from "../../utils/axios"
import { ADD_NOTES, DELETE_NOTES, EDIT_NOTES, FETCH_NOTES } from "../url"



export const addNotes = async (body) => {
  try {
    let response = await api.post(ADD_NOTES, body, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Accept": "application/json",
      }
    })
    return response
  } catch (error) {
    return error
  }
}


export const getNotes = async () => {
  try {
    let response = await api.get(FETCH_NOTES)
    return response
  } catch (error) {
    return error
  }
}

export const deleteNotesById = async (id) => {
  try {
    let response = await api.patch(DELETE_NOTES + id)
    return response
  } catch (error) {
    return error
  }
}

export const editNotesById = async (id, body) => {
  try {
    let response = await api.patch(EDIT_NOTES + id, body)
    return response
  } catch (error) {
    return error
  }
}