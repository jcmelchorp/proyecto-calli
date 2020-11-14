import { QuizActions, QuizActionTypes } from './quiz.actions';
import { quizInitialState, QuizState } from './quiz.state';

export function quizReducer(
  state = quizInitialState,
  action: QuizActions
): QuizState {
  switch (action.type) {
    case QuizActionTypes.QUIZ_QUERY: {
      return Object.assign({}, state, {
        isLoading: true,
      });
    }

    case QuizActionTypes.QUIZ_LOADED: {
      return Object.assign({}, state, {
        quiz: action.payload.quiz,
        isLoading: false,
      });
    }

    case QuizActionTypes.QUIZ_ERROR: {
      return Object.assign({}, state, {
        isLoading: false,
        error: action.payload.error,
      });
    }

    default:
      return state;
  }
}
