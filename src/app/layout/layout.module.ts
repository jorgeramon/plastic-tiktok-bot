import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AsideComponent } from './components/aside/aside.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  imports: [RouterModule],
  declarations: [NavbarComponent, AsideComponent],
  exports: [NavbarComponent, AsideComponent],
})
export class LayoutModule {}
