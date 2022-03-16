import { CONSTANT } from ".";
export const addCard = (listID, text) => {
  return {
    type: CONSTANT.ADD_CARD,
    payload: { text, listID },
  };
};
