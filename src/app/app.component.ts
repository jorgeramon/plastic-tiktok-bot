import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ISongRequest } from './core/interfaces/song-request.interface';
import { ITiktokChat } from './core/interfaces/tiktok-chat.interface';
import { LiveService } from './core/services/live.service';
import { QueueService } from './core/services/queue.service';
import { TooltipService } from './core/services/tooltip.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private readonly translate: TranslateService,
    private readonly liveService: LiveService,
    private readonly tooltipService: TooltipService,
    private readonly queueService: QueueService
  ) {
    this.translate.setDefaultLang('en');
  }

  async ngOnInit(): Promise<void> {
    this.liveService
      .onLive()
      .subscribe((status: boolean) =>
        status ? this.connect() : this.disconnect()
      );

    window.electron.onCommand((data: ITiktokChat) =>
      this.onCommandHandler(data)
    );

    try {
      const songs = await window.electron.getQueueSongs();
      this.queueService.loadSongs(songs);
      console.info('Queue loaded successfully');
    } catch (e) {
      console.error('Unexpected error', e);
    }
  }

  private async connect(): Promise<void> {
    try {
      await window.electron.connect();

      this.tooltipService.emitSuccessMessage('Conectado al LIVE');
    } catch (e) {
      switch (e) {
        case 'NO_USERNAME_CONFIGURED':
          this.tooltipService.emitErrorMessage(
            'No hay un nombre de usuario configurado.'
          );
          break;

        case 'UNABLE_TO_CONNECT':
          this.tooltipService.emitErrorMessage(
            'No hay ningún LIVE en este momento.'
          );
          break;

        default:
          this.tooltipService.emitErrorMessage(
            'Ocurrió un error desconocido al conectarse.'
          );
      }

      this.liveService.stopLive();
    }
  }

  private async disconnect(): Promise<void> {
    window.electron.disconnect();
    this.tooltipService.emitSuccessMessage('Desconectado del LIVE');
  }

  private onCommandHandler(data: ITiktokChat): void {
    console.log('Command detected', data);
    // TODO: Let user change command prefix
    if (data.comment.startsWith('!sr')) {
      const parts: string[] = data.comment.split('!sr');
      this.queueService.addSong({
        song: parts[1].trim(),
        username: data.uniqueId,
        nickname: data.nickname,
      });
    }
  }
}
