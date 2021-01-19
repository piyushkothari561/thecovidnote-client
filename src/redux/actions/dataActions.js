import { SET_NOTES, LOADING_DATA, SHIELD_NOTE, UNSHIELD_NOTE,
    DELETE_NOTE, SET_ERRORS, CLEAR_ERRORS, POST_NOTE
    ,SUBMIT_COMMENT,LOADING_UI,STOP_LOADING_UI, SET_NOTE } from '../types';
import axios from 'axios';


//GET all notes
export const getNotes = () => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios.get('/notes')
    .then((res) => {
        dispatch({
            type: SET_NOTES,
            payload: res.data
        })
    })
    .catch((err) => {
        dispatch({
            type: SET_NOTES,
            payload: []
        })
    })
}
//note dialog for one note
export const getNote = (noteId) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
      .get(`/note/${noteId}`)
      .then((res) => {
        dispatch({
          type: SET_NOTE,
          payload: res.data
        });
        dispatch({ type: STOP_LOADING_UI });
      })
      .catch((err) => console.log(err));
  };

 //Post a note
 export const postNote = (newNote) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
      .post('/note', newNote)
      .then((res) => {
        dispatch({
          type: POST_NOTE,
          payload: res.data
        });
        dispatch(clearErrors());
      })
      .catch((err) => {
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
          });
      });
  };

//SHIELD A Note
export const shieldNote = (noteId) => (dispatch) => {
        axios.get(`/note/${noteId}/shield`)
            .then((res) =>{
                dispatch({
                    type: SHIELD_NOTE,
                    payload: res.data
                })
            })
            .catch((err) => console.log(err));
}
//UNSHIELD A Note
export const unshieldNote = (noteId) => (dispatch) => {
    axios.get(`/note/${noteId}/unshield`)
        .then((res) =>{
            dispatch({
                type: UNSHIELD_NOTE,
                payload: res.data
            })
        })
        .catch((err) => console.log(err));
}
  //COMMENT on  a note
  export const submitComment = (noteId, commentData) => (dispatch) => {
    axios.post(`/note/${noteId}/comment`, commentData)
    .then((res) => {
      dispatch({ type: SUBMIT_COMMENT, payload: res.data 
      });
      dispatch(clearErrors()); 
    })
    .catch((err) => {
      dispatch({ type: SET_ERRORS, payload: err.response.data})
    })
  }
//Delete A Note
export const deleteNote = (noteId) => (dispatch) => {
    axios
      .delete(`/note/${noteId}`)
      .then(() => {
        dispatch({ type: DELETE_NOTE, payload: noteId });
      })
      .catch((err) => console.log(err));
  };

  //get user data for users page 
  export const getUserData = (userHandle) => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios
      .get(`/user/${userHandle}`)
      .then((res) => {
        dispatch({
          type: SET_NOTES,
          payload: res.data.notes
        });
      })
      .catch(() => {
        dispatch({
          type: SET_NOTES,
          payload: null
        });
      });
  };
 
  export const clearErrors = () => dispatch => {
      dispatch({ type: CLEAR_ERRORS})
  }
