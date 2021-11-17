import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

const Card = ({ card, handleCardDelete, deckId }) => {
  const { url } = useRouteMatch();
  console.log(`url = ${url}`);

  return (
    <div key={card.id}>
      <p>{card.front}</p>
      <p>{card.back}</p>
      <Link to={`/decks/${deckId}/cards/${card.id}/edit`}>
        <button type="button" className="btn btn-warning">
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
  );
};

export default Card;
