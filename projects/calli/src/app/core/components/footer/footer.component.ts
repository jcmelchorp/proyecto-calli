import { getIsLoggedIn } from './../../../auth/store/auth.selectors';
import { Component, OnInit, Input } from '@angular/core';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'calli-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  @Input() deviceXs: boolean;
  @Input() isLoggedIn: boolean;
  heart = faHeart;
  facebook = faFacebook;
  constructor() { }

  ngOnInit(): void { }
}
