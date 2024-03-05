import {Component, ElementRef, OnInit} from '@angular/core';
import {CatsGalleryService} from "./cats-gallery.service";
import {CatElementComponent} from "./cat-element/cat-element.component";
import {combineLatest, debounceTime, filter, fromEvent, last, scan, startWith, switchMap, takeWhile} from "rxjs";
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

  private readonly _scrollAtTheBottom$ = fromEvent<MouseEvent>(this.elementRef.nativeElement.ownerDocument, 'scroll').pipe(
    filter((event) => !!event.view && (event.view.innerHeight - this.elementRef.nativeElement.getBoundingClientRect().bottom) > 300),
    startWith(null),
  )

  private readonly _funFactsStream$ = this._scrollAtTheBottom$.pipe(
    debounceTime(100),
    switchMap(() => combineLatest(this._catsGalleryService.getFunFacts$(3))),
    scan((acc: string[], newFunFacts: string[]) => {
      return acc.concat(newFunFacts.filter((newCat) => !acc.includes(newCat)).slice(0, 3))
    }, []),
  )

  readonly funFactsStream$ = this._funFactsStream$.pipe(
    takeWhile((funFacts, index) => funFacts.length < 90 || index === 0, true),
  )

  readonly streamCompleted$ = this.funFactsStream$.pipe(
    last(),
  );

  constructor(
    private elementRef: ElementRef,
    private _catsGalleryService: CatsGalleryService
  ) {
  }

  ngOnInit(): void {
  }
}
