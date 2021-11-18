import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

const Card = ({ card, handleCardDelete, deckId }) => {
  const { url } = useRouteMatch();
  console.log(`url = ${url}`);

  return (
    <div key={card.id} className="card add-shadow mb-4">
      <div className="card-body card-text">
        <div className="basic-form">
          <label htmlFor="front">Front</label>
          <textarea
            id="front"
            name="front"
            value={card.front}
            readOnly
          ></textarea>
          <label htmlFor="back">Back</label>
          <textarea id="back" name="back" value={card.back} readOnly></textarea>
        </div>
        <div className="card-footer">
          <Link to={`/decks/${deckId}/cards/${card.id}/edit`}>
            <button type="button" className="btn btn-warning mr-2">
              <span className="oi oi-pencil" />
              <span className="pl-3 font-weight-bold">Edit</span>
            </button>
          </Link>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => handleCardDelete(card.id)}
          >
            <span className="oi oi-trash" />
            <span className="pl-3 font-weight-bold">Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
