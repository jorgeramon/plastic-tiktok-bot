import { ILiveConfig } from '../app/config/live-config.interface';
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
}

type ElectronAPI = ConfigBridge & TiktokBridge & TiktokEventBridge;

declare global {
  interface Window {
    electron: ElectronAPI;
  }
}
