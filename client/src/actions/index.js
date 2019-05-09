import streams from "../apis/streams";
import history from "../history";
import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_STREAM,
  FETCH_STREAM,
  FETCH_STREAMS,
  EDIT_STREAM,
  DELETE_STREAM
} from "./types";

// siginIn action creator
export const signIn = userId => {
  return {
    type: SIGN_IN,
    payload: userId
  };
};

// signOut action creator
export const signOut = () => {
  return {
    type: SIGN_OUT
  };
};

// createStream action creator
export const createStream = formValues => async (dispatch, getState) => {
  const { userId } = getState().auth;

  const response = await streams.post("/streams", { ...formValues, userId });

  dispatch({ type: CREATE_STREAM, payload: response.data });

  history.push("/");
};

// fetchStreams action creator -- get the list of all existing streams
export const fetchStreams = () => async dispatch => {
  const response = await streams.get("/streams ");

  dispatch({ type: FETCH_STREAMS, payload: response.data });
};

// fetchStream action creator -- get one stream by the specific stream id
export const fetchStream = id => async dispatch => {
  const response = await streams.get(`/streams/${id}`);

  dispatch({ type: FETCH_STREAM, payload: response.data });
};

// editStream action creator
export const editStream = (id, formValues) => async dispatch => {
  const response = await streams.patch(`/streams/${id}`, formValues);

  dispatch({ type: EDIT_STREAM, payload: response.data });

  history.push("/");
};

// delteStream action creator
export const deleteStream = id => async dispatch => {
  await streams.delete(`/streams/${id}`);

  dispatch({ type: DELETE_STREAM, payload: id });

  history.push("/");
};
