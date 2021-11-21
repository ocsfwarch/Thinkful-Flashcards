/*
  The purpose of this component is to display a list of decks
  to the user.

  Props:
      decks - The list of decks to display.
      handleDeckDelete - This function performs the actual deck deletion and
      subsequent display updates.
*/

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
        setDisplay([...mappedDecks]);
      }
    }
    // We want to limit the number of times the display
    // is mapped to the decks.
    if (decks && decks.length && display.length !== decks.length) {
      mapDecks();
    }
  }, [display, decks, handleDeckDelete]);
  return <div className="deck-list-container">{display}</div>;
};

export default DeckList;
