import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ITooltipMessage } from '../interfaces/tooltip-message.interface';

@Injectable({
  providedIn: 'root',
})
export class TooltipService {
  private readonly message$: Subject<ITooltipMessage> =
    new Subject<ITooltipMessage>();

  emitSuccessMessage(message: string): void {
    this.message$.next({ message, type: 'success' });
  }

  emitErrorMessage(message: string): void {
    this.message$.next({ message, type: 'error' });
  }

  onMessage(): Observable<ITooltipMessage> {
    return this.message$.asObservable();
  }
}
