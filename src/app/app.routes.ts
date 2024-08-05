import { Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { ServicesPageComponent } from './pages/services-page/services-page.component';
import { BlogPageComponent } from './pages/blog-page/blog-page.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { BlogDetailComponent } from './components/blog-detail/blog-detail.component';
import { BlogFormComponent } from './components/blog-form/blog-form.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './guards/auth.guard';
import { CookiesComponent } from './pages/cookies/cookies.component';

export const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'about-page', component: AboutPageComponent },
  { path: 'contact', component: ContactPageComponent },
  { path: 'services', component: ServicesPageComponent },
  { path: 'blog', component: BlogPageComponent },
  { path: 'blog/:category/:title', component: BlogDetailComponent },
  { path: 'admin', component: AdminPanelComponent, canActivate: [authGuard] },
  { path: 'admin/new', component: BlogFormComponent },
  { path: 'admin/edit/:link', component: BlogFormComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cookies', component: CookiesComponent }

];

