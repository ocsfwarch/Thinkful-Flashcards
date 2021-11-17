import React, { useState, useEffect } from "react";
import Deck from "./Deck";

const DeckList = ({ decks, handleDeckDelete }) => {
  const [display, setDisplay] = useState([]);
  useEffect(() => {
    async function mapDecks() {
      const mappedDecks = decks.map((deck) => {
        return (
          <Deck
            key={deck.id}
            deck={deck}
            handleDeckDelete={handleDeckDelete}
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
  }, [display, decks, handleDeckDelete]);
  return <div>{display}</div>;
};

export default DeckList;
