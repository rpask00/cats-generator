import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {CatsGalleryService} from "../cats-gallery.service";
import {MatCardModule} from '@angular/material/card';
import {AsyncPipe} from "@angular/common";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-cat-element',
  standalone: true,
  imports: [MatCardModule, AsyncPipe, MatProgressSpinner],
  templateUrl: './cat-element.component.html',
  styleUrl: './cat-element.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatElementComponent {
  readonly catImage$ = this._catGalleryService.catImage$;

  constructor(private _catGalleryService: CatsGalleryService) {
  }

  @Input() index: number = 0;
  @Input() funFact: string = "---";
}
