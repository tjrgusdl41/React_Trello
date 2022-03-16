import React from "react";
import { connect } from "react-redux";
import TrelloActionButton from "./trelloActionButton";
import TrelloList from "./TrelloList";

function App({ lists }) {
  return (
    <div className="App" style={styles.app}>
      <h2>Hello</h2>
      <div style={styles.listsContainer}>
        {lists.map(({ title, cards }, id) => (
          <TrelloList key={id} title={title} cards={cards} />
        ))}
        <TrelloActionButton list={lists} />
      </div>
    </div>
  );
}
const styles = {
  listsContainer: { display: "flex", flexDirection: "row" },
};
const mapStateToProps = (state) => ({ lists: state.lists });
export default connect(mapStateToProps)(App);
