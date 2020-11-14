export class Quiz {
  id?: number;
  priority?: number;
  dbId?: string;
  fsId?: string;
  title?: string;
  isActive?: boolean;
  description?: string;
  areaTag?: SubjectTags[];
  questions?: Question[];

}

export class Question {
  questionId?: number;
  questionText?: string;
  correctIndex?: number;
  questionMediaUrl?: string;
  isActive?: boolean;
  priority?: number;
  answers?: Answer[];
  label?: 'purple' | 'blue' | 'green' | 'yellow' | 'red' | 'gray';

}
export class Answer {
  id: number;
  answerText?: string;

}

export interface SubjectTags {
  name: 'Matemáticas' | 'Física' | 'Química';
}
