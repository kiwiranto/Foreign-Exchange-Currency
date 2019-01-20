import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap, timeout  } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ResponseStruct } from '../library/struct/response.struct';
import { LatestStruct } from './../library/struct/latest-currency.struct';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  private apiLatest = 'https://api.exchangeratesapi.io/latest';

  constructor(private http: HttpClient) { }

  getCurrencyLatest(): Observable<LatestStruct> {
    const httpOptions = {
      headers: new HttpHeaders({
      })
    };

    return this.http.get<LatestStruct>(this.apiLatest)
    .pipe(
        tap(response => this.handleSuccess(function() {
          console.log('Sukses!!')
        })),
        catchError(this.handleError<LatestStruct>('getCurrencyLatest'))
    );
  }


  /* HANDLE SUCCESS */
  private handleSuccess(whatsHappen) {
    whatsHappen();
  }

  /* HANDLE ERROR */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      window.scroll(0, 0); //lempar ke atas

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /* LOG */
  log(data){
    return console.log(data);
  }

}
