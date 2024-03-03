import {Component, Input} from '@angular/core';
import {Cat} from "../cats-gallery.service";
import {MatCardModule} from '@angular/material/card';
import {NgOptimizedImage} from "@angular/common";
@Component({
  selector: 'app-cat-element',
  standalone: true,
  imports: [MatCardModule, NgOptimizedImage],
  templateUrl: './cat-element.component.html',
  styleUrl: './cat-element.component.scss'
})
export class CatElementComponent {
  @Input() cat?: Cat;
}
