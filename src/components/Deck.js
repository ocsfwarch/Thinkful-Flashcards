import React from "react";
import { Link } from "react-router-dom";

const Deck = ({ deck, handleDelete, showTotal }) => {
  return (
    <div>
      <div>
        {deck.name}, {showTotal ? `${deck.cards.length} cards` : ""}
      </div>
      <div>{deck.description}</div>
      <div>
        {showTotal ? (
          <Link to={`/decks/${deck.id}`}>
            <button>View</button>
          </Link>
        ) : (
          <Link to={`/decks/${deck.id}/edit`}>
            <button>Edit</button>
          </Link>
        )}
        <button>Study</button>
        {!showTotal ? (
          <Link to={`/decks/${deck.id}/cards/new`}>
            <button>Add Cards</button>
          </Link>
        ) : (
          ""
        )}
        <button onClick={() => handleDelete(deck.id)}>Delete</button>
      </div>
    </div>
  );
};

export default Deck;
