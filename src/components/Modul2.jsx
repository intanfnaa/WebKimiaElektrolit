import React, { useState } from 'react';
import { ChevronRight, CheckCircle, Zap, Droplets, Ban, Activity, MousePointerClick, Info } from 'lucide-react';

export default function Modul2({ onNext }) {
  const [clickedNodes, setClickedNodes] = useState([]);
  const [flippedNodes, setFlippedNodes] = useState([]);
  const [showContinue, setShowContinue] = useState(false);

  // KOORDINAT NODES (Tetap Menggunakan Pixel Pasti untuk Akurasi Garis)
  // X = Horizontal (Total lebar area ~900px)
  // Y = Vertikal (Total tinggi area ~600px)
  const nodes = [
    { 
      id: 'larutan', title: 'LARUTAN', desc: 'Campuran homogen zat terlarut & pelarut.', 
      icon: Droplets, color: 'blue', 
      x: 450, y: 50 // Tengah Atas
    },
    { 
      id: 'elektrolit', title: 'ELEKTROLIT', desc: 'Menghantarkan listrik (Ada Ion).', 
      icon: Zap, color: 'indigo', 
      x: 250, y: 250 // Kiri Tengah
    },
    { 
      id: 'non', title: 'NON-ELEKTROLIT', desc: 'Tidak menghantar listrik (Molekul).', 
      icon: Ban, color: 'slate', 
      x: 650, y: 250 // Kanan Tengah
    },
    { 
      id: 'kuat', title: 'ELEKTROLIT KUAT', desc: 'Terionisasi Sempurna. Nyala Terang.', 
      icon: Activity, color: 'green', 
      x: 150, y: 450 // Kiri Bawah
    },
    { 
      id: 'lemah', title: 'ELEKTROLIT LEMAH', desc: 'Terionisasi Sebagian. Nyala Redup.', 
      icon: Activity, color: 'yellow', 
      x: 350, y: 450 // Kiri-Tengah Bawah
    }
  ];

  const handleCardClick = (id) => {
    if (flippedNodes.includes(id)) {
      setFlippedNodes(flippedNodes.filter(nodeId => nodeId !== id));
    } else {
      setFlippedNodes([...flippedNodes, id]);
    }

    if (!clickedNodes.includes(id)) {
      const newClicked = [...clickedNodes, id];
      setClickedNodes(newClicked);
      if (newClicked.length >= 4) setShowContinue(true);
    }
  };

  // Komponen Kartu (Card)
  const NodeCard = ({ data }) => {
    const isFlipped = flippedNodes.includes(data.id);
    const isVisited = clickedNodes.includes(data.id);
    // Shadow kita buat lebih soft agar menyatu dengan background utama
    const borderColor = isVisited ? `border-${data.color}-500 shadow-${data.color}-200` : 'border-slate-200 shadow-slate-200';

    return (
      <div 
        className="absolute w-44 h-32 -translate-x-1/2 -translate-y-1/2 cursor-pointer perspective-1000 z-20"
        style={{ left: data.x, top: data.y }}
        onClick={() => handleCardClick(data.id)}
      >
        <div className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
          
          {/* DEPAN */}
          <div className="absolute inset-0 backface-hidden">
            <div className={`w-full h-full bg-white rounded-2xl border-2 ${borderColor} shadow-xl flex flex-col items-center justify-center p-4 transition-all hover:scale-105 hover:shadow-2xl group`}>
              <div className={`p-2.5 rounded-full mb-2 bg-${data.color}-50 group-hover:bg-${data.color}-100 transition-colors`}>
                <data.icon className={`w-7 h-7 text-${data.color}-600`} />
              </div>
              <h3 className="font-bold text-xs md:text-sm text-slate-800 uppercase tracking-wider">{data.title}</h3>
              
              {!isVisited && (
                <div className="absolute -top-3 -right-3 bg-blue-600 text-white p-1.5 rounded-full animate-bounce shadow-lg ring-2 ring-white z-30">
                  <MousePointerClick className="w-4 h-4" />
                </div>
              )}
            </div>
          </div>

          {/* BELAKANG */}
          <div className="absolute inset-0 backface-hidden rotate-y-180">
            <div className="w-full h-full bg-slate-800 rounded-2xl border-2 border-slate-600 shadow-xl flex flex-col items-center justify-center p-4 text-center">
              <p className="text-xs text-white leading-relaxed font-medium">{data.desc}</p>
              <div className="mt-2 bg-white/20 p-1 rounded-full"><CheckCircle className="w-4 h-4 text-green-400" /></div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col items-center pt-8 overflow-x-hidden">
      
      {/* Header */}
      <div className="text-center mb-8 z-30 relative">
        <h1 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight">Peta Konsep Materi</h1>
        <div className="inline-flex items-center gap-2 bg-white px-5 py-2 rounded-full border border-blue-100 text-blue-600 text-xs font-bold shadow-sm mt-3 animate-pulse">
           <Info className="w-4 h-4"/> Klik kotak untuk membuka materi
        </div>
      </div>

      {/* CONTAINER PETA TRANSPARAN 
         Kita hilangkan bg-white, border, dan shadow. 
         Hanya div transparan sebagai wadah koordinat.
      */}
      <div className="relative w-full max-w-5xl h-[600px] mx-auto">
        
        {/* GARIS PENGHUBUNG (SVG) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible" viewBox="0 0 900 600">
          <defs>
            <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto" markerUnits="strokeWidth">
              <path d="M0,0 L0,6 L6,3 z" fill="#64748b" />
            </marker>
          </defs>

          {/* Garis-garis sekarang menggunakan warna Slate-500 (#64748b) agar terlihat jelas di bg abu-abu muda, tapi tidak terlalu keras */}
          
          {/* Larutan (450,50) -> Elektrolit (250,250) */}
          <path d="M 450 100 C 450 180, 250 150, 250 250" fill="none" stroke="#94a3b8" strokeWidth="3" markerEnd="url(#arrow)" />
          
          {/* Larutan (450,50) -> Non (650,250) */}
          <path d="M 450 100 C 450 180, 650 150, 650 250" fill="none" stroke="#94a3b8" strokeWidth="3" markerEnd="url(#arrow)" />

          {/* Elektrolit (250,250) -> Kuat (150,450) */}
          <path d="M 250 310 C 250 380, 150 380, 150 450" fill="none" stroke="#cbd5e1" strokeWidth="3" markerEnd="url(#arrow)" strokeDasharray="8,4"/>

          {/* Elektrolit (250,250) -> Lemah (350,450) */}
          <path d="M 250 310 C 250 380, 350 380, 350 450" fill="none" stroke="#cbd5e1" strokeWidth="3" markerEnd="url(#arrow)" strokeDasharray="8,4"/>
        </svg>

        {/* RENDER KARTU */}
        {nodes.map(node => (
          <NodeCard key={node.id} data={node} />
        ))}

      </div>

      {/* Footer Tombol Lanjut (Floating di bawah) */}
      <div className="fixed bottom-0 left-0 w-full bg-gradient-to-t from-slate-50 via-slate-50/90 to-transparent pt-10 pb-8 text-center z-40 pointer-events-none">
        <div className="pointer-events-auto inline-block">
          {showContinue ? (
            <button 
              onClick={onNext}
              className="group relative inline-flex items-center gap-3 bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-[0_10px_30px_-10px_rgba(37,99,235,0.5)] hover:bg-blue-700 hover:-translate-y-1 transition-all"
            >
              <span>Lanjut Eksplorasi</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          ) : (
            <div className="bg-white/80 backdrop-blur px-6 py-2 rounded-full border border-slate-200 text-slate-400 font-medium text-sm shadow-sm">
              Buka minimal 4 kartu konsep untuk melanjutkan...
            </div>
          )}
        </div>
      </div>

      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </div>
  );
}