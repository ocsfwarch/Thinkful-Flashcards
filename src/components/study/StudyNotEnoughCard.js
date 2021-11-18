/*
  The purpose of this component is to display a message
  to the user in the event there are not enough cards
  in a deck to study.
  Props:
      deckId - This is the id of the deck currently being viewed by the user.
      totalCards - This is the number of cards currently in the deck.
*/

import React from "react";
import { Link } from "react-router-dom";

const StudyNotEnoughCards = ({ deckId, totalCards }) => {
  return (
    <div className="card add-shadow">
      <div className="card-header">
        <div className="card-name-display">
          <span className="title">Not enough cards</span>
        </div>
      </div>
      <div className="card-body card-text">
        You need at least 3 cards to study.{" "}
        {`There are ${totalCards} cards in this deck.`}
      </div>
      <div className="card-footer">
        <Link to={`/decks/${deckId}/cards/new`}>
          <button type="button" className="btn btn-success">
            <span className="oi oi-plus" />
            <span className="pl-3 font-weight-bold">Add Cards</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default StudyNotEnoughCards;
