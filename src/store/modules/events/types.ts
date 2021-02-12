export interface IEventDetails {
  title: string;
  date: Date;
  time: Date;
  description: string;
}

export interface IEventsState {
  events: IEventDetails[];
}
