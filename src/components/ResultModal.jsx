import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

const ResultModal = forwardRef(function ResultModal({ handleReset, targetTime, remainingTime }, ref) {
  const dialog = useRef();

  const userLost = remainingTime <= 0;
  const formattedRemainingTime = (remainingTime / 1000).toFixed(2);
  const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);

  useImperativeHandle(ref, () => {
    return {
      open() {
        if (!dialog.current.open) {
          dialog.current.showModal();
        }
      },
    };
  });

  return createPortal(
    <dialog ref={dialog} onClose={handleReset} className="result-modal">
      {userLost && <h2>You lost</h2>}
      {!userLost && <h2>Yor score: {score}</h2>}
      <p>
        The target time was <strong>{targetTime}</strong> seconds
      </p>
      <p>
        You stopped time at <strong> {formattedRemainingTime} seconds</strong>
      </p>
      <form method="dialog" onSubmit={handleReset}>
        <button>Close</button>
      </form>
    </dialog>,
    document.getElementById("modal")
  );
});

export default ResultModal;
