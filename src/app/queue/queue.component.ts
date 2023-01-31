import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { IQueueSong } from '../core/interfaces/queue-song.interface';
import { QueueService } from '../core/services/queue.service';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
})
export class QueueComponent {
  queue$: Observable<IQueueSong[]>;

  constructor(private readonly queueService: QueueService) {
    this.queue$ = this.queueService.onQueueChange();
  }
}
