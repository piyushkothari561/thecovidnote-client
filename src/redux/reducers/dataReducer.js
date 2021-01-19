import { SET_NOTES, LOADING_DATA, SHIELD_NOTE, UNSHIELD_NOTE, 
  DELETE_NOTE, POST_NOTE, SET_NOTE, SUBMIT_COMMENT } from '../types';

const initialState = {
    notes: [],
    note: {},
    loading: false
};

export default function(state = initialState, action){
    switch(action.type){
        case LOADING_DATA:
            return {
                ...state,
                loading: true
            }
            case SET_NOTES:
                return{
                    ...state,
                    notes: action.payload,
                    loading: false
                }
                case SET_NOTE:
                  return {
                    ...state,
                    note: action.payload
                  };
                case SHIELD_NOTE:
    case UNSHIELD_NOTE:
      let index = state.notes.findIndex(
        (note) => note.noteId === action.payload.noteId
      );
      state.notes[index] = action.payload;
      if (state.note.noteId === action.payload.noteId) {
        state.note = action.payload;
      }
      return {
        ...state
      };
    case DELETE_NOTE:
       let deleteindex = state.notes.findIndex(
          (note) => note.noteId === action.payload);
            state.notes.splice(deleteindex, 1);
        return {
         ...state
        };
      case POST_NOTE:
        return{
          ...state,
          notes: [
            action.payload,
            ...state.notes
          ]
        }
        case SUBMIT_COMMENT:
          return{
              ...state,
              note: {
                ...state.note,
                comments: [action.payload, ...state.note.comments]
              }
          };
    default: 
    return state;   
}
}