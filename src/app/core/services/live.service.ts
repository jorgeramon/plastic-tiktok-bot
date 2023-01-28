import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LiveService {
  private readonly live$: Subject<boolean> = new Subject<boolean>();

  startLive(): void {
    this.live$.next(true);
  }

  stopLive(): void {
    this.live$.next(false);
  }

  onLive(): Observable<boolean> {
    return this.live$.asObservable();
  }
}
