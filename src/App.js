import './App.css';

import React, { useEffect, useState, useCallback } from 'react';
import DailyIframe from '@daily-co/daily-js';
import { DailyAudio, DailyProvider } from '@daily-co/daily-react';

import HomeScreen from './components/HomeScreen/HomeScreen';
import UnmoderatedTest from './components/UnmoderatedTest/UnmoderatedTest';

/* We decide what UI to show to users based on the state of the app, which is dependent on the state of the call object. */
const STATE_IDLE = 'STATE_IDLE';
// const STATE_CREATING = 'STATE_CREATING';
const STATE_JOINING = 'STATE_JOINING';
const STATE_JOINED = 'STATE_JOINED';
const STATE_LEAVING = 'STATE_LEAVING';
const STATE_ERROR = 'STATE_ERROR';
const STATE_HAIRCHECK = 'STATE_HAIRCHECK';

export default function App() {
  const [appState, setAppState] = useState(STATE_IDLE);
  const [callObject, setCallObject] = useState(null);

  /**
   * We've created a room, so let's start the hair check. We won't be joining the call yet.
   */
  const startTest = useCallback(async () => {
    const search = new URLSearchParams(window.location.search);

    const url = search.get('room_url');
    const token = search.get('token');

    if (!(url && token)) {
      // eslint-disable-next-line no-alert
      alert('You need a room url and a token to play this game bucko!');
      return;
    }

    const newCallObject = DailyIframe.createCallObject();
    setCallObject(newCallObject);
    setAppState(STATE_HAIRCHECK);
    // TODO: uncomment to work
    await newCallObject.preAuth({ url, token });
    await newCallObject.startCamera();
    await newCallObject.join({ url, token });
  }, []);

  /**
   * Start leaving the current call.
   */
  const startLeavingCall = useCallback(() => {
    if (!callObject) return;
    // If we're in the error state, we've already "left", so just clean up
    if (appState === STATE_ERROR) {
      callObject.destroy().then(() => {
        // setRoomUrl(null);
        setCallObject(null);
        setAppState(STATE_IDLE);
      });
    } else {
      /* This will trigger a `left-meeting` event, which in turn will trigger
      the full clean-up as seen in handleNewMeetingState() below. */
      setAppState(STATE_LEAVING);
      callObject.leave();
    }
  }, [callObject, appState]);


  /**
   * Update app state based on reported meeting state changes.
   *
   * NOTE: Here we're showing how to completely clean up a call with destroy().
   * This isn't strictly necessary between join()s, but is good practice when
   * you know you'll be done with the call object for a while, and you're no
   * longer listening to its events.
   */
  useEffect(() => {
    if (!callObject) return;

    const events = ['joined-meeting', 'left-meeting', 'error', 'camera-error'];

    function handleNewMeetingState() {
      switch (callObject.meetingState()) {
        case 'joined-meeting':
          setAppState(STATE_JOINED);
          break;
        case 'left-meeting':
          callObject.destroy().then(() => {
            // setRoomUrl(null);
            setCallObject(null);
            setAppState(STATE_IDLE);
          });
          break;
        case 'error':
          setAppState(STATE_ERROR);
          break;
        default:
          break;
      }
    }

    // Use initial state
    handleNewMeetingState();

    /*
     * Listen for changes in state.
     * We can't use the useDailyEvent hook (https://docs.daily.co/reference/daily-react/use-daily-event) for this
     * because right now, we're not inside a <DailyProvider/> (https://docs.daily.co/reference/daily-react/daily-provider)
     * context yet. We can't access the call object via daily-react just yet, but we will later in Call.js and HairCheck.js!
     */
    events.forEach((event) => callObject.on(event, handleNewMeetingState));

    // Stop listening for changes in state
    return () => {
      events.forEach((event) => callObject.off(event, handleNewMeetingState));
    };
  }, [callObject]);

  /**
   * Show the call UI if we're either joining, already joined, or have encountered
   * an error that is _not_ a room API error.
   */
  const showCall = [STATE_JOINING, STATE_JOINED, STATE_ERROR].includes(appState);

  /* When there's no problems creating the room and startHairCheck() has been successfully called,
   * we can show the hair check UI. */
  const showHairCheck = appState === STATE_HAIRCHECK;

  const renderApp = () => {
    if (showHairCheck || showCall) {
      return (
        <DailyProvider callObject={callObject}>
          <>
            <UnmoderatedTest leaveCall={startLeavingCall} />
            <DailyAudio />
          </>
        </DailyProvider>
      );
    }

    // The default view is the HomeScreen, from where we start the demo.
    return <HomeScreen startTest={startTest} />;
  };

  return (
    <div className="app">
      {/* <Header /> */}
      {renderApp()}
    </div>
  );
}
