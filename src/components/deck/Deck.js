import React from "react";
import { Link } from "react-router-dom";

const Deck = ({ deck, handleDeckDelete, showTotal }) => {
  return (
    <div className="row mb-3">
      <div className="col">
        <div className="card add-shadow">
          <div className="card-header">
            <div className="card-name-display">
              <span className="title">{deck.name}</span>
              <span>{showTotal ? `${deck.cards.length} cards` : ""}</span>
            </div>
          </div>
          <div className="card-body card-text">{deck.description}</div>
          <div className="card-footer">
            {showTotal ? (
              <Link to={`/decks/${deck.id}`}>
                <button type="button" className="btn btn-secondary mr-1">
                  <span className="oi oi-eye" />
                  <span className="pl-3 font-weight-bold">View</span>
                </button>
              </Link>
            ) : (
              <Link to={`/decks/${deck.id}/edit`}>
                <button type="button" className="btn btn-warning mr-1">
                  <span className="oi oi-pencil" />
                  <span className="pl-3 font-weight-bold">Edit</span>
                </button>
              </Link>
            )}
            <Link to={`/decks/${deck.id}/study`}>
              <button type="button" className="btn btn-primary mr-1">
                <span className="oi oi-book" />
                <span className="pl-3 font-weight-bold">Study</span>
              </button>
            </Link>
            {!showTotal ? (
              <Link to={`/decks/${deck.id}/cards/new`}>
                <button type="button" className="btn btn-success mr-1">
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
      </div>
    </div>
  );
};

export default Deck;
