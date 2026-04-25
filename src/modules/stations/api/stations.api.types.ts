export interface Station {
  code: string;
  title: string;
}

export interface GetNearestStationsResponse {
  stations: Station[];
}

