export interface reactions {
  [key: string]: number;
}

export default interface Log {
  id?: Number;
  idLog?: string;
  body: Array<any>;
  date: string;
  reactions: reactions;
}
