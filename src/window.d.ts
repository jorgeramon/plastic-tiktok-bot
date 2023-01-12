interface TikAPIPopup {
  client_id: string;
  scope?: string[];
}

interface TikAPI {
  popup(data: TikAPIPopup): void;
  onLogin(callback: (data: any) => void): void;
}

interface Window {
  electronAPI: any;
  TikAPI: TikAPI;
}
