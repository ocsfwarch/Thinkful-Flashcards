import React from "react";
import { Link } from "react-router-dom";

const Deck = ({ deck, handleDeckDelete, showTotal }) => {
  return (
    <div>
      <div>
        <span>{deck.name}</span>{" "}
        <span>{showTotal ? `${deck.cards.length} cards` : ""}</span>
      </div>
      <div>{deck.description}</div>
      <div>
        {showTotal ? (
          <Link to={`/decks/${deck.id}`}>
            <button type="button" className="btn btn-secondary">
              <span className="oi oi-eye" />
              <span className="pl-3 font-weight-bold">View</span>
            </button>
          </Link>
        ) : (
          <Link to={`/decks/${deck.id}/edit`}>
            <button type="button" className="btn btn-warning">
              <span className="oi oi-pencil" />
              <span className="pl-3 font-weight-bold">Edit</span>
            </button>
          </Link>
        )}
        <Link to={`/decks/${deck.id}/study`}>
          <button type="button" className="btn btn-primary">
            <span className="oi oi-book" />
            <span className="pl-3 font-weight-bold">Study</span>
          </button>
        </Link>
        {!showTotal ? (
          <Link to={`/decks/${deck.id}/cards/new`}>
            <button type="button" className="btn btn-success">
              <span className="oi oi-plus" />
              <span className="pl-3 font-weight-bold">Add Cards</span>
            </button>
          </Link>
        ) : (
          ""
        )}
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => handleDeckDelete(deck.id)}
        >
          <span className="oi oi-trash" />
          <span className="pl-3 font-weight-bold">Delete</span>
        </button>
      </div>
    </div>
  );
};

export default Deck;
