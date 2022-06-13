import React from 'react';
import { capitalizeString } from '../utils';

type Props = {
  name: string;
  options: string[];
  selectedOption: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const RadioGroup = ({ name, options, selectedOption, onChange }: Props) => (
  <div className="w-full flex flex-row justify-between rounded-md border-2 border-white focus-within:ring">
    {options.map((option) => {
      const optionId = `${name}-${option}`;

      return (
        <label
          key={optionId}
          htmlFor={optionId}
          className={`py-2 px-6 w-full border-white text-center select-none border-r-2 last:border-r-0 ${
            selectedOption === option
              ? 'text-gray-900 bg-white'
              : 'hover:cursor-pointer hover:text-gray-900 hover:bg-white'
          } `}
        >
          <input
            type="radio"
            name={name}
            id={optionId}
            value={option}
            checked={selectedOption === option}
            onChange={onChange}
            className="absolute h-0 w-0 opacity-0"
          />
          {capitalizeString(option)}
        </label>
      );
    })}
  </div>
);

export default RadioGroup;
