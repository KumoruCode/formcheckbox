import { Component } from '@angular/core';
import { FormsComponent } from "./forms/forms.component";

@Component({
  selector: 'app-root',
  imports: [ FormsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'formArray';
}
