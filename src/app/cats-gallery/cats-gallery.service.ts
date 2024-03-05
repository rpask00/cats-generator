import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, timeout} from "rxjs";
import {map} from "rxjs/operators";


@Injectable()
export class CatsGalleryService {
  readonly CAT_IMAGE_URL = "https://cataas.com/cat";
  readonly BACKUP_IMAGE_URL = "https://media.istockphoto.com/id/1361394182/photo/funny-british-shorthair-cat-portrait-looking-shocked-or-surprised.jpg?s=612x612&w=0&k=20&c=6yvVxdufrNvkmc50nCLCd8OFGhoJd6vPTNotl90L-vo=";

  constructor(
    private _http: HttpClient
  ) {
  }

  getFunFacts$(count: number): Observable<string>[] {
    return Array.from({length: count}, () => this.funFact$)
  }

  get funFact$(): Observable<string> {
    return this._http.get<{ data: string[] }>('https://meowfacts.herokuapp.com/')
      .pipe(
        map(({data}) => data[0]),
      )
  }

  get catImage$(): Observable<string> {
    return this._http.get(
      this.CAT_IMAGE_URL, {
        responseType: 'arraybuffer',
      })
      .pipe(
        timeout(100),
        catchError(() => {
          return this._http.get(this.BACKUP_IMAGE_URL, {
            responseType: 'arraybuffer',
          })
        }),
        map((arrayBuffer: ArrayBuffer) => {
            const base64 = btoa(
              new Uint8Array(arrayBuffer)
                .reduce((data, byte) => data + String.fromCharCode(byte), '')
            );
            return `data:image/gif;base64,${base64}`
          }
        ),
      )
  }
}
