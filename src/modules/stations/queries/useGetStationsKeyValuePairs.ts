import { useQuery } from '@tanstack/react-query';
import stationsApi from '../api/stations.api';
import { STATIONS_QUERY_KEYS } from './stations.queries.types';

export default function useGetStationsKeyValuePairs(lat: number, lng: number) {
  return useQuery({
    queryKey: STATIONS_QUERY_KEYS.getNearestStations(lat, lng),
    queryFn: () => stationsApi.getNearestStations(lat, lng),
    enabled: Boolean(lat) && Boolean(lng),
  });
}

