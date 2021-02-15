export interface IEventDetails {
  title: string;
  date: Date;
  time: string;
  description: string;
}

export interface IEventsState {
  events: IEventDetails[];
}
