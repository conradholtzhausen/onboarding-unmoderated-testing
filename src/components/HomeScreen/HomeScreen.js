import React from 'react';
import './HomeScreen.css';

export default function HomeScreen({ createCall, startHairCheck }) {
  const startDemo = () => {
    createCall().then((url) => {
      startHairCheck(url);
    });
  };

  return (
    <div className="home-screen">
      <h1>You&apos;ve been invited to participate in a study</h1>
      <p>You&apos;re a possible match for a user testing project on Hotjar Engage</p>
      <button onClick={startDemo} type="button">
        Get Started
      </button>
    </div>
  );
}
