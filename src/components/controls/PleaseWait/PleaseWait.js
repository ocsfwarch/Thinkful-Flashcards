import React from "react";
import "./PleaseWait.css";
import waitImg from "../../../images/wait26.gif";

function PleaseWait(props) {
  return (
    <div
      className={
        props.showMe ? "pleaseWaitContainer" : "pleaseWaitContainerHide"
      }
    >
      <div className="pleaseWaitBackground"></div>
      <div className="pleaseWaitDisplay">
        <img src={waitImg} title="Processing Request" alt="Please Wait" />
      </div>
    </div>
  );
}

export default PleaseWait;
