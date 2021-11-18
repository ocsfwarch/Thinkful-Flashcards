/*
  The purpose of this component is to display a command
  button to the user to allow them to create new decks.

  Props:
      status - This is a string containing status information.
*/

import React from "react";
function Status(props) {
  return <section className="status">{props.status}</section>;
}

export default Status;
