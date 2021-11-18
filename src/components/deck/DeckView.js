import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { readDeck, deleteCard } from "../../utils/api/index";
import Deck from "./Deck";
import Card from "./Card";
import BreadCrumb from "../controls/BreadCrumb";
import PleaseWait from "../controls/PleaseWait/PleaseWait";

let controller;
const DeckView = ({ updateStatus, handleDeckDelete }) => {
  const [deck, setDeck] = useState({ cards: [] });
  const [crumbs, setCrumbs] = useState([]);
  const [pleaseWait, setPleaseWait] = useState(true);
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
              type: "text",
              value: theDeck.name,
            },
          ]);
          setPleaseWait(false);
        }
      } catch (error) {
        updateStatus(`ERROR: ${error.message}`);
      }
    }
    getDeck();
    return () => {
      controller.abort();
    };
  }, [deckId, updateStatus]);

  const handleCardDelete = async (cardId) => {
    const result = window.confirm(
      `Delete this card?\n\nYou will not be able to recover it.`
    );
    if (result) {
      controller = new AbortController();
      try {
        const results = await deleteCard(cardId, controller.signal);
        if (results) {
          const newCards = deck.cards.filter((card) => +card.id !== +cardId);
          setDeck({ ...deck, cards: [...newCards] });
        }
      } catch (error) {
        updateStatus(`ERROR = ${error.message}`);
      }
    }
  };

  return (
    <div>
      <BreadCrumb linkId={"DeckView"} crumbs={crumbs} />
      <PleaseWait showMe={pleaseWait} />
      <Deck
        key={deck.id}
        deck={deck}
        handleDeckDelete={handleDeckDelete}
        showTotal={false}
      />
      <section>
        <h1>Cards</h1>
        {deck.cards.map((card) => (
          <Card
            key={card.id}
            deckId={deckId}
            card={card}
            handleCardDelete={handleCardDelete}
          />
        ))}
      </section>
    </div>
  );
};

export default DeckView;
