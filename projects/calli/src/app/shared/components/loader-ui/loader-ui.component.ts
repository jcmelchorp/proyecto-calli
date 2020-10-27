import { Component, Input } from '@angular/core';

@Component({
  selector: 'calli-loader-ui',
  templateUrl: './loader-ui.component.html',
  styleUrls: ['./loader-ui.component.scss']
})
export class LoaderUiComponent {
  @Input() isLoading$;
  constructor() { }
}
