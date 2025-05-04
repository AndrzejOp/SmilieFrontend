import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { TabsComponent } from './jokes/tabs/tabs.component';
import { AuthGuard } from './auth/auth.guard';
import { JokePreviewComponent } from './jokes/joke-preview/joke-preview.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'app', component: TabsComponent, canActivate: [AuthGuard] },
  { path: 'preview', component: JokePreviewComponent }
];
