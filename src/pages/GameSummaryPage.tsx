import React from 'react';
import { useStateContext } from '../contexts/StateContext';
import Layout from '../components/Layout';

const GameSummaryPage: React.FC = () => {
  const { state, dispatch } = useStateContext();
  const { userAnswers, questions, rounds, score } = state;

  const percentage = Math.round((score / rounds) * 100);

  const emoji = (() => {
    if (percentage === 100) return '🥳';
    if (percentage >= 80) return '😄';
    if (percentage >= 60) return '😏';
    if (percentage >= 40) return '😐';
    if (percentage >= 20) return '😬';
    return '😞';
  })();

  return (
    <Layout className="sm:justify-center">
      <h1 className="text-3xl md:text-4xl font-bold self-center m-4">
        You got <span className="underline">{percentage}%</span> right! {emoji}
      </h1>
      <ul>
        {questions.map(({ question, correct_answer }, index: number) => (
          <li
            key={question}
            className={`my-4 p-4 border-2 rounded-md ${
              userAnswers[index] === correct_answer
                ? 'border-green-600'
                : 'border-red-700'
            }`}
          >
            <div className="flex justify-between text-gray-500">
              <span>Question #{index + 1}</span>{' '}
              <span>
                {userAnswers[index] === correct_answer
                  ? 'Correct 👌'
                  : 'Wrong answer 😞'}
              </span>
            </div>
            <h2 className="text-lg font-semibold text-center my-6">
              {question}
            </h2>
            <p>
              Correct answer:{' '}
              <span className="font-semibold underline text-green-600">
                {correct_answer}
              </span>
            </p>
            {userAnswers[index] !== correct_answer && (
              <p>
                Your answer:{' '}
                <span className="font-semibold text-red-700">
                  {userAnswers[index]}
                </span>
              </p>
            )}
          </li>
        ))}
      </ul>
      <button className="my-4" onClick={() => dispatch({ type: 'IDLE' })}>
        Go back home
      </button>
    </Layout>
  );
};

export default GameSummaryPage;