import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { readDeck } from "../../utils/api/index";
import BreadCrumb from "../controls/BreadCrumb";
import StudyCard from "./StudyCard";
import StudyNotEnoughCards from "./StudyNotEnoughCard";

let controller;
const StudyView = () => {
  const [deck, setDeck] = useState({ cards: [] });
  const [crumbs, setCrumbs] = useState([]);
  const { deckId } = useParams();

  useEffect(() => {
    controller = new AbortController();
    async function getDeck() {
      try {
        const theDeck = await readDeck(deckId, controller.signal);
        if (theDeck) {
          setDeck(theDeck);
          setCrumbs([
            { id: 0, title: "Home", type: "link", value: "" },
            {
              id: 1,
              title: theDeck.name,
              type: "link",
              value: `decks/${deckId}`,
            },
            {
              id: 2,
              title: "Study",
              type: "text",
              value: "Study",
            },
          ]);
        }
      } catch (error) {
        console.log(`ERROR: ${error.message}`);
      }
    }
    getDeck();
    return () => {
      //console.log(`getDeck DONE`);
      controller.abort();
    };
  }, [deckId]);

  return (
    <div>
      <BreadCrumb linkId={"DeckView"} crumbs={crumbs} />
      <h1>{`Study: ${deck.name}`}</h1>
      {deck.cards.length < 3 ? (
        <StudyNotEnoughCards deckId={deckId} totalCards={deck.cards.length} />
      ) : (
        <StudyCard deck={deck} />
      )}
    </div>
  );
};

export default StudyView;
