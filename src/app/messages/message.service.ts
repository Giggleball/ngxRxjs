import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {filter} from 'rxjs/operators';

@Injectable()
export class MessagesService {
  /**
   * The subject has the ability of emitting new values
   * @private
   */
  private subject = new BehaviorSubject<string[]>([]);

  /**
   * Emit a new value whenever we call showErrors
   */
  errors$: Observable<string[]> = this.subject.asObservable().pipe(
    filter(messages => messages && messages.length > 0)
  );

  showErrors(...errors: string[]) {
    this.subject.next(errors);
  }
}
