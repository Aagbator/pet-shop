import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './containers/log-in/log-in.component';
import { PetListComponent } from './containers/pet-list/pet-list.component';
import { CreatePetComponent } from './containers/create-pet/create-pet.component';
import { AuthGuard } from './core/guards/auth.guard';


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  { path: 'login', component: LogInComponent },
  { path: 'create', component: CreatePetComponent, canActivate: [AuthGuard]  },
  { path: 'pet-list', component: PetListComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
