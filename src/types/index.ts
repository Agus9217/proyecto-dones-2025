
export interface Data {
  status?:    string | undefined;
  questions?: Question[] | undefined;
}

export interface Question {
  _id:       string;
  title:     string;
  items:     Item[] | undefined;
  createdAt: Date;
  updatedAt: Date;
}

export interface Item {
  number: number;
  text:   string;
  score:  number[] | null;
}


export interface LeaderData {
  status?:    string | undefined;
  questions?: Question[] | undefined;
}

export interface Question {
  _id:       string;
  title:     string;
  items:     Item[] | undefined;
  createdAt: Date;
  updatedAt: Date;
}

export interface Item {
  letter: string
  text:   string;
  score:  number[] | null;
}
