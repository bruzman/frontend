import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { AppRootComponent } from './app/app-root/app-root.component';

bootstrapApplication(AppRootComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
  ],
}).catch((err) => console.error(err));
