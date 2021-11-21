import Card from "./Card";

const CardList = ({ deck, handleCardDelete }) => {
  const display =
    deck && deck.cards && deck.cards.length
      ? deck.cards.map((card) => (
          <Card
            key={card.id}
            deckId={card.deckId}
            card={card}
            handleCardDelete={handleCardDelete}
          />
        ))
      : "No cards have been created.";
  return (
    <section>
      <h1>Cards</h1>
      {display}
    </section>
  );
};

export default CardList;
