import React, { useState } from 'react';
import BrasiliaTransitions from './components/BrasiliaTransitions';
import MainMenu from './components/MainMenu';
import './App.css';

const App: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);

  const handleTransitionClick = () => {
    setShowMenu(true);
  };

  const handleInactivity = () => {
    setShowMenu(false);
  };

  return (
    <>
      {showMenu ? (
        <MainMenu onInactivity={handleInactivity} />
      ) : (
        <div onClick={handleTransitionClick} style={{ cursor: 'pointer' }}>
          <BrasiliaTransitions />
        </div>
      )}
    </>
  );
};

export default App;