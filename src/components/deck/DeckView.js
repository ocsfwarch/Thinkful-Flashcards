/*
  The purpose of this component is to display the deck
  information and any existing card information to the user.

  Props:
      setUpdateDecks - This function triggers the app to refresh the decks.
      updateStatus - This function triggers the Status display.
      handleDeckDelete - This function performs the actual deck deletion and
      subsequent display updates.
*/

import React, { useEffect, useState } from "react";
import { useParams, Switch, Route, useRouteMatch } from "react-router-dom";
import { readDeck, deleteCard } from "../../utils/api/index";
import Deck from "./Deck";
import CardList from "../card/CardList";
import BreadCrumb from "../controls/BreadCrumb";
import AddCard from "../card/AddCard";
import EditCard from "../card/EditCard";

let controller;
const DeckView = ({ setUpdateDecks, updateStatus, handleDeckDelete }) => {
  const [deck, setDeck] = useState({ cards: [] });
  const [crumbs, setCrumbs] = useState([]);
  const { deckId } = useParams();
  const { url } = useRouteMatch();

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
      <Switch>
        <Route exact path={url}>
          <BreadCrumb linkId={"DeckView"} crumbs={crumbs} />
          <Deck
            key={deck.id}
            deck={deck}
            handleDeckDelete={handleDeckDelete}
            showTotal={false}
          />
          <CardList deck={deck} handleCardDelete={handleCardDelete} />
        </Route>
        <Route path="/decks/:deckId/cards/new">
          <AddCard
            deckName={deck.name}
            updateStatus={updateStatus}
            setUpdateDecks={setUpdateDecks}
          />
        </Route>
        <Route path="/decks/:deckId/cards/:cardId/edit">
          <EditCard
            deckName={deck.name}
            updateStatus={updateStatus}
            setUpdateDecks={setUpdateDecks}
          />
        </Route>
      </Switch>
    </div>
  );
};

export default DeckView;
