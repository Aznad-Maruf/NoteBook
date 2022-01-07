import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Note} from '../../../../Shared/Models/Note';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent implements OnInit {

  @Input() note: Note;
  @Input() isEditing = false;
  @Output() OnAddClicked: EventEmitter<Note> = new EventEmitter();
  @Output() OnUpdateClicked: EventEmitter<Note> = new EventEmitter();
  @Output() OnCancelClicked: EventEmitter<any> = new EventEmitter();
  @Output() OnDeleteClicked: EventEmitter<Note> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  onEditClick(): void {
    this.isEditing = true;
    console.log(this.isEditing);
  }

  onUpdateClick(): void {
    this.OnUpdateClicked.emit(this.note);
    console.log('update', this.note);
    this.isEditing = false;
  }

  onAddClick(): void {
    this.OnAddClicked.emit(this.note);
    console.log('add', this.note);
  }

  onCancelClick(): void {
    this.OnCancelClicked.emit();
    this.isEditing = false;
  }

  onDeleteClick(): void {
    this.OnDeleteClicked.emit(this.note);
  }
}
