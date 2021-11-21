/*
  The purpose of this component is to allow a user
  to modify a card already in a deck.
  Props:
      deckName - The current deck name
      setUpdateDecks - This function triggers the app to refresh the decks.
      updateStatus - This function triggers the Status display.
*/

import React from "react";
import { useParams } from "react-router-dom";
import BreadCrumb from "../controls/BreadCrumb";
import CardForm from "../forms/CardForm";

const EditCard = ({ deckName, setUpdateDecks, updateStatus }) => {
  const { deckId, cardId } = useParams();
  return (
    <div>
      <BreadCrumb
        linkId={"CardForm"}
        crumbs={[
          { id: 0, title: "Home", type: "link", value: "" },
          {
            id: 1,
            title: deckName,
            type: "link",
            value: `decks/${deckId}`,
          },
          {
            id: 2,
            title: "Edit Card",
            type: "text",
            value: "Edit Card",
          },
        ]}
      />
      <h1>
        {deckName}: {"Edit Card"}
      </h1>
      <div className="card add-shadow">
        <div className="card-body card-text"></div>
        <CardForm
          deckId={deckId}
          cardId={cardId}
          setUpdateDecks={setUpdateDecks}
          updateStatus={updateStatus}
        />
      </div>
    </div>
  );
};

export default EditCard;
