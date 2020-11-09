export class Questionary {
  id?: string;
  title?: string;
  isActive?: boolean;
  priority?: number;
  photoUrl?: string;
  description?: string;
  areaTag?: string[];
  public questions?: Question[];

}

export class Question {
  id?: string;
  questionText?: string;
  photoUrl?: string;
  correctIndex?: number;
  priority?: number;
  answers?: Answer[];
}

export interface Answer {
  answerText?: string;
  photoUrl?: string;
}
