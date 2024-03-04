import {Component, ElementRef, OnInit} from '@angular/core';
import {CatsGalleryService} from "./cats-gallery.service";
import {CatElementComponent} from "./cat-element/cat-element.component";
import {
  combineLatest,
  debounceTime,
  filter,
  first,
  fromEvent,
  map,
  Observable,
  scan,
  startWith,
  switchMap,
  takeUntil
} from "rxjs";
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
    map(() => this._catsGalleryService.getFunFacts$(3)),
    switchMap((funFacts: Observable<string>[]) => combineLatest(funFacts)),
    scan((acc: string[], newFunFacts: string[]) => {
      return acc.concat(newFunFacts.filter((newCat) => !acc.includes(newCat)).slice(0, 3))
    }, []),
  )

  readonly streamCompleted$ = this._funFactsStream$.pipe(
    filter((funFacts) => funFacts.length >= 20),
    first()
  )


  readonly funFactsStream$ = this._funFactsStream$.pipe(
    takeUntil(this.streamCompleted$)
  )


  constructor(
    private elementRef: ElementRef,
    private _catsGalleryService: CatsGalleryService
  ) {
  }

  ngOnInit(): void {
  }
}
