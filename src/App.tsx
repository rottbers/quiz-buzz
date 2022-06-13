import React from 'react';
import { useAppState } from './contexts/StateContext';
import LoadingPage from './pages/LoadingPage';
import ErrorPage from './pages/ErrorPage';
import GamePage from './pages/GamePage';
import GameSummaryPage from './pages/GameSummaryPage';
import StartPage from './pages/StartPage';

export default function App() {
  const { status } = useAppState();

  switch (status) {
    case 'loading':
      return <LoadingPage />;
    case 'error':
      return <ErrorPage />;
    case 'playing':
      return <GamePage />;
    case 'gameover':
      return <GameSummaryPage />;
    case 'idle':
      return <StartPage />;
  }
}
