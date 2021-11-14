import React, { useState, useEffect } from "react";
import { listDecks } from "../utils/api/index";
import Deck from "./Deck";

let controller;
const DeckList = ({ handleDelete }) => {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    controller = new AbortController();
    async function getDecks() {
      try {
        const theDecks = await listDecks(controller.signal);
        if (theDecks && theDecks.length) {
          setDecks(theDecks);
        }
      } catch (error) {
        console.log(`ERROR: ${error.message}`);
      }
    }
    getDecks();
    return () => {
      console.log(`getDecks DONE`);
      controller.abort();
    };
  }, []);
  return (
    <div>
      {decks.map((deck) => {
        return (
          <Deck
            key={deck.id}
            deck={deck}
            handleDelete={handleDelete}
            showTotal={true}
          />
        );
      })}
    </div>
  );
};

export default DeckList;
