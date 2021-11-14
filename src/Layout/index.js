import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { Switch, Route } from "react-router-dom";
import CreateDeckBtn from "../components/CreateDeckBtn";
import DeckList from "../components/DeckList";
import DeckForm from "../components/forms/DeckForm";
import CardForm from "../components/forms/CardForm";
import DeckView from "../components/DeckView";
import { deleteDeck } from "../utils/api/index";

let controller;
function Layout() {
  const handleDelete = async (deckId) => {
    const result = window.confirm(
      `Are you sure you want to delete this deckId = ${deckId}?`
    );
    if (result) {
      console.log(`HANDLING DELETE`);
      controller = new AbortController();
      try {
        const results = await deleteDeck(deckId, controller.signal);
        if (results) {
          console.log(`delete worked!`);
        }
      } catch (error) {
        console.log(`ERROR = ${error.message}`);
      }
      //await deletePost(id);
      // TODO: After the post is deleted, send the user to the home page.
      //history.push("/");
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
            <DeckList handleDelete={handleDelete} />
          </Route>
          <Route path="/decks/new">
            <DeckForm />
          </Route>
          <Route path="/decks/:deckId/edit">
            <DeckForm />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <CardForm />
          </Route>
          <Route path="/decks/:deckId">
            <DeckView handleDelete={handleDelete} />
          </Route>
          <NotFound />
        </Switch>
      </div>
    </>
  );
}

export default Layout;
