import React from "react";
import { Switch, Route } from "react-router-dom";
import DeckForm from "./forms/DeckForm";

const DeckControl = () => {
  return (
    <div className="container">
      <Switch>
        <Route path="/decks/new">
          <DeckForm />
        </Route>
      </Switch>
    </div>
  );
};

export default DeckControl;
