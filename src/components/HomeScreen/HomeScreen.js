import React, { useCallback, useState } from 'react';
import './HomeScreen.css';

export default function HomeScreen({ createCall, startHairCheck }) {
  const [surveyId, setSurveyId] = useState();

  const startDemo = useCallback(() => {
    createCall(surveyId).then((url) => {
      startHairCheck(url);
    });
  }, [surveyId]);

  return (
    <div className="home-screen">
      <h1>You&apos;ve been invited to participate in a study</h1>
      <p>You&apos;re a possible match for a user testing project on Hotjar Engage</p>
      <div className="form">
        <label htmlFor="surveyId">Enter survey id:</label>
        <input
          name="surveyId"
          type="number"
          placeholder="Enter survey id"
          onChange={(e) => setSurveyId(e.target.value)}
          value={surveyId || undefined}
        />
      </div>
      <button
        onClick={startDemo}
        type="button"
        disabled={!surveyId}
        data-disabled-tooltip-text="Please add a survey id otherwise this hacky thing won't work">
        Get Started
      </button>
    </div>
  );
}
