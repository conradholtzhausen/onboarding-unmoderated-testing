import React from 'react';

export default function UnmoderatedTest() {
  return (
    <>
      <div className="panel">
        <h1>Before you get started</h1>
        <p>
          This task requests recordings for us to better understand your feedback. Please make sure
          you have the tech set up before moving forward.
        </p>
      </div>
      <div className="panel">form comes here</div>
      <div className="footer">
        <button
          onClick={() => {
            /** needs something here */
          }}
          type="button"
          data-disabled-tooltip-text="Please add a survey id otherwise this hacky thing won't work">
          Get Started
        </button>
      </div>
    </>
  );
}
