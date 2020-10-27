import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title, Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  constructor(
    private swUpdate: SwUpdate,
    private snackBar: MatSnackBar,
    private titleService: Title,
    private metaService: Meta,
    private router: Router
  ) {}

  generateTags({
    title = '',
    description = '',
    image = ''
   }): void {
    this.titleService.setTitle(title);
    this.metaService.addTags([
      { name: 'keywords', content: description },
      { name: 'description', content: description },
      { name: 'robots', content: 'index, follow' },
      { charset: 'UTF-8' },
      { httpEquiv: 'X-UA-Compatible', content: 'IE=edge' },
      { name: 'author', content: 'Julio César Melchor Pinto' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, shrink-to-fit=no'},
      { name: 'date', content: '2020-10-10', scheme: 'YYYY-MM-DD' },
      { name: 'application-name', content: title },
      { name: 'apple-mobile-web-app-status-bar', content: 'black-translucent' },
      { name: 'theme-color', content: 'black' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'mobile-web-app-capable', content: 'yes' },
      { name: 'msapplication-TileColor', content: '#000000' },
      { name: 'msapplication-TileImage', content: 'assets/icons/ms-icon-144x144.png' },
      // OpenGraph metatags
      { property: 'og:title', content: title},
      { property: 'og:type', content: 'profile' },
      { property: 'profile:first_name', content: 'Julio' },
      { property: 'profile:last_name', content: 'Melchor' },
      { property: 'profile:username', content: 'jcmelchorp' },
      { property: 'profile:gender', content: 'male' },
      { property: 'og:site_name', content: title },
      { property: 'og:url', content: 'https://fireclassroom.web.app' },
      { property: 'og:image:url', content: image },
      { property: 'og:image:secure_url', content: image, },
      { property: 'og:image:alt', content: 'Website view example' },
      { property: 'og:image:type', content: 'image/png' },
      { property: 'og:description', content: description },
      { property: 'twitter:card', content: 'summary_large_image' },
      { property: 'twitter:text:title', content: title },
      { property: 'twitter:image', content: image, },
    ]);
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(async () => {
        this.snackBar.open(
          'Se han hecho cambios desde la última visita. Actualiza la página para continuar'
        );
      });
    }
  }
}
