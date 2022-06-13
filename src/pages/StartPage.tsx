import React from 'react';
import { DiReact as ReactLogo } from 'react-icons/di';
import { useStateContext } from '../contexts/StateContext';

import Layout from '../components/Layout';
import RadioGroup from '../components/RadioGroup';

import { getQuestions } from '../utilities';
import { Type, Difficulty } from '../types';

export default function StartPage() {
  const { type, difficulty, rounds, status } = useAppState();
  const dispatch = useAppDispatch();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch({ type: 'LOADING' });

    try {
      const questions = await getQuestions({ difficulty, type, rounds });
      dispatch({ type: 'PLAY', data: { questions } });
    } catch {
      dispatch({ type: 'ERROR' });
    }
  }

  const typeOptions: Type[] = ['boolean', 'multiple'];
  const difficultyOptions: Difficulty[] = ['easy', 'medium', 'hard'];

  return (
    <Layout className="justify-center">
      <h1 className="text-6xl mb-2 md:text-7xl font-black italic">
        Quiz <span className="text-green-400">buzz</span>
      </h1>
      <p className="text-gray-400">
        A quiz game built with{' '}
        <a
          className="underline focus:text-green-400 hover:text-green-400"
          href="https://reactjs.org/"
        >
          react
        </a>{' '}
        <ReactLogo
          aria-hidden="true"
          className="inline-block align-middle h-8 w-8 motion-safe:animate-spin-4"
        />
      </p>
      <form
        className="flex flex-col items-center w-full max-w-md"
        onSubmit={onSubmit}
      >
        <label htmlFor="type" className="font-semibold mt-6 mb-2">
          Type of answers:
        </label>
        <RadioGroup
          name="type"
          options={typeOptions}
          selectedOption={type}
          onChange={(e) =>
            dispatch({
              type: 'UPDATE_SETTINGS',
              data: { [e.target.name]: e.target.value }, // TODO: look into typing e.target.value
            })
          }
        />

        <label htmlFor="difficulty" className="font-semibold mt-6 mb-2">
          Difficulty of questions:
        </label>
        <RadioGroup
          name="difficulty"
          options={difficultyOptions}
          selectedOption={difficulty}
          onChange={(e) =>
            dispatch({
              type: 'UPDATE_SETTINGS',
              data: { [e.target.name]: e.target.value }, // TODO: look into typing e.target.value
            })
          }
        />

        <label htmlFor="rounds" className="font-semibold mt-6 mb-2">
          Number ( <span className="font-bold underline">{rounds}</span> ) of
          questions:
        </label>
        <input
          className="slider"
          id="rounds"
          name="rounds"
          type="range"
          value={rounds}
          step={1}
          min={1}
          max={50}
          onChange={(e) =>
            dispatch({
              type: 'UPDATE_SETTINGS',
              data: { rounds: e.target.valueAsNumber },
            })
          }
        />

        <button
          className="mt-12 button rounded-full border-green-400 bg-green-400 text-gray-900"
          type="submit"
          disabled={status === 'loading'}
        >
          Play
        </button>
      </form>
    </Layout>
  );
}
