import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { loginGuard } from './core/guards/login-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'signup', component: Register },
  { 
    path: 'campaigns', 
    loadChildren: () => import('./features/campaigns/campaigns.routes').then(m => m.campaignRoutes),
    canActivate: [loginGuard]
  },
  { path: 'dashboard', redirectTo: 'campaigns', pathMatch: 'full' }
];
