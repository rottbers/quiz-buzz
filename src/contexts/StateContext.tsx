import React, { createContext, useContext, useReducer } from 'react';
import type { Difficulty, Type, Settings, Question } from '../types';

type State = {
  status: 'idle' | 'loading' | 'playing' | 'gameover' | 'error';
  questions: Question[];
  difficulty: Difficulty;
  type: Type;
  rounds: number;
  round: number;
  score: number;
  userAnswers: string[];
};

type Action =
  | { type: 'IDLE' | 'LOADING' | 'ERROR' | 'NEXT_ROUND' }
  | { type: 'PLAY'; data: { questions: Question[] } }
  | { type: 'UPDATE_SETTINGS'; data: Partial<Settings> }
  | { type: 'SUBMIT_ANSWER'; data: { answer: string } };

function reducer(state: State, action: Action): State {
  switch (state.status) {
    case 'idle': {
      switch (action.type) {
        case 'UPDATE_SETTINGS': {
          return { ...state, ...action.data };
        }
        case 'LOADING':
          return { ...state, status: 'loading' };
        default:
          return state;
      }
    }
    case 'loading': {
      switch (action.type) {
        case 'PLAY': {
          const { questions } = action.data;
          return {
            ...state,
            questions,
            round: 0,
            score: 0,
            userAnswers: [],
            status: 'playing',
          };
        }
        case 'ERROR':
          return { ...state, status: 'error' };
        default:
          return state;
      }
    }
    case 'playing': {
      switch (action.type) {
        case 'SUBMIT_ANSWER': {
          const { answer } = action.data;
          const correctAnswer = state.questions[state.round].correct_answer;
          const userAnswers = [...state.userAnswers, answer];
          const score = answer === correctAnswer ? state.score + 1 : state.score; // prettier-ignore
          return { ...state, score, userAnswers };
        }
        case 'NEXT_ROUND': {
          const { round, rounds } = state;
          return round < rounds - 1
            ? { ...state, round: round + 1 }
            : { ...state, status: 'gameover' };
        }
        default:
          return state;
      }
    }
    case 'gameover': {
      switch (action.type) {
        case 'IDLE':
          return { ...state, status: 'idle' };
        default:
          return state;
      }
    }
    case 'error': {
      switch (action.type) {
        case 'IDLE':
          return { ...state, status: 'idle' };
        default:
          return state;
      }
    }
  }
}

const initialState: State = {
  status: 'idle',
  questions: [],
  difficulty: 'medium',
  type: 'multiple',
  rounds: 4,
  round: 0,
  score: 0,
  userAnswers: [],
};

const AppStateContext = createContext<State>(initialState);
const AppDispatchContext = createContext<React.Dispatch<Action>>(() => null);

export const StateProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
};

export const useAppState = () => useContext(AppStateContext);
export const useAppDispatch = () => useContext(AppDispatchContext);
