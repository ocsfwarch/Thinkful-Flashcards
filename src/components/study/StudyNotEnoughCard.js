import React from "react";
import { Link } from "react-router-dom";

const StudyNotEnoughCards = ({ deckId }) => {
  return (
    <div>
      <h2>Not enough cards</h2>
      <Link to={`/decks/${deckId}/cards/new`}>
        <button type="button" className="btn btn-success">
          <span className="oi oi-plus" />
          <span className="pl-3 font-weight-bold">Add Cards</span>
        </button>
      </Link>
    </div>
  );
};

export default StudyNotEnoughCards;
