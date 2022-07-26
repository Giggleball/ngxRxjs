import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {concatMap, finalize, tap} from 'rxjs/operators';

@Injectable()
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$: Observable<boolean> = this.loadingSubject.asObservable();

  showLoaderUntilComplete<T>(obs$: Observable<T>): Observable<T> {
    // crate a default observable to create an observable chain
    return of(null)
      .pipe(
        // when initial value is received we turn on the loading state
        tap(() => this.loadingOn()),
        // switch to outputting the emitted value by the input observable
        concatMap(() => obs$),
        // when input observable stops emitting any value and completes we finalize the observable chain and  turn off the loading state
        finalize(() => this.loadingOff())
      );
  }

  loadingOn() {
    this.loadingSubject.next(true);
  }

  loadingOff() {
    this.loadingSubject.next(false);
  }
}
