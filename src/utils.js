export function roomUrlFromPageUrl() {
  const match = window.location.search.match(/room_url=([^&]+)/i);
  return match && match[1] ? decodeURIComponent(match[1]) : null;
}

export function pageUrlFromRoomUrl(roomUrl) {
  return (
    window.location.href.split('?')[0] + (roomUrl ? `?room_url=${encodeURIComponent(roomUrl)}` : '')
  );
}
