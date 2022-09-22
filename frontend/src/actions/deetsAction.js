import { DEETS_CREATE_FAIL, DEETS_CREATE_REQUEST, DEETS_CREATE_SUCCESS, DEETS_DELETE_FAIL, DEETS_DELETE_REQUEST, DEETS_DELETE_SUCCESS, DEETS_LIST_FAIL, DEETS_LIST_REQUEST, DEETS_LIST_SUCCESS, DEETS_UPDATE_FAIL, DEETS_UPDATE_REQUEST, DEETS_UPDATE_SUCCESS } from "../constants/deetsConstant";
import axios from "axios";  

export const listDeets = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: DEETS_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/deets`, config);

    dispatch({
      type: DEETS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: DEETS_LIST_FAIL,
      payload: message,
    });
  }
};

export const createDeetAction = (title, content, category) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: DEETS_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `/api/deets/create`,
      { title, content, category },
      config
    );

    dispatch({
      type: DEETS_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: DEETS_CREATE_FAIL,
      payload: message,
    });
  }
};

export const updateDeetAction = (id, title, content, category) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: DEETS_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/deets/${id}`,
      { title, content, category },
      config
    );

    dispatch({
      type: DEETS_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: DEETS_UPDATE_FAIL,
      payload: message,
    });
  }
};

export const deleteDeetAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DEETS_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/deets/${id}`, config);

    dispatch({
      type: DEETS_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: DEETS_DELETE_FAIL,
      payload: message,
    });
  }
};