import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { readDeck } from "../../utils/api/index";
import BreadCrumb from "../controls/BreadCrumb";

let controller;
const CardForm = () => {
  const [deck, setDeck] = useState({});
  const [crumbs, setCrumbs] = useState([]);
  const { deckId } = useParams();
  useEffect(() => {
    controller = new AbortController();
    async function getDeck() {
      try {
        const theDeck = await readDeck(deckId, controller.signal);
        if (theDeck) {
          setDeck(theDeck);
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
                  title: "Add Card",
                  type: "text",
                  value: "Add Card",
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
      <BreadCrumb linkId={"CardForm"} crumbs={crumbs} />
      <h1>{deck.name}: Add Card</h1>
      <form>
        <label htmlFor="front">
          <textarea id="front" name="front"></textarea>
        </label>
        <label htmlFor="back">
          <textarea id="back" name="back"></textarea>
        </label>
        <button type="none">Done</button>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default CardForm;
