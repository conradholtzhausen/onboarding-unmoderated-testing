import React from 'react';
import './HomeScreen.css';

export default function HomeScreen({ startTest }) {
  return (
    <>
      <div className="panel">
        <h1>You&apos;ve been invited to participate in a study</h1>
        <p>You&apos;re a possible match for a user testing project on Hotjar Engage</p>
      </div>
      <div className="panel">
        form comes here
      </div>
      <div className="footer">
        <button
          onClick={startTest}
          type="button"
          data-disabled-tooltip-text="Please add a survey id otherwise this hacky thing won't work">
          Get Started
        </button>
      </div>
    </>
  );
}
