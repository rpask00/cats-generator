import {Component, ElementRef, HostListener, OnInit} from '@angular/core';
import {CatsGalleryService} from "./cats-gallery.service";
import {CatElementComponent} from "./cat-element/cat-element.component";
import {debounceTime, filter, fromEvent, scan} from "rxjs";
import {HttpClientModule} from "@angular/common/http";
import {AsyncPipe, NgClass} from "@angular/common";


@Component({
  selector: 'app-cats-gallery',
  standalone: true,
  imports: [
    CatElementComponent,
    HttpClientModule,
    AsyncPipe,
    NgClass
  ],
  templateUrl: './cats-gallery.component.html',
  styleUrl: './cats-gallery.component.scss',
  providers: [CatsGalleryService],
})
export class CatsGalleryComponent implements OnInit {

  readonly loadedCats$ = this._catsGalleryService.loadedCats$;

  stream$ = fromEvent<MouseEvent>(this.elementRef.nativeElement.ownerDocument, 'scroll').pipe(
    debounceTime(100),
    filter((event) => !!event.view && (event.view.scrollY >= event.view.scrollMaxY - 100)),
    scan((acc, event) => acc + 1, 0),
  )

  constructor(
    private elementRef: ElementRef,
    private _catsGalleryService: CatsGalleryService
  ) {
  }


  ngOnInit(): void {
    this._catsGalleryService.loadCats();
    this._catsGalleryService.loadCats();
    this._catsGalleryService.loadCats();
    this._catsGalleryService.loadCats();
    this._catsGalleryService.loadCats();
    this._catsGalleryService.loadCats();

  }


  private isScrollAtBottom(e: Event) {
    return true
  }

  @HostListener('window:scroll') scrolling(event: MouseEvent) {
    console.log(event)
  }


}
