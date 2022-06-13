export type Difficulty = 'easy' | 'medium' | 'hard';

export type Type = 'boolean' | 'multiple';

export type RawQuestion = {
  category: string;
  type: Type;
  difficulty: Difficulty;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

export type Question = RawQuestion & {
  all_answers: string[];
};

export type Settings = {
  difficulty: Difficulty;
  type: Type;
  rounds: number;
};
