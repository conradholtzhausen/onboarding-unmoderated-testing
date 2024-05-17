import React, { useCallback, useState } from 'react';
import { useDevices, useDailyEvent } from '@daily-co/daily-react';
import UserMediaError from '../UserMediaError/UserMediaError';

import './SystemCheck.css';
import ListItem from '../ui/ListItem';

export default function SystemCheck({ onShareScreen }) {
  const { currentCam, currentMic, microphones, cameras, setMicrophone, setCamera } = useDevices();
  const [getUserMediaError, setGetUserMediaError] = useState(false);

  useDailyEvent(
    'camera-error',
    useCallback(() => {
      setGetUserMediaError(true);
    }, []),
  );

  const updateMicrophone = (e) => {
    setMicrophone(e.target.value);
  };

  const updateCamera = (e) => {
    setCamera(e.target.value);
  };

  return getUserMediaError ? (
    <UserMediaError />
  ) : (
    <form>
      <hr />
      <ListItem
        icon="☀︎"
        title="Screen sharing"
        description="Share only this window and be careful to no disclosure personal info."
        actions={
          <button className="screen-share-button" type="button" onClick={onShareScreen}>
            Share screen
          </button>
        }
      />
      <hr />
      <ListItem
        icon="✌︎"
        title="Microphone"
        description="Speak out loud to test"
        actions={
          <select
            name="micOptions"
            id="micSelect"
            className="system-check-list-select"
            onChange={updateMicrophone}
            value={currentMic?.device?.deviceId}>
            {microphones.map((mic) => (
              <option key={`mic-${mic.device.deviceId}`} value={mic.device.deviceId}>
                {mic.device.label}
              </option>
            ))}
          </select>
        }
      />
      <hr />
      <ListItem
        icon="☃︎"
        title="Camera"
        actions={
          <select
            name="cameraOptions"
            id="cameraSelect"
            className="system-check-list-select"
            onChange={updateCamera}
            value={currentCam?.device?.deviceId}>
            {cameras.map((camera) => (
              <option key={`cam-${camera.device.deviceId}`} value={camera.device.deviceId}>
                {camera.device.label}
              </option>
            ))}
          </select>
        }
      />
    </form>
  );
}
