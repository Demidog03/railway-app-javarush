export interface TrainCarrier {
  title: string;
}

export interface TrainThread {
  uid: string;
  number: string;
  title: string;
  carrier: TrainCarrier;
}

export interface TrainStationRef {
  code?: string;
  title: string;
}

export interface TrainScheduleSegment {
  thread: TrainThread;
  from: TrainStationRef;
  to: TrainStationRef;
  departure: string;
  arrival: string;
  start_date?: string;
  days?: string;
  duration: number;
}

export interface GetTrainsBetweenStationsResponse {
  segments: TrainScheduleSegment[];
}

