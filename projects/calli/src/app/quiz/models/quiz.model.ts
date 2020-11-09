export class Quiz {
  id?: string;
  title?: string;
  isActive?: boolean;
  description?: string;
  priority?: number;
  areaTag?: SubjectTags[];
  questions?: Question[];
}

export class Question {
  question?: string;
  correctIndex?: number;
  questionMediaUrl?: string;
  isActive?: boolean;
  priority?: number;
  answers?: Answer[];
  label?: 'purple' | 'blue' | 'green' | 'yellow' | 'red' | 'gray';

}

export interface Answer {
  id: number;
  answerText?: string;
}

export interface SubjectTags {
  name: 'Matemáticas' | 'Física' | 'Química';
}
