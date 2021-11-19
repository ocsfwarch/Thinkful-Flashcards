import Card from "./Card";

const CardList = ({ deck, handleCardDelete }) => {
  return (
    <section>
      <h1>Cards</h1>
      {deck && deck.cards && deck.cards.length
        ? deck.cards.map((card) => (
            <Card
              key={card.id}
              deckId={card.deckId}
              card={card}
              handleCardDelete={handleCardDelete}
            />
          ))
        : " "}
    </section>
  );
};

export default CardList;
