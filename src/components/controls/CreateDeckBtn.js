/*
  The purpose of this component is to display a command
  button to the user to allow them to create new decks.

*/

import React from "react";
import { Link } from "react-router-dom";

const CreateDeckBtn = () => {
  return (
    <div className="create-deck-btn">
      <Link to="/decks/new">
        <button type="button" className="btn btn-primary">
          <span className="oi oi-plus" />
          <span className="pl-3 font-weight-bold">Create Deck</span>
        </button>
      </Link>
    </div>
  );
};

export default CreateDeckBtn;
