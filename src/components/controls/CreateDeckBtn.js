import React from "react";
import { Link } from "react-router-dom";

const CreateDeckBtn = () => {
  return (
    <Link to="/decks/new">
      <button type="button" className="btn btn-primary">
        <span className="oi oi-plus" />
        <span className="pl-3 font-weight-bold">Create Deck</span>
      </button>
    </Link>
  );
};

export default CreateDeckBtn;
