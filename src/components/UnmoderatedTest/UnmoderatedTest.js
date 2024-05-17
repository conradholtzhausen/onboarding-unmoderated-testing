import React, { useState } from 'react';
import { useScreenShare } from '@daily-co/daily-react';
import VideoFeeds from './VideoFeeds';
import SystemCheck from './SystemCheck';
import './UnmoderatedTest.css';

export default function UnmoderatedTest({ leaveCall }) {
  const { startScreenShare, stopScreenShare, isSharingScreen } = useScreenShare();
  const [screenShareTrack, setScreenShareTrack] = useState(null);
  const [isSharingWindow, setIsSharingWindow] = useState(false);
  const [isDisplaySurfaceSupported, setIsDisplaySurfaceSupported] = useState(false);

  const handleStopScreenShare = () => {
    // stop previously shared screen first
    stopScreenShare();
    screenShareTrack?.stop();
  };

  const handleScreenShare = async () => {
    const options = {
      video: true,
    };

    let captureStream = null;

    if (isSharingScreen) {
      handleStopScreenShare();
    }

    try {
      captureStream = await navigator.mediaDevices.getDisplayMedia(options);
    } catch (err) {
      console.error(`Failed to get display media: ${err}`);
    }

    if (captureStream) {
      setTimeout(() => {
        startScreenShare({ mediaStream: captureStream });
        const track = captureStream?.getTracks()?.[0];
        const settings = track?.getSettings();

        setScreenShareTrack(track);
        setIsDisplaySurfaceSupported(!!settings?.displaySurface);
        setIsSharingWindow(settings?.displaySurface === 'window');
      }, 500);
    }
  };

  const startTest = (e) => {
    e.preventDefault();
    const url = sessionStorage.getItem('testingUrl');
    if (url) {
      window.open(url, '_blank');
    } else {
      alert('There is no url');
    }
  };

  return (
    <>
      {isSharingScreen && !isSharingWindow && isDisplaySurfaceSupported && (
        <div className="error-message">
          Please share a window instead of what you are sharing right now
        </div>
      )}

      {isSharingScreen && !isSharingWindow && !isDisplaySurfaceSupported && (
        <div className="error-message">
          I have no idea what you shared so please make sure it was your active window
        </div>
      )}
      <div className="panel">
        <h1>Before you get started</h1>
        <p>
          This task requests recordings for us to better understand your feedback. Please make sure
          you have the tech set up before moving forward.
        </p>
        <SystemCheck onShareScreen={handleScreenShare} />
      </div>
      <div className="panel">
        <VideoFeeds />
      </div>
      <div className="footer">
        <button
          onClick={() => {
            handleStopScreenShare();
            leaveCall();
          }}
          type="button"
          className="secondary">
          Stop test
        </button>
        <button
          disabled={!(isSharingScreen && (isSharingWindow || !isDisplaySurfaceSupported))}
          data-disabled-tooltip-text="You need to share a window before you can start the test"
          onClick={startTest}
          type="button"
          className="start-button">
          Next
        </button>
      </div>
    </>
  );
}
