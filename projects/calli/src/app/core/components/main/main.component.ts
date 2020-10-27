import { Component } from '@angular/core';

@Component({
  selector: 'calli-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  cardItems: any[] = [
    {
      title: 'Courses',
      description:
        'Explore your courses, check status, students, classworks and grades.',
      route_link: '/information/covid-risk',
      imageUrl: 'assets/images/googleclassroom.png',
    },
    {
      title: 'Firebase',
      description: 'Check for what is backed in Firebase RealTime Database',
      route_link: '/courses',
      imageUrl: 'assets/images/FirebaseRTD.png',
    },
    {
      title: 'Infografías',
      description:
        'Descarga anuncios e imagenes tipo poster para informar a tu comunidad',
      route_link: '/information/covid-risk',
      imageUrl: 'assets/images/FireClassroom.png',
    },
  ];
}
