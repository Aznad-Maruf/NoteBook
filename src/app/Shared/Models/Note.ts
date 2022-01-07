export interface Note{
  id: string;
  heading: string;
  description: string;
  creationDateTime: Date;
  lastUpdateDateTime: Date;
}
export interface NoteCreationModel{
  heading: string;
  description: string;
}
