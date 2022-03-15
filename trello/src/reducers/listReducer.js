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
    default:
      return state;
  }
};
export default listsReducer;
