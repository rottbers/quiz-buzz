import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { MdCheck, MdClose } from 'react-icons/md';
import { useAppDispatch, useAppState } from '../contexts/StateContext';
import Layout from '../components/Layout';

export default function GamePage() {
  const shouldReduceMotion = useReducedMotion();
  const { round, rounds, score, questions, userAnswers } = useAppState();
  const dispatch = useAppDispatch();

  const { question, all_answers, correct_answer } = questions[round];
  const userAnswer = userAnswers[round];

  const showAnswer = !!userAnswer;

  function handleButtonHighlight(answer: string) {
    if (answer === correct_answer) {
      return answer === userAnswer
        ? 'bg-green-400 border-green-400 text-gray-900'
        : 'border-green-400';
    }
    if (answer === userAnswer) return 'bg-red-600 border-red-600';
    return 'border-gray-400 text-gray-400';
  }

  const isLastRound = round === rounds - 1;

  return (
    <Layout className="sm:justify-center">
      <header className="font-mono text-gray-400 flex justify-between mb-2 w-full">
        <p>
          Question {round + 1} / {rounds}
        </p>
        <p>Score {score}</p>
      </header>
      <h1 className="self-center text-center text-xl font-semibold break-words max-w-full md:text-2xl my-4 mx-2 md:m-6">
        {question}
      </h1>
      <div className="flex flex-wrap justify-center my-2 md:my-4">
        {all_answers.map((answer: string, index) => (
          <motion.button
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -50 * index }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { delay: shouldReduceMotion ? 0 : 0.05 * index },
            }}
            key={answer}
            value={answer}
            disabled={showAnswer}
            onClick={() =>
              dispatch({ type: 'SUBMIT_ANSWER', data: { answer } })
            }
            className={`button m-2 w-full relative ${
              showAnswer
                ? handleButtonHighlight(answer)
                : 'hover:text-gray-900 focus:text-gray-900 hover:bg-gray-100 focus:bg-gray-100'
            }`}
          >
            {answer}{' '}
            {showAnswer &&
              (answer === userAnswer || answer === correct_answer) && (
                <span className="absolute right-1 bg-white text-gray-900 p-1 rounded-full opacity-80">
                  {answer === correct_answer ? (
                    <MdCheck aria-label="correct" />
                  ) : (
                    <MdClose aria-label="wrong" />
                  )}
                </span>
              )}
          </motion.button>
        ))}
      </div>
      <div
        className={`self-center text-center ${showAnswer ? '' : 'invisible'}`}
      >
        <button
          className="mt-6 button rounded-full hover:text-gray-900 focus:text-gray-900 hover:bg-gray-100 focus:bg-gray-100"
          disabled={!showAnswer}
          onClick={() => dispatch({ type: 'NEXT_ROUND' })}
        >
          {isLastRound ? 'See summary' : 'Next question'}
        </button>
      </div>
    </Layout>
  );
}
