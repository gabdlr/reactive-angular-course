import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { concatMap, finalize, tap } from 'rxjs/operators';

@Injectable()
export class LoadingService {

  loading$: Observable<boolean>;
  private loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject(false); 
  
  constructor() {
    this.loading$ = this.loadingSubject.asObservable();
  }

  showLoaderUntillCompleted<T>(obs$: Observable<T>): Observable<T>{
    
    return of(null).
      pipe(
        tap( () => this.loadingOn()),
        concatMap(() => obs$),
        finalize(()=> this.loadingOff())
      )
  }

  loadingOn(){
    this.loadingSubject.next(true);
  }

  loadingOff(){
    this.loadingSubject.next(false);
  }
}
