import React, { useState } from 'react';
import './HomeScreen.css';
import forms from '../ui/Forms';
import ListItem from '../ui/ListItem';

export default function HomeScreen({ startTest }) {
  const [url, setUrl] = useState('');

  const handleUrlChange = (testingUrl) => {
    sessionStorage.setItem('testingUrl', testingUrl);
    setUrl(testingUrl);
  };

  return (
    <>
      <div className="panel">
        <h1>You&apos;ve been invited to participate in a study</h1>
        <p>
          We would love to improve our check-out flow. That&apos;s we&apos;re collecting love to get
          your feedback whilst you performing some tasks.
        </p>
        <ListItem icon="☀︎" title="It should take approximately 10 minutes." />
        <ListItem icon="✌︎" title="You'll be compensated with €1.50." />
        <ListItem icon="☃︎" title="It'll only be completed on a desktop device." />
      </div>
      <div className="panel">
        <div className="form">
          <h2>Quick sign-up to proceed</h2>
          <p>
            Don&apos;t worry. This information will be used to make sure you get your compensation
          </p>
          {/* TODO: name and email will be required for BYOT participants */}
          {/* <forms.Field name="Your name">
            <input type="text" id="name" placeholder="First name" />
            <input type="text" id="surname" placeholder="Last name" />
          </forms.Field>
          <forms.Field name="Your email">
            <input type="email" id="email" placeholder="Email address" />
          </forms.Field> */}
          <forms.Field name="The website URL you are testing">
            <input
              type="url"
              id="url"
              value={url}
              onChange={(e) => {
                handleUrlChange(e.target.value);
              }}
              placeholder="Testing website URL"
            />
          </forms.Field>
        </div>
      </div>
      <div className="footer">
        <button
          onClick={startTest}
          disabled={!url}
          type="button"
          data-disabled-tooltip-text="Please add the testing website URL, otherwise this hacky thing won't work">
          Next
        </button>
      </div>
    </>
  );
}
