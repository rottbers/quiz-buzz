import React from 'react';
import Layout from '../components/Layout';

const LoadingPage = () => (
  <Layout className="justify-center">
    <div className="text-9xl">
      <svg
        className="animate-spin-2 max-w-xs"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        height="1em"
        width="1em"
      >
        <circle
          className="animate-spin-funky origin-center stroke-current text-green-300"
          style={{
            fill: 'transparent',
            strokeWidth: '10px',
            strokeDasharray: 283,
            strokeDashoffset: 280,
            strokeLinecap: 'round',
          }}
          cx="50"
          cy="50"
          r="45"
        />
      </svg>
    </div>
  </Layout>
);

export default LoadingPage;
