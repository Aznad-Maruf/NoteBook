import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Note} from '../Models/Note';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {v4 as uuid} from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(
    private http: HttpClient
  ) { }

  getAllNotes(): Observable<Note[]>{
    return this.http.get(environment.NoteUrl + 'GetList')
      .pipe(
        map((response: any) => {
      return response as Note[];
    }));
  }

  getNoteById(id: string): Observable<Note>{
    return this.http.get(environment.NoteUrl + 'Get', {params: {Id: id}})
      .pipe(
        map((response: any) => response as Note)
      );
  }

  CreateNote(note: Note): Observable<any>{
    note.id = uuid();
    return this.http.post(environment.NoteUrl + 'Create', note)
      .pipe(
        map((response: any) => response)
      );
  }

  UpdateNote(note: Note): Observable<any>{
    return this.http.post(environment.NoteUrl + 'Update', note)
      .pipe(
        map((response: any) => response)
      );
  }

  DeleteNote(note: Note): Observable<any>{
    return this.http.post(environment.NoteUrl + 'Delete', note)
      .pipe(
        map((response: any) => response)
      );
  }

}
