import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const StudyCard = ({ deck }) => {
  const [studyState, setStudyState] = useState({
    current: 0,
    front: deck.cards[0].front,
    back: deck.cards[0].back,
    isFlipped: false,
  });
  const history = useHistory();

  const handleFlip = (e) => {
    e.preventDefault();
    if (!studyState.isFlipped) {
      setStudyState({ ...studyState, isFlipped: true });
    } else {
      const next = studyState.current + 1;
      if (next < deck.cards.length) {
        setStudyState({
          current: next,
          front: deck.cards[next].front,
          back: deck.cards[next].back,
          isFlipped: false,
        });
      } else {
        const result = window.confirm(`Restart cards?`);
        if (result) {
          history.push("/");
        } else {
          setStudyState({
            current: 0,
            front: deck.cards[0].front,
            back: deck.cards[0].back,
            isFlipped: false,
          });
        }
      }
    }
  };
  return (
    <div>
      <h2>{`Card ${studyState.current + 1} of ${deck.cards.length}`}</h2>
      <h3>{studyState.isFlipped ? studyState.back : studyState.front}</h3>
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
        <button type="button" className="btn btn-success" onClick={handleFlip}>
          <span className="oi oi-bolt" />
          <span className="pl-3 font-weight-bold">Next</span>
        </button>
      ) : (
        <span></span>
      )}
    </div>
  );
};

export default StudyCard;
