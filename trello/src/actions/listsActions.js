import { CONSTANT } from ".";
export const addList = (title) => {
  return {
    type: CONSTANT.ADD_LIST,
    payload: title,
  };
};
