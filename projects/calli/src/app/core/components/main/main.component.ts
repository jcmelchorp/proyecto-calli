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
      route_link: '/courses',
      imageUrl: 'assets/images/googleclassroom.png',
    },
    {
      title: 'Firebase',
      description: 'Check for what is backed in Firebase RealTime Database',
      route_link: '/costumers',
      imageUrl: 'assets/images/jarron.png',
    },
    {
      title: 'Cuestionarios',
      description:
        'Crea un cuestionario y aplicalo en alguna de tus clases.',
      route_link: '/admin',
      imageUrl: 'assets/images/dientes01.png',
    },
  ];
}
