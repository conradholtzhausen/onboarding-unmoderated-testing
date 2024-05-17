import './VideoFeeds.css';

import {
  useDailyEvent,
  useLocalSessionId,
  useParticipantIds,
  useScreenShare,
} from '@daily-co/daily-react';
import { useCallback, useState } from 'react';
import Tile from '../Tile/Tile';
import UserMediaError from '../UserMediaError/UserMediaError';

export default function VideoFeeds() {
  /* If a participant runs into a getUserMedia() error, we need to warn them. */
  const [getUserMediaError, setGetUserMediaError] = useState(false);

  /* We can use the useDailyEvent() hook to listen for daily-js events. Here's a full list
   * of all events: https://docs.daily.co/reference/daily-js/events */
  useDailyEvent(
    'camera-error',
    useCallback(() => {
      setGetUserMediaError(true);
    }, []),
  );

  /* This is for displaying remote participants: this includes other humans, but also screen shares. */
  const { screens } = useScreenShare();
  const remoteParticipantIds = useParticipantIds({ filter: 'remote' });

  /* This is for displaying our self-view. */
  const localSessionId = useLocalSessionId();
  const isAlone = remoteParticipantIds.length < 1 || screens.length < 1;

  const renderCallScreen = () => (
    <div className={screens.length > 0 ? 'is-screenshare' : 'call'}>
      {/* Your self view */}
      {localSessionId && <Tile id={localSessionId} isLocal isAlone={isAlone} />}

      {screens.length > 0 && (
        <>
          {screens.map((screen) => (
            <Tile key={screen.screenId} id={screen.session_id} isScreenShare />
          ))}
        </>
      )}
    </div>
  );

  return getUserMediaError ? <UserMediaError /> : renderCallScreen();
}
