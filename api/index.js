import fetch from "./request.js";

export const getLoginInfo = (data = {}) => {
  // 登陆
  return fetch({ path: "user/login", data }, false, false);
};

export const getVedioList = (data = {}) => {
  
  return fetch({ path: "media/video/series", data }, false, false);
};

export const getMediaVedioList = (data = {}) => {
  
  return fetch({ path: "media/video/list", data }, false, false);
};

export const getMediaAudioList = (data = {}) => {
  
  return fetch({ path: "media/audio/list", data }, false, false);
};

export const getMediaInfo = (data = {}) => {
  
  return fetch({ path: "media/info", data }, false, false);
};

export const getToken = (data = {}) => {
  
  return fetch({ path: "user/login", data }, false, false);
};

export const getUserInfo = (data = {}) => {
  
  return fetch({ path: "user/info", data }, false, false);
};

export const getUserPhone = (data = {}) => {
  
  return fetch({ path: "user/phone", data }, false, false);
};
export const saveUserInfo = (data = {}) => {
  
  return fetch({ path: "user/save", data }, false, false);
};

export const getFreeList = (data = {}) => {
  
  return fetch({ path: "media/free/list", data }, false, false);
};
