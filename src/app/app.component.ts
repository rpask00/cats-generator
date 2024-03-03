import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CatsGalleryComponent} from "./cats-gallery/cats-gallery.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CatsGalleryComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'cats-gallery';
}
