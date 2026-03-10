import { Routes } from '@angular/router';
import { Login } from './login/login';

export const routes: Routes = [
	{ path: 'login', component: Login },
	// Default route (root) will render App component's template; keep empty path
	{ path: '', pathMatch: 'full' }
];
