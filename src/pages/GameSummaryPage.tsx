import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { MdCheck, MdClose } from 'react-icons/md';
import { useAppDispatch, useAppState } from '../contexts/StateContext';
import Layout from '../components/Layout';

export default function GameSummaryPage() {
  const shouldReduceMotion = useReducedMotion();
  const { userAnswers, questions, rounds, score } = useAppState();
  const dispatch = useAppDispatch();

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
      <h1 className="text-4xl md:text-5xl font-black self-center mt-4 mb-2">
        Summary
      </h1>
      <p className="text-xl text-gray-400 mb-6">
        You got <span className="underline">{percentage}%</span> right {emoji}
      </p>
      <ul className="w-full">
        {questions.map(({ question, correct_answer }, index) => (
          <motion.li
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -50 * index }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { delay: shouldReduceMotion ? 0 : 0.15 * index },
            }}
            key={question}
            className={`my-4 p-4 border-2 rounded-md ${
              userAnswers[index] === correct_answer
                ? 'border-green-400'
                : 'border-gray-400'
            }`}
          >
            <h2 className="flex justify-between items-center text-gray-400">
              Question {index + 1}
              <span className="text-xl">
                {userAnswers[index] === correct_answer ? (
                  <MdCheck aria-label="correct" />
                ) : (
                  <MdClose aria-label="wrong" />
                )}
              </span>
            </h2>
            <p className="text-lg font-semibold text-center break-words my-6">
              {question}
            </p>
            {userAnswers[index] !== correct_answer && (
              <p>
                Your answer:{' '}
                <span className="font-semibold text-red-600">
                  {userAnswers[index]}
                </span>
              </p>
            )}
            <p>
              Correct answer:{' '}
              <span className="font-semibold underline text-green-400">
                {correct_answer}
              </span>
            </p>
          </motion.li>
        ))}
      </ul>
      <button
        className="my-6 button rounded-full hover:text-gray-900 focus:text-gray-900 hover:bg-gray-100 focus:bg-gray-100"
        onClick={() => dispatch({ type: 'IDLE' })}
      >
        Go back home
      </button>
    </Layout>
  );
}
