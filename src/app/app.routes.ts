import { Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { ServicesPageComponent } from './pages/services-page/services-page.component';
import { BlogPageComponent } from './pages/blog-page/blog-page.component';

export const routes: Routes = [
    { path: '', component: MainPageComponent, pathMatch: 'full' },
    { path: 'about-page', component: AboutPageComponent },
    { path: 'contact', component: ContactPageComponent },
    { path: 'services', component: ServicesPageComponent },
    { path: 'blog', component: BlogPageComponent }
];
