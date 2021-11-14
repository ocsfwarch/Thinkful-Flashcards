import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { readDeck } from "../utils/api/index";
import Deck from "./Deck";

let controller;
const DeckView = ({ handleDelete }) => {
  const [deck, setDeck] = useState({});
  const { deckId } = useParams();

  useEffect(() => {
    controller = new AbortController();
    async function getDeck() {
      try {
        const theDeck = await readDeck(deckId, controller.signal);
        if (theDeck) {
          setDeck(theDeck);
        }
      } catch (error) {
        console.log(`ERROR: ${error.message}`);
      }
    }
    getDeck();
    return () => {
      console.log(`getDeck DONE`);
      controller.abort();
    };
  }, [deckId]);

  return (
    <div>
      <Deck
        key={deck.id}
        deck={deck}
        handleDelete={handleDelete}
        showTotal={false}
      />
    </div>
  );
};

export default DeckView;
