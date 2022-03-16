import { CONSTANT } from "../actions";

let listID = 2;
let cardID = 4;
const initalState = [
  {
    title: "last Episode",
    id: 0,
    cards: [
      { id: 0, text: "we created a static list and a static card" },
      { id: 1, text: "we used a mix between material" },
    ],
  },
  {
    title: "this Episode",
    id: 1,
    cards: [
      { id: 0, text: "Hi" },
      { id: 1, text: "we used a mix between material" },
      { id: 2, text: "what?" },
    ],
  },
];
const listsReducer = (state = initalState, action) => {
  switch (action.type) {
    case CONSTANT.ADD_LIST:
      const newList = {
        title: action.payload,
        cards: [],
        id: listID,
      };
      listID += 1;
      return [...state, newList];
    default:
      return state;
  }
};
export default listsReducer;
