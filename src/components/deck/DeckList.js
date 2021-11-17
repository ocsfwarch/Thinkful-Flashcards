import React, { useState, useEffect } from "react";
import Deck from "./Deck";

const DeckList = ({ decks, handleDelete }) => {
  const [display, setDisplay] = useState([]);
  useEffect(() => {
    async function mapDecks() {
      const mappedDecks = decks.map((deck) => {
        return (
          <Deck
            key={deck.id}
            deck={deck}
            handleDelete={handleDelete}
            showTotal={true}
          />
        );
      });
      if (mappedDecks && mappedDecks.length) {
        setDisplay((current) => (current = [...mappedDecks]));
      }
    }
    // We want to limit the number of times the display
    // is mapped to the decks.
    if (decks && decks.length && display.length !== decks.length) {
      mapDecks();
    }
  }, [display, decks, handleDelete]);
  return <div>{display}</div>;
};

export default DeckList;