import {
  DEETS_CREATE_FAIL,
  DEETS_CREATE_REQUEST,
  DEETS_CREATE_SUCCESS,
  DEETS_DELETE_FAIL,
  DEETS_DELETE_REQUEST,
  DEETS_DELETE_SUCCESS,
  DEETS_LIST_FAIL,
  DEETS_LIST_REQUEST,
  DEETS_LIST_SUCCESS,
  DEETS_UPDATE_FAIL,
  DEETS_UPDATE_REQUEST,
  DEETS_UPDATE_SUCCESS,
} from "../constants/deetsConstant";

export const deetListReducer = (state = { deets: [] }, action) => {
  switch (action.type) {
    case DEETS_LIST_REQUEST:
      return { loading: true };
    case DEETS_LIST_SUCCESS:
      return { loading: false, deets: action.payload };
    case DEETS_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const deetCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case DEETS_CREATE_REQUEST:
      return { loading: true };
    case DEETS_CREATE_SUCCESS:
      return { loading: false, success: true };
    case DEETS_CREATE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const deetUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case DEETS_UPDATE_REQUEST:
      return { loading: true };
    case DEETS_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case DEETS_UPDATE_FAIL:
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};

export const deetDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DEETS_DELETE_REQUEST:
      return { loading: true };
    case DEETS_DELETE_SUCCESS:
      return { loading: false, success: true };
    case DEETS_DELETE_FAIL:
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};
