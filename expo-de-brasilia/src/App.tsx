import React, { useState } from 'react';
// import BrasiliaTransitions from './components/BrasiliaTransitions';
import MainMenu from './components/MainMenu';
import './App.css';

const App: React.FC = () => {
  // Transição de vídeo comentada - vai direto para o menu
  const [showMenu, setShowMenu] = useState(true);

  // const handleTransitionClick = () => {
  //   setShowMenu(true);
  // };

  const handleInactivity = () => {
    // Mantém no menu ao invés de voltar para transição
    // setShowMenu(false);
  };

  return (
    <>
      {/* Transição de vídeo comentada para não aparecer mais */}
      {/* {showMenu ? ( */}
        <MainMenu onInactivity={handleInactivity} />
      {/* ) : (
        <div onClick={handleTransitionClick} style={{ cursor: 'pointer' }}>
          <BrasiliaTransitions />
        </div>
      )} */}
    </>
  );
};

export default App;