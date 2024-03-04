import {Component, ElementRef, OnInit} from '@angular/core';
import {CatsGalleryService} from "./cats-gallery.service";
import {CatElementComponent} from "./cat-element/cat-element.component";
import {debounceTime, filter, forkJoin, fromEvent, map, Observable, scan, startWith, switchMap} from "rxjs";
import {HttpClientModule} from "@angular/common/http";
import {AsyncPipe, NgClass} from "@angular/common";
import {MatCard} from "@angular/material/card";
import {MatProgressSpinner} from "@angular/material/progress-spinner";


@Component({
  selector: 'app-cats-gallery',
  standalone: true,
  imports: [
    CatElementComponent,
    HttpClientModule,
    AsyncPipe,
    NgClass,
    MatCard,
    MatProgressSpinner
  ],
  templateUrl: './cats-gallery.component.html',
  styleUrl: './cats-gallery.component.scss',
  providers: [CatsGalleryService],
})
export class CatsGalleryComponent implements OnInit {

  readonly scrollAtTheBottom$ = fromEvent<MouseEvent>(this.elementRef.nativeElement.ownerDocument, 'scroll').pipe(
    debounceTime(100),
    filter((event) => !!event.view && (event.view.scrollY >= event.view.scrollMaxY - 1000)))


  readonly funFactsStream$ = this.scrollAtTheBottom$.pipe(
    map(() => this._catsGalleryService.getFunFacts$(3)),
    startWith(this._catsGalleryService.getFunFacts$(9)),
    switchMap((funFacts: Observable<string>[]) => forkJoin(funFacts)),
    scan((acc: string[], newFunFacts: string[]) => {
      return acc.concat(newFunFacts.filter((newCat) => !acc.includes(newCat)))
    }, []),
  )

  constructor(
    private elementRef: ElementRef,
    private _catsGalleryService: CatsGalleryService
  ) {
  }


  ngOnInit(): void {
  }
}
