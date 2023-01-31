import { ISongRequest } from './song-request.interface';

export interface IQueueSong extends ISongRequest {
  id: number;
  selected: boolean;
}
