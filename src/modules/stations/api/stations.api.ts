import apiPublic from '../../../shared/api/api-public';
import type { GetNearestStationsResponse } from './stations.api.types';

async function getNearestStations(lat: number, lng: number): Promise<GetNearestStationsResponse> {
  const response = await apiPublic.get<GetNearestStationsResponse>('/nearest_stations/', {
    params: {
      lat,
      lng,
      distance: 50,
      transport_types: 'train',
      limit: 50
    },
  });
  return response.data;
}

const stationsApi = { getNearestStations };

export default stationsApi;

