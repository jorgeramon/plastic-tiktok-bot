import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { tap, switchMap } from 'rxjs';
import { TooltipService } from '../core/services/tooltip.service';
import { ILiveConfig } from './live-config.interface';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
})
export class ConfigComponent implements OnInit {
  form: FormGroup;
  loading: string | null = null;

  constructor(
    private readonly fb: FormBuilder,
    private readonly tooltipService: TooltipService
  ) {
    this.form = this.fb.group(
      {
        username: [''],
      },
      {
        updateOn: 'blur',
      }
    );
  }

  get username(): FormControl {
    return this.form.get('username') as FormControl;
  }

  async ngOnInit(): Promise<void> {
    const live: ILiveConfig = await window.electron.getLiveConfiguration();
    this.username.setValue(live.username);

    this.username.valueChanges
      .pipe(
        tap(() => (this.loading = 'username')),
        switchMap((username: string) => window.electron.saveUsername(username)),
        tap(() => (this.loading = null))
      )
      .subscribe(() => {
        this.tooltipService.emitSuccessMessage('Nombre de usuario actualizado');
      });
  }

  isLoading(field: string): boolean {
    return this.loading === field;
  }
}
