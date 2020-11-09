import { Questionary } from '../models/questionary.model';


export interface QuestionaryState {
  questionaries: Questionary[] | null;
  isLoading: boolean;
  error: any;
}

export const questionaryInitialState: QuestionaryState = {
  questionaries: null,
  isLoading: true,
  error: null

};
