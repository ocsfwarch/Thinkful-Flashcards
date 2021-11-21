/*
  The purpose of this component is to provide a form
  to add cards to a deck or modify cards already in a deck.
  Props:
      deckId - Identifies the deck to update.
      cardId - Identifies the card to update, if included.
      setUpdateDecks - This function triggers the app to refresh the decks.
      updateStatus - This function triggers the Status display.
*/

import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { readDeck, createCard, updateCard } from "../../utils/api/index";

let controller;
const CardForm = ({ deckId, cardId, setUpdateDecks, updateStatus }) => {
  const [card, setCard] = useState({ front: "", back: "" });
  const history = useHistory();

  useEffect(() => {
    controller = new AbortController();
    async function getDeck() {
      try {
        if (cardId) {
          const theDeck = await readDeck(deckId, controller.signal);
          if (theDeck) {
            // Set the card, if found
            if (theDeck && theDeck.cards && theDeck.cards.length) {
              const theCard = await theDeck.cards.find(
                (card) => +card.id === +cardId
              );
              if (theCard) {
                setCard(theCard);
              }
            }
          }
        }
      } catch (error) {
        updateStatus(`ERROR: ${error.message}`);
      }
    }
    getDeck();
    return () => {
      controller.abort();
    };
  }, [deckId, cardId, updateStatus]);

  const handleChange = (e) => {
    setCard({ ...card, [e.target.name]: e.target.value });
  };

  const handleDone = (e) => {
    e.preventDefault();
    history.goBack();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (deckId && cardId) {
      modifyCard();
      history.goBack();
    } else {
      addCard();
      setCard({ deckId: deckId, front: "", back: "" });
    }
  };

  const modifyCard = async () => {
    controller = new AbortController();
    try {
      // Make sure there is a cardId, for card updates
      setCard({ ...card, [`id`]: cardId });
      const results = await updateCard(card, controller.signal);
      if (results) {
        updateStatus(`The card was updated`);
      } else {
        updateStatus(`The card was not updated.`);
      }
    } catch (error) {
      updateStatus(`ERROR: ${error.message}`);
    }
  };

  const addCard = async () => {
    controller = new AbortController();
    try {
      // cardId is not required for new cards
      const results = await createCard(deckId, card, controller.signal);
      if (results) {
        updateStatus(`The card was created`);
        setUpdateDecks(true);
      } else {
        updateStatus(`The card was not created.`);
      }
    } catch (error) {
      updateStatus(`ERROR: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="basic-form">
        <label htmlFor="front">Front</label>
        <textarea
          id="front"
          name="front"
          onChange={handleChange}
          value={card.front}
          placeholder="Front side of card"
          required
        ></textarea>
        <label htmlFor="back">Back</label>
        <textarea
          id="back"
          name="back"
          onChange={handleChange}
          value={card.back}
          placeholder="Back side of card"
          required
        ></textarea>
      </div>
      <div className="card-footer">
        <button
          type="button"
          className="btn btn-danger mr-2"
          onClick={handleDone}
        >
          <span className="oi oi-x" />
          <span className="pl-3 font-weight-bold">Done</span>
        </button>
        <button type="submit" className="btn btn-success">
          <span className="oi oi-plus" />
          <span className="pl-3 font-weight-bold">Save</span>
        </button>
      </div>
    </form>
  );
};

export default CardForm;
