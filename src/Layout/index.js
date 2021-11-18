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
import Status from "../components/controls/Status";
import { deleteDeck, listDecks } from "../utils/api/index";
import { useHistory } from "react-router-dom";

let controller;
function Layout() {
  const [decks, setDecks] = useState([]);
  const [updateDecks, setUpdateDecks] = useState(true);
  const [status, setStatus] = useState(""); // This contains the status information
  const history = useHistory();

  // The purpose of this hook is to clear the status field
  // after 1 second.
  useEffect(() => {
    const timer = setTimeout(() => {
      updateStatus("");
    }, 1000);
    return () => clearTimeout(timer);
  }, [status]);

  useEffect(() => {
    controller = new AbortController();
    async function getDecks() {
      try {
        if (updateDecks) {
          const theDecks = await listDecks(controller.signal);
          if (theDecks && theDecks.length) {
            setDecks(theDecks);
          }
          setUpdateDecks(false);
        }
      } catch (error) {
        updateStatus(`ERROR: ${error.message}`);
      }
    }
    getDecks();
    return () => {
      controller.abort();
    };
  }, [updateDecks]);

  const handleDeckDelete = async (deckId) => {
    const result = window.confirm(
      `Delete this deck?\n\nYou will not be able to recover it.`
    );
    if (result) {
      controller = new AbortController();
      try {
        const results = await deleteDeck(deckId, controller.signal);
        if (results) {
          setUpdateDecks((current) => (current = true));
        }
      } catch (error) {
        updateStatus(`ERROR = ${error.message}`);
      }
      history.push("/");
    }
  };

  const updateStatus = (strStatus) => {
    setStatus(strStatus);
  };

  return (
    <>
      <Header />
      <Status status={status} />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <CreateDeckBtn />
            <DeckList decks={decks} handleDeckDelete={handleDeckDelete} />
          </Route>
          <Route path="/decks/new">
            <DeckForm
              updateStatus={updateStatus}
              setUpdateDecks={setUpdateDecks}
            />
          </Route>
          <Route path="/decks/:deckId/edit">
            <DeckForm
              updateStatus={updateStatus}
              setUpdateDecks={setUpdateDecks}
            />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <CardForm updateStatus={updateStatus} />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <CardForm updateStatus={updateStatus} />
          </Route>
          <Route path="/decks/:deckId/study">
            <StudyView updateStatus={updateStatus} />
          </Route>
          <Route path="/decks/:deckId">
            <DeckView
              updateStatus={updateStatus}
              handleDeckDelete={handleDeckDelete}
            />
          </Route>
          <NotFound />
        </Switch>
      </div>
    </>
  );
}

export default Layout;
