import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TooltipService } from '../../services/tooltip.service';
import { Toast } from 'bootstrap';
import { ITooltipMessage } from '../../interfaces/tooltip-message.interface';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
})
export class TooltipComponent implements OnInit {
  @ViewChild('toast')
  toast: ElementRef;

  message: string;
  private type: 'success' | 'error';

  constructor(private readonly tooltipService: TooltipService) {}

  ngOnInit(): void {
    this.tooltipService
      .onMessage()
      .subscribe((tooltipMessage: ITooltipMessage) => {
        this.message = tooltipMessage.message;
        this.type = tooltipMessage.type;

        setTimeout(() => {
          const toast = new Toast(this.toast.nativeElement);
          toast.show();
        });
      });
  }

  isType(type: string): boolean {
    return this.type === type;
  }
}
