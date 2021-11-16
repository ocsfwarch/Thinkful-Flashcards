import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { readDeck } from "../utils/api/index";
import Deck from "./Deck";
import Card from "./Card";
import BreadCrumb from "./controls/BreadCrumb";

let controller;
const DeckView = ({ handleDelete }) => {
  const [deck, setDeck] = useState({ cards: [] });
  const [crumbs, setCrumbs] = useState([]);
  const { deckId } = useParams();

  useEffect(() => {
    controller = new AbortController();
    async function getDeck() {
      try {
        const theDeck = await readDeck(deckId, controller.signal);
        if (theDeck) {
          //console.log(Array.isArray(theDeck));
          //if (Array.isArray(theDeck.cards)) {
          //  theDeck.cards.forEach((card) => console.log(`${card.front}`));
          //}
          //for (let x in theDeck.cards) {
          //  console.log(`x = ${x}, val = ${theDeck.cards[x]}`);
          //  for (let y in theDeck.cards[x]) {
          //    console.log(`y = ${y}`);
          //  }
          //}
          setDeck(theDeck);
          setCrumbs(
            (current) =>
              (current = [
                { id: 0, title: "Home", type: "link", value: "" },
                {
                  id: 1,
                  title: theDeck.name,
                  type: "text",
                  value: theDeck.name,
                },
              ])
          );
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
      <BreadCrumb linkId={"DeckView"} crumbs={crumbs} />
      <Deck
        key={deck.id}
        deck={deck}
        handleDelete={handleDelete}
        showTotal={false}
      />
      {deck.cards.map((card) => (
        <Card key={card.id} card={card} />
      ))}
    </div>
  );
};

export default DeckView;
