import React from "react";

const Card = (card) => {
  return (
    <div>
      <p>{card.front}</p>
      <p>{card.back}</p>
      <button>Edit</button>
      <button>Delete</button>
    </div>
  );
};

export default Card;
