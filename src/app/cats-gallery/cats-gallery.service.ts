import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, combineLatest, forkJoin, map, Observable, of, switchMap, withLatestFrom, zip} from "rxjs";
import * as _ from 'lodash';

export interface Cat {
  image: string;
  funFact: string;
  width: number;
}

@Injectable()
export class CatsGalleryService {

  readonly loadedCats$: BehaviorSubject<Observable<Cat>[]> = new BehaviorSubject<Observable<Cat>[]>([]);

  constructor(
    private _http: HttpClient
  ) {
  }

  public loadCats() {
    const count = 3;

    const catWidths = [];

    for (let i = 1; i < count ; i++) {
      const sum = _.sum(catWidths);
      catWidths.push(_.random(3, 12 - sum - (count - i) * 3));
    }

    catWidths.push(12 - _.sum(catWidths));

    console.log(catWidths)

    this.loadedCats$.next([
      ...this.loadedCats$.value,
      ...catWidths.map(width => this.loadCat$(width))
    ])

  }

  get funFact$(): Observable<string> {

    return this._http.get<{ data: string[] }>('https://meowfacts.herokuapp.com/')
      .pipe(
        map(({data}) => data[0])
      )

    // return forkJoin(
    //   [
    //     this._http.get<{ data: string[] }>('https://meowfacts.herokuapp.com/'),
    //     forkJoin(this.loadedCats$.value)
    //   ]
    // ).pipe(
    //   switchMap(([{data}, cats]) => {
    //     if (cats.some(cat => cat.funFact === data[0])) {
    //       return this.funFact$
    //     }
    //
    //     return of(data[0])
    //   })
    // )
  }

  get catImage$(): Observable<string> {
    return this._http.get('https://cataas.com/cat', {
      responseType: 'arraybuffer'
    })
      .pipe(map((arrayBuffer: ArrayBuffer) => {
        const base64 = btoa(
          new Uint8Array(arrayBuffer)
            .reduce((data, byte) => data + String.fromCharCode(byte), '')
        );

        return `data:image/gif;base64,${base64}`
      }))

  }

  loadCat$(width: number): Observable<Cat> {
    return forkJoin({
      funFact: this.funFact$,
      image: this.catImage$,
      width: of(width)
    })
  }
}
