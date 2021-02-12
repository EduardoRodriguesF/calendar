import { IEventDetails } from './types';

export function createEvent(data: IEventDetails) {
  return {
    type: 'CREATE_EVENT',
    payload: {
      data,
    },
  };
}
