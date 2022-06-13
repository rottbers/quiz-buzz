import React from 'react';
import { useAppDispatch } from '../contexts/StateContext';
import Layout from '../components/Layout';

export default function ErrorPage() {
  const dispatch = useAppDispatch();

  return (
    <Layout className="justify-center">
      <h1 className="text-4xl md:text-5xl font-black mb-4">Ohoh! Error...</h1>
      <p className="text-center mb-6 text-gray-400">
        Something went wrong fetching quiz questions from{' '}
        <a
          className="underline focus:text-green-400 hover:text-green-400"
          href="https://opentdb.com/"
        >
          Open Trivia DB
        </a>{' '}
        <span role="img" aria-label="pensive face">
          😔
        </span>
      </p>

      <button
        className="self-center button rounded-full hover:text-gray-900 focus:text-gray-900 hover:bg-gray-100 focus:bg-gray-100"
        onClick={() => dispatch({ type: 'IDLE' })}
      >
        Go back home
      </button>
    </Layout>
  );
}
