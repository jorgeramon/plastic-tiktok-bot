import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { id } from '../../../../app/persistance/config';
import { IQueueSong } from '../interfaces/queue-song.interface';
import { ISongRequest } from '../interfaces/song-request.interface';

@Injectable({
  providedIn: 'root',
})
export class QueueService {
  private readonly current$: BehaviorSubject<IQueueSong | null> =
    new BehaviorSubject<IQueueSong | null>(null);

  private readonly queue$: BehaviorSubject<IQueueSong[]> = new BehaviorSubject<
    IQueueSong[]
  >([]);

  loadSongs(songs: IQueueSong[]): void {
    this.queue$.next(songs);
  }

  async addSong(song: ISongRequest): Promise<void> {
    console.log('Adding or updating song', song);
    const [result, data] = await window.electron.addSong(song);
    const queue: IQueueSong[] = this.queue$.value;

    switch (result) {
      case 'added':
        this.queue$.next([...queue, data]);
        break;

      case 'updated':
        const current = queue.find((q) => q.id === data.id);
        current.song = data.song;
        this.queue$.next([...queue]);
        break;
    }
  }

  async removeSong(id: number): Promise<void> {
    const queue: IQueueSong[] = [...this.queue$.value];
    const index: number = queue.findIndex((q) => q.id === id);

    if (index !== -1) {
      await window.electron.removeSong(id);
      queue.splice(index, 1);
      this.queue$.next(queue);
    }
  }

  onQueueChange(): Observable<IQueueSong[]> {
    return this.queue$.asObservable();
  }
}
