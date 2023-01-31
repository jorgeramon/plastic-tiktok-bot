import { ILiveConfig } from '../app/config/live-config.interface';
import { IQueueSong } from '../app/core/interfaces/queue-song.interface';
import { ISongRequest } from '../app/core/interfaces/song-request.interface';
import { ITiktokChat } from '../app/core/interfaces/tiktok-chat.interface';

type EventCallback<T> = (data: T) => any;

interface ConfigBridge {
  saveUsername: (username: string) => Promise<void>;
  getLiveConfiguration: () => Promise<ILiveConfig>;
}

interface TiktokBridge {
  connect: () => Promise<void>;
  disconnect: () => void;
}

interface TiktokEventBridge {
  onChat: (callback: EventCallback<ITiktokChat>) => void;
  onCommand: (callback: EventCallback<ITiktokChat>) => void;
}

interface QueueBridge {
  addSong: (data: ISongRequest) => Promise<[string, IQueueSong]>;
  removeSong: (id: number) => Promise<void>;
  getQueueSongs: () => Promise<IQueueSong[]>;
}

type ElectronAPI = ConfigBridge &
  TiktokBridge &
  TiktokEventBridge &
  QueueBridge;

declare global {
  interface Window {
    electron: ElectronAPI;
  }
}
