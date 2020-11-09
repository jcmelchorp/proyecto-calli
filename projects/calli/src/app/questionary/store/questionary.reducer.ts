import { QuestionariesActions, QuestionariesActionTypes } from './questionary.actions';
import { questionaryInitialState, QuestionaryState } from './questionary.state';

export function questionariesReducer(state = questionaryInitialState, action: QuestionariesActions): QuestionaryState {
  switch (action.type) {

    case QuestionariesActionTypes.QUESTIONARIES_QUERY: {
      return Object.assign({}, state, {
        isLoading: true,
      });
    }

    case QuestionariesActionTypes.QUESTIONARIES_LOADED: {
      return Object.assign({}, state, {
        questionaries: action.payload.questionarys,
        isLoading: false,
      });
    }

    case QuestionariesActionTypes.QUESTIONARIES_ERROR: {
      return Object.assign({}, state, {
        isLoading: false,
        error: action.payload.error
      });
    }

    default:
      return state;
  }
}
