import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable()
export class MessagesService {
  errors$: Observable<string[]>
  private subject: BehaviorSubject<string[]> = new BehaviorSubject([]);
  
  constructor() {
    this.errors$ = this.subject.asObservable()
      .pipe(
        filter(messages => messages && messages.length > 0)
      );
  }

  showErrors(...errors: string[]): void{
    this.subject.next(errors);
  }
}
