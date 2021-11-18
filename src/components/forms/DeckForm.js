import React, { useState, useEffect } from "react";
import { createDeck, readDeck, updateDeck } from "../../utils/api/index";
import { useHistory, useParams } from "react-router-dom";
import BreadCrumb from "../controls/BreadCrumb";

let controller;
const DeckForm = ({ setUpdateDecks }) => {
  const [deck, setDeck] = useState({ name: "", description: "" });
  const [crumbs, setCrumbs] = useState([]);
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
            setCrumbs(
              (current) =>
                (current = [
                  { id: 0, title: "Home", type: "link", value: "" },
                  {
                    id: 1,
                    title: "Edit Deck",
                    type: "text",
                    value: "Edit Deck",
                  },
                ])
            );
          }
        } else {
          setCrumbs(
            (current) =>
              (current = [
                { id: 0, title: "Home", type: "link", value: "" },
                {
                  id: 1,
                  title: "Create Deck",
                  type: "text",
                  value: "Create Deck",
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
        setUpdateDecks(true);
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
        setUpdateDecks(true);
        history.push(`/decks/${newDeck.id}`);
      }
    } catch (error) {
      console.log(`ERROR = ${error.message}`);
    }
  };

  return (
    <div>
      <BreadCrumb linkId={"DeckForm"} crumbs={crumbs} />
      <h1>{deckId ? "Edit Deck" : "Create Deck"}</h1>

      <div className="card add-shadow">
        <div className="card-body card-text">
          <form onSubmit={handleSubmit}>
            <div className="basic-form">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                onChange={handleChange}
                value={deck.name}
                placeholder="Deck Name"
                required
              />
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                onChange={handleChange}
                value={deck.description}
                placeholder="Brief description of deck"
                required
              ></textarea>
            </div>
            <div className="card-footer">
              <button
                type="button"
                className="btn btn-danger mr-2"
                onClick={handleCancel}
              >
                <span className="oi oi-x" />
                <span className="pl-3 font-weight-bold">Cancel</span>
              </button>
              <button type="submit" className="btn btn-success">
                <span className="oi oi-plus" />
                <span className="pl-3 font-weight-bold">Submit</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DeckForm;
