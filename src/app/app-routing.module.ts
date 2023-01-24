import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfigRoutingModule } from './config/config-routing.module';
import { QueueRoutingModule } from './queue/queue-routing.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'queue',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
    QueueRoutingModule,
    ConfigRoutingModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
