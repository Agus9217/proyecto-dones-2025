export interface DataInterface {
  user: Data | undefined;
}

export interface Data {
  name?:      string;
  lastName?:  string;
  email?:     string[];
  questions?: Question[];
  leaderQuestions?: Question[];
}

export interface Question {
  _id:       string;
  title:     string;
  items:     Item[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Item {
  number: number | string;
  text:   string;
  score:  number[];
}
