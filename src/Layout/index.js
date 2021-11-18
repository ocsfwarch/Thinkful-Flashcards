import React, { useState, useEffect } from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { Switch, Route } from "react-router-dom";
import CreateDeckBtn from "../components/controls/CreateDeckBtn";
import DeckList from "../components/deck/DeckList";
import DeckForm from "../components/forms/DeckForm";
import CardForm from "../components/forms/CardForm";
import DeckView from "../components/deck/DeckView";
import StudyView from "../components/study/StudyView";
import { deleteDeck, listDecks } from "../utils/api/index";
import { useHistory } from "react-router-dom";

let controller;
function Layout() {
  const [decks, setDecks] = useState([]);
  const [updateDecks, setUpdateDecks] = useState(true);
  const history = useHistory();

  useEffect(() => {
    controller = new AbortController();
    async function getDecks() {
      try {
        if (updateDecks) {
          const theDecks = await listDecks(controller.signal);
          if (theDecks && theDecks.length) {
            setDecks(theDecks);
          }
          setUpdateDecks((current) => (current = false));
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
  }, [updateDecks]);

  const handleDeckDelete = async (deckId) => {
    const result = window.confirm(
      `Delete this deck?\n\nYou will not be able to recover it.`
    );
    if (result) {
      console.log(`HANDLING DELETE`);
      controller = new AbortController();
      try {
        const results = await deleteDeck(deckId, controller.signal);
        if (results) {
          console.log(`delete worked!`);
          setUpdateDecks((current) => (current = true));
        }
      } catch (error) {
        console.log(`ERROR = ${error.message}`);
      }
      //await deletePost(id);
      // TODO: After the post is deleted, send the user to the home page.
      history.push("/");
    }
  };

  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact path="/">
            <CreateDeckBtn />
            <DeckList decks={decks} handleDeckDelete={handleDeckDelete} />
          </Route>
          <Route path="/decks/new">
            <DeckForm setUpdateDecks={setUpdateDecks} />
          </Route>
          <Route path="/decks/:deckId/edit">
            <DeckForm setUpdateDecks={setUpdateDecks} />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <CardForm />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <CardForm />
          </Route>
          <Route path="/decks/:deckId/study">
            <StudyView />
          </Route>
          <Route path="/decks/:deckId">
            <DeckView handleDeckDelete={handleDeckDelete} />
          </Route>
          <NotFound />
        </Switch>
      </div>
    </>
  );
}

export default Layout;
