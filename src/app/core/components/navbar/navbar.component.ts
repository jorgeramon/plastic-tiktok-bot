import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ILiveConfig } from '../../../config/live-config.interface';
import { LiveService } from '../../services/live.service';
import { TooltipService } from '../../services/tooltip.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  status: boolean;

  constructor(
    private readonly router: Router,
    private readonly liveService: LiveService,
    private readonly tooltipService: TooltipService
  ) {}

  ngOnInit(): void {
    this.liveService.onLive().subscribe((status: boolean) => {
      this.status = status;
    });
  }

  async startLive(): Promise<void> {
    const live: ILiveConfig = await window.electron.getLiveConfiguration();

    if (!live.username) {
      this.tooltipService.emitErrorMessage(
        'Debe configurarse un nombre de usuario antes de conectarse a un LIVE'
      );
      this.router.navigate(['config']);
      return;
    }

    this.liveService.startLive();
  }

  stopLive(): void {
    this.liveService.stopLive();
  }
}
