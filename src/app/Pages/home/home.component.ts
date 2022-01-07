import {Component, OnDestroy, OnInit} from '@angular/core';
import {NoteService} from '../../Shared/Services/note.service';
import {Note} from '../../Shared/Models/Note';
import {SubSink} from 'subsink';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  notes: Note[];
  newNote: Note;
  addingNewNote = false;
  subSink = new SubSink();

  constructor(private noteService: NoteService) {
    this.reloadNotes();
  }

  ngOnInit(): void {
    this.initiateNewNote();
  }

  initiateNewNote(): void{
    this.newNote = {heading: '', description: '', id: '', lastUpdateDateTime: null, creationDateTime: null};
  }

  onAddNewNote(): void {
    this.addingNewNote = true;
  }

  onAddClicked($event: Note): void {
    this.subSink.sink = this.noteService.CreateNote($event).subscribe(res => {
      console.log(res);
      this.reloadNotes();
    });
    this.addingNewNote = false;
    this.initiateNewNote();
  }

  reloadNotes(): void {
    this.subSink.sink = this.noteService.getAllNotes().subscribe(res => {
      this.notes = res;
      console.log(this.notes);
    });
  }

  onCancelClicked(): void {
    this.addingNewNote = false;
    this.initiateNewNote();
  }

  onUpdateClicked($event: Note): void {
    this.noteService.UpdateNote($event).subscribe(res => {
      console.log(res);
      this.reloadNotes();
    });
  }

  ngOnDestroy(): void {
    this.subSink.unsubscribe();
  }

  onDeleteClicked($event: Note): void {
    this.noteService.DeleteNote($event).subscribe(res => {
      console.log(res);
      this.reloadNotes();
    });
  }
}
