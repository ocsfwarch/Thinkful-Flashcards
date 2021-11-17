import React from "react";

const Card = (card) => {
  //console.log(Array.isArray(card));
  //for (let x in card) {
  //  console.log(`x = ${x}, value = ${card[x].front}`);
  //}
  //console.log(`${card.card.front}`);
  return (
    <div key={card.card.id}>
      <p>{card.card.front}</p>
      <p>{card.card.back}</p>
      <button>Edit</button>
      <button>Delete</button>
    </div>
  );
};

export default Card;
