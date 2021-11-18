import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readDeck, createCard, updateCard } from "../../utils/api/index";
import BreadCrumb from "../controls/BreadCrumb";

let controller;
const CardForm = ({ updateStatus }) => {
  const { deckId, cardId } = useParams();
  const [deck, setDeck] = useState({});
  const [card, setCard] = useState({ deckId: deckId, front: "", back: "" });
  const [crumbs, setCrumbs] = useState([]);
  const history = useHistory();

  useEffect(() => {
    controller = new AbortController();
    async function getDeck() {
      try {
        const theDeck = await readDeck(deckId, controller.signal);
        if (theDeck) {
          setDeck(theDeck);
          // Set the card
          const theCard = await theDeck.cards.find(
            (card) => +card.id === +cardId
          );
          if (theCard) {
            setCard(theCard);
          }
          setCrumbs(
            (current) =>
              (current = [
                { id: 0, title: "Home", type: "link", value: "" },
                {
                  id: 1,
                  title: theDeck.name,
                  type: "link",
                  value: `decks/${deckId}`,
                },
                {
                  id: 2,
                  title: cardId ? "Edit Card" : "Add Card",
                  type: "text",
                  value: cardId ? "Edit Card" : "Add Card",
                },
              ])
          );
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
      // Make sure there is a cardId
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
      const results = await createCard(deckId, card, controller.signal);
      if (results) {
        updateStatus(`The card was created`);
      } else {
        updateStatus(`The card was not created.`);
      }
    } catch (error) {
      updateStatus(`ERROR: ${error.message}`);
    }
  };

  return (
    <div>
      <BreadCrumb linkId={"CardForm"} crumbs={crumbs} />
      <h1>
        {deck.name}: {cardId ? "Edit Card" : "Add Card"}
      </h1>
      <div className="card add-shadow">
        <div className="card-body card-text">
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
        </div>
      </div>
    </div>
  );
};

export default CardForm;
