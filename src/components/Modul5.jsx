import React, { useState } from 'react';
// PERBAIKAN: Menambahkan FlaskConical di sini
import { Beaker, Zap, ChevronRight, Check, FlaskConical } from 'lucide-react';

export default function Modul5({ onNext }) {
  const [selectedCompound, setSelectedCompound] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [testedCompounds, setTestedCompounds] = useState([]);

  // Data Senyawa Lengkap
  const compounds = [
    { id: 1, name: 'Garam (NaCl)', type: 'kuat', brightness: 'Sangat Terang', bubbles: 'Banyak', desc: 'Ion Na⁺ & Cl⁻ terurai sempurna', color: 'bg-blue-500' },
    { id: 2, name: 'Cuka (CH₃COOH)', type: 'lemah', brightness: 'Redup', bubbles: 'Sedikit', desc: 'Hanya sebagian terurai jadi ion', color: 'bg-yellow-500' },
    { id: 3, name: 'Gula (C₁₂H₂₂O₁₁)', type: 'none', brightness: 'Mati', bubbles: 'Tidak Ada', desc: 'Tetap berbentuk molekul', color: 'bg-red-500' },
    { id: 4, name: 'Asam Klorida (HCl)', type: 'kuat', brightness: 'Sangat Terang', bubbles: 'Banyak', desc: 'Asam kuat, ionisasi sempurna', color: 'bg-green-500' },
    { id: 5, name: 'Alkohol 70%', type: 'none', brightness: 'Mati', bubbles: 'Tidak Ada', desc: 'Senyawa kovalen non-polar', color: 'bg-purple-500' }
  ];

  const handleTest = (compound) => {
    setSelectedCompound(compound);
    setIsSimulating(true);
    setShowResult(false);
    
    // Simulasi berjalan 2.5 detik
    setTimeout(() => {
      setIsSimulating(false);
      setShowResult(true);
      if (!testedCompounds.includes(compound.id)) {
        setTestedCompounds([...testedCompounds, compound.id]);
      }
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-black text-slate-800 mb-2">Laboratorium Virtual</h1>
        <p className="text-slate-600 mb-8">Uji daya hantar listrik berbagai larutan di bawah ini.</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* PANEL KIRI: DAFTAR LARUTAN */}
          <div className="bg-white p-6 rounded-3xl shadow-xl h-fit">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-slate-700">
              <Beaker className="w-5 h-5"/> Pilih Larutan
            </h2>
            <div className="space-y-3">
              {compounds.map(c => (
                <button 
                  key={c.id} 
                  onClick={() => handleTest(c)}
                  disabled={isSimulating}
                  className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-200 group relative overflow-hidden ${
                    selectedCompound?.id === c.id 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-slate-100 hover:border-blue-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="relative z-10 flex justify-between items-center">
                    <div>
                      <span className="font-bold text-slate-800 block">{c.name}</span>
                      <span className="text-xs text-slate-400">Klik untuk uji</span>
                    </div>
                    {testedCompounds.includes(c.id) && <div className="bg-green-100 p-1 rounded-full"><Check className="w-4 h-4 text-green-600"/></div>}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* PANEL TENGAH: ALAT UJI (ANIMASI) */}
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-xl overflow-hidden relative border border-slate-200 flex flex-col">
            <div className="flex-1 p-8 flex flex-col items-center justify-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-100 via-slate-200 to-slate-300 relative min-h-[500px]">
              
              {selectedCompound ? (
                <>
                  {/* LAMPU */}
                  <div className="relative z-20 mb-8">
                    {/* Kabel */}
                    <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[120px] h-[100px] border-x-4 border-slate-800"></div>
                    
                    {/* Bohlam */}
                    <div className={`relative w-28 h-28 rounded-full border-4 border-slate-300 flex items-center justify-center transition-all duration-1000 ${
                       showResult && selectedCompound.type !== 'none'
                         ? (selectedCompound.type === 'kuat' 
                            ? 'bg-yellow-400 shadow-[0_0_100px_rgba(250,204,21,0.8)] border-yellow-500' 
                            : 'bg-yellow-200/80 shadow-[0_0_40px_rgba(250,204,21,0.4)] border-yellow-200')
                         : 'bg-slate-300'
                    }`}>
                      <Zap className={`w-12 h-12 ${showResult && selectedCompound.type !== 'none' ? 'text-white' : 'text-slate-400'}`} />
                    </div>
                  </div>

                  {/* GELAS KIMIA (BEAKER) */}
                  <div className="relative w-64 h-72">
                    {/* Elektroda Batang Karbon */}
                    <div className="absolute top-0 left-16 w-4 h-64 bg-slate-700 rounded-b-lg z-10"></div>
                    <div className="absolute top-0 right-16 w-4 h-64 bg-slate-700 rounded-b-lg z-10"></div>

                    {/* Wadah Gelas */}
                    <div className="absolute inset-0 border-x-4 border-b-8 border-slate-300/50 bg-blue-100/30 rounded-b-[3rem] backdrop-blur-sm overflow-hidden">
                       
                       {/* Cairan Larutan */}
                       <div className="absolute bottom-0 w-full h-3/4 bg-blue-400/20 transition-all duration-1000"></div>

                       {/* Animasi Gelembung (Hanya jika hasil muncul & bukan non-elektrolit) */}
                       {showResult && selectedCompound.bubbles !== 'Tidak Ada' && (
                         <div className="absolute inset-0">
                            {/* Gelembung Kiri */}
                            <div className="absolute bottom-10 left-16 w-3 h-3 bg-white/70 rounded-full animate-[ping_1s_infinite]"></div>
                            <div className="absolute bottom-20 left-14 w-2 h-2 bg-white/70 rounded-full animate-bounce"></div>
                            
                            {/* Gelembung Kanan (Jika Kuat) */}
                            {selectedCompound.type === 'kuat' && (
                               <>
                                <div className="absolute bottom-12 right-16 w-4 h-4 bg-white/70 rounded-full animate-[ping_0.8s_infinite]"></div>
                                <div className="absolute bottom-24 right-18 w-2 h-2 bg-white/70 rounded-full animate-bounce"></div>
                                <div className="absolute bottom-32 right-15 w-3 h-3 bg-white/70 rounded-full animate-pulse"></div>
                               </>
                            )}
                         </div>
                       )}
                    </div>
                    
                    {/* Label Gelas */}
                    <div className="absolute bottom-8 w-full text-center">
                      <span className="bg-white/80 px-4 py-1 rounded-full text-sm font-bold text-slate-700 shadow-sm border border-slate-200">
                        {selectedCompound.name}
                      </span>
                    </div>
                  </div>

                  {/* STATUS TEXT */}
                  <div className="mt-8 text-center h-20">
                    {isSimulating ? (
                      <span className="inline-flex items-center gap-2 px-6 py-2 bg-blue-100 text-blue-700 rounded-full animate-pulse font-bold">
                        <div className="w-4 h-4 border-2 border-blue-700 border-t-transparent rounded-full animate-spin"></div>
                        Sedang Menguji...
                      </span>
                    ) : showResult && (
                      <div className="flex gap-4 justify-center">
                        <div className="bg-slate-800 text-white px-6 py-3 rounded-xl shadow-lg">
                           <p className="text-xs text-slate-400 uppercase tracking-wider">Nyala Lampu</p>
                           <p className="font-bold text-lg">{selectedCompound.brightness}</p>
                        </div>
                        <div className="bg-slate-800 text-white px-6 py-3 rounded-xl shadow-lg">
                           <p className="text-xs text-slate-400 uppercase tracking-wider">Gelembung</p>
                           <p className="font-bold text-lg">{selectedCompound.bubbles}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="text-center text-slate-400">
                  <FlaskConical className="w-24 h-24 mx-auto mb-4 opacity-20"/>
                  <p>Pilih larutan di panel kiri untuk memulai simulasi</p>
                </div>
              )}
            </div>
            
            {/* FOOTER: TOMBOL LANJUT */}
            {testedCompounds.length >= 3 && (
              <div className="bg-slate-50 p-4 border-t border-slate-200 flex justify-end">
                 <button 
                  onClick={onNext}
                  className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-blue-500/30 hover:bg-blue-700 hover:scale-105 transition flex items-center gap-2"
                >
                  Lanjut ke Klasifikasi <ChevronRight/>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}