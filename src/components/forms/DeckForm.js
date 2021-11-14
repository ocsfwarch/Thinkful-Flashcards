import React, { useState, useEffect } from "react";
import { createDeck, readDeck, updateDeck } from "../../utils/api/index";
import { useHistory, useParams } from "react-router-dom";

let controller;
const DeckForm = () => {
  const [deck, setDeck] = useState({ name: "", description: "" });
  const history = useHistory();
  const { deckId } = useParams();

  useEffect(() => {
    controller = new AbortController();
    async function getDeck() {
      try {
        if (deckId) {
          const theDeck = await readDeck(deckId, controller.signal);
          if (theDeck) {
            setDeck(theDeck);
          }
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

  const handleChange = (e) => {
    setDeck({ ...deck, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (deckId) {
      modifyDeck();
    } else {
      addDeck();
    }
  };
  const handleCancel = (e) => {
    e.preventDefault();
    history.push("/");
  };

  const addDeck = async () => {
    controller = new AbortController();
    try {
      const newDeck = await createDeck(deck, controller.signal);
      if (newDeck) {
        history.push(`/decks/${newDeck.id}`);
      }
    } catch (error) {
      console.log(`ERROR = ${error.message}`);
    }
  };

  const modifyDeck = async () => {
    controller = new AbortController();
    try {
      const newDeck = await updateDeck(deck, controller.signal);
      if (newDeck) {
        history.push(`/decks/${newDeck.id}`);
      }
    } catch (error) {
      console.log(`ERROR = ${error.message}`);
    }
  };

  return (
    <section>
      <h1>{deckId ? "Edit Deck" : "Create Deck"}</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={handleChange}
          value={deck.name}
          required
        />
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          onChange={handleChange}
          value={deck.description}
          required
        ></textarea>
        <button type="submit">Submit</button>
        <button type="none" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </section>
  );
};

export default DeckForm;
