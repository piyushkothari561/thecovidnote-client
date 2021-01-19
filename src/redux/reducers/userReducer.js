import { SET_USER, 
SET_AUTHENTICATED,
SET_UNAUTHENTICATED,
LOADING_USER, SHIELD_NOTE, UNSHIELD_NOTE, MARK_NOTIFICATIONS_READ } from '../types';

const initialState = {
  authenticated: false,
    loading: false,
    credentials: [],
    shields: [],
    notifications: []
};

export default function(state = initialState, action){
    switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    case SET_USER:
      return {
        authenticated: true,
        loading: false,
        ...action.payload
      };
    case LOADING_USER:
        return{
            ...state,
            loading: true
        } ;
        case SHIELD_NOTE:
        return{
            ...state,
            shields: [
              ...state.shields,
              {
                userHandle: state.credentials.handle,
                noteId: action.payload.noteId
              }
            ]
        } 
        case UNSHIELD_NOTE:
          return{
            ...state,
            shields: state.shields.filter(
              (shield) => shield.noteId !== action.payload.noteId
            )
          };
          case MARK_NOTIFICATIONS_READ:
            state.notifications.forEach(not => not.read = true);
            return{
              ...state
            }
            default: 
            return state;
    }
}