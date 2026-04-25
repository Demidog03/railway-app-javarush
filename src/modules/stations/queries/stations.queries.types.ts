export const STATIONS_QUERY_PREFIX = 'stations';

export const STATIONS_QUERY_KEYS = {
  getNearestStations: (lat: number, lng: number) => [STATIONS_QUERY_PREFIX, 'nearest', lat, lng],
} as const;

