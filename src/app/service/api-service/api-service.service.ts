import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap, timeout  } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LatestStruct } from '../../library/struct/latest-currency.struct';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseApi = 'https://api.exchangeratesapi.io/latest';
  private baseUsdApi = 'https://api.exchangeratesapi.io/latest?base=USD';
  private filterApi = 'https://api.exchangeratesapi.io/latest?symbols=';

  constructor(private http: HttpClient) { }

  /* Get All Currency List Base USD */
  getCurrencyLatest(): Observable<LatestStruct> {
    const httpOptions = {
      headers: new HttpHeaders({
      })
    };

    return this.http.get<LatestStruct>(this.baseUsdApi)
    .pipe(
        tap(response => this.handleSuccess(function() {

        })),
        catchError(this.handleError<LatestStruct>('getCurrencyLatest'))
    );
  }

  /* Get List Registered Currency on Apps */
  listRegisteredCurrency(slug): Observable<LatestStruct> {
    const httpOptions = {
      headers: new HttpHeaders({
      })
    };

    return this.http.get<LatestStruct>(this.filterApi+slug)
    .pipe(
        tap(response => this.handleSuccess(function() {

        })),
        catchError(this.handleError<LatestStruct>('listRegisteredCurrency'))
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
