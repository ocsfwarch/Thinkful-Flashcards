/*
  The purpose of this component is to manage the display
  of the study card materials
  Props:
      deck - This is the deck that is to be studied.
*/

import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const StudyCard = ({ deck }) => {
  const [studyState, setStudyState] = useState({
    current: 0,
    front: deck.cards[0].front,
    back: deck.cards[0].back,
    isFlipped: false,
    isFlipping: false,
  });
  const [content, setContent] = useState(deck.cards[0].front);
  const history = useHistory();

  const handleFlip = (e) => {
    e.preventDefault();
    if (!studyState.isFlipped) {
      setStudyState({ ...studyState, isFlipped: true, isFlipping: true });
      rotateCard();
      //setContent(studyState.isFlipped ? studyState.back : studyState.front);
    } else {
      const next = studyState.current + 1;
      if (next < deck.cards.length) {
        setStudyState({
          current: next,
          front: deck.cards[next].front,
          back: deck.cards[next].back,
          isFlipped: false,
        });
        setContent(deck.cards[next].front);
      } else {
        const result = window.confirm(
          `Restart cards?\n\nClick 'cancel' to return to the home page.`
        );
        if (result) {
          setStudyState({
            current: 0,
            front: deck.cards[0].front,
            back: deck.cards[0].back,
            isFlipped: false,
          });
          setContent(deck.cards[0].front);
        } else {
          history.push("/");
        }
      }
    }
  };

  function rotateCard() {
    const cardDisplay = document.querySelector(`#card-display`);
    if (cardDisplay) {
      cardDisplay.style.animation = "rotate_front .75s linear forwards";
    }
  }

  function handleRotateAnimationEnd(event) {
    event.preventDefault();
    const cardDisplay = document.querySelector(`#card-display`);
    if (cardDisplay) {
      cardDisplay.style.animation = "rotate_back .75s linear forwards";
      setContent(studyState.isFlipped ? studyState.back : studyState.front);
      setStudyState({ ...studyState, isFlipping: false });
    }
  }

  return (
    <div className="card add-shadow">
      <div className="card-header">
        <div className="card-name-display">
          <span className="title">{`Card ${studyState.current + 1} of ${
            deck.cards.length
          }`}</span>
        </div>
      </div>
      <div className="card-body card-text">
        <div id="card-display" onAnimationEnd={handleRotateAnimationEnd}>
          {content}
        </div>
      </div>
      <div className="card-footer">
        <button
          type="button"
          className="btn btn-success"
          onClick={handleFlip}
          disabled={studyState.isFlipped}
        >
          <span className="oi oi-bolt" />
          <span className="pl-3 font-weight-bold">Flip</span>
        </button>
        {studyState.isFlipped ? (
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleFlip}
            disabled={studyState.isFlipping}
          >
            <span className="oi oi-arrow-circle-right" />
            <span className="pl-3 font-weight-bold">Next</span>
          </button>
        ) : (
          <span></span>
        )}
      </div>
    </div>
  );
};

export default StudyCard;
