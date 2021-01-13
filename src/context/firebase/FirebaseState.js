import React, { useReducer } from "react";
import axios from "axios";
import { SHOW_LOADER, REMOVE_NOTES, ADD_NOTE, FETCH_NOTES } from "../types";
import { FirebaseContext } from "./firebaseContext";
import { firebaseReducer } from "./firebaseReducer";

const url = process.env.REACT_APP_BD_URL;

export const FirebaseState = ({ children }) => {
  const initialState = {
    notes: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(firebaseReducer, initialState);

  const showLoader = () => dispatch({ type: SHOW_LOADER });

  const fetchNotes = async () => {
    showLoader();
    const res = await axios.get(`${url}/notes.json`);
    const payload = Object.keys(res.data).map((key) => {
      return {
        ...res.data[key],
        id: key,
      };
    });
    dispatch({ type: FETCH_NOTES, payload });
  };

  const addNote = async (title) => {
    const note = {
      title,
      date: new Date().toJSON(),
    };
    try {
      const res = await axios.post(`${url}/notes.json`, note);
      const payload = {
        ...note,
        id: res.data.name,
      };
      dispatch({
        type: ADD_NOTE,
        payload,
      });
    } catch (error) {
      throw new Error("sgf");
    }
  };

  const removeNote = async (id) => {
    await axios.delete(`${url}/notes/${id}.json`);
    dispatch({ type: REMOVE_NOTES, payload: id });
  };

  return (
    <FirebaseContext.Provider
      value={{
        fetchNotes,
        addNote,
        removeNote,
        showLoader,
        loading: state.loading,
        notes: state.notes,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
