import React, { useState } from 'react';

// PASTIKAN SEMUA INI DI-IMPORT
import Modul1 from './components/Modul1';
import Modul2 from './components/Modul2';
import Modul3 from './components/Modul3';
import Modul4 from './components/Modul4';
import Modul5 from './components/Modul5';
import Modul6 from './components/Modul6';
import Modul7 from './components/Modul7';
import Modul8 from './components/Modul8';

function App() {
  const [currentModule, setCurrentModule] = useState(1);

  const nextModule = () => {
    setCurrentModule((prev) => prev + 1);
    window.scrollTo(0, 0);
  };

  return (
    <div className="w-full min-h-screen bg-slate-50">
      {currentModule === 1 && <Modul1 onNext={nextModule} />}
      {currentModule === 2 && <Modul2 onNext={nextModule} />}
      {currentModule === 3 && <Modul3 onNext={nextModule} />}
      {currentModule === 4 && <Modul4 onNext={nextModule} />}
      {currentModule === 5 && <Modul5 onNext={nextModule} />}
      {currentModule === 6 && <Modul6 onNext={nextModule} />}
      {currentModule === 7 && <Modul7 onNext={nextModule} />}
      
      {/* Modul 8 tidak butuh onNext karena dia halaman terakhir */}
      {currentModule === 8 && <Modul8 />}
    </div>
  );
}

export default App;