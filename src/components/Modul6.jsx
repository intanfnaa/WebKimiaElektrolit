import React, { useState } from 'react';
import { ChevronRight, FlaskConical, Trophy, RotateCcw, Check, X } from 'lucide-react';

export default function Modul6({ onNext }) {
  // Data Larutan (Total 6 Item)
  const initialItems = [
    { id: 1, name: 'Garam (NaCl)', type: 'kuat' },
    { id: 2, name: 'Cuka (CH₃COOH)', type: 'lemah' },
    { id: 3, name: 'Gula (C₁₂H₂₂O₁₁)', type: 'non' },
    { id: 4, name: 'Air Aki (H₂SO₄)', type: 'kuat' },
    { id: 5, name: 'Urea (CO(NH₂)₂)', type: 'non' },
    { id: 6, name: 'Amonia (NH₃)', type: 'lemah' },
  ];

  // State
  const [items, setItems] = useState(initialItems); // Barang yang belum diseret
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(""); 
  
  // State untuk menyimpan barang yang sudah masuk ke keranjang (agar terlihat di dalam kotak)
  const [bins, setBins] = useState({
    kuat: [],
    lemah: [],
    non: []
  });

  // Drag Start
  const handleDragStart = (e, item) => {
    e.dataTransfer.setData("itemId", item.id);
  };

  // Allow Drop
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Drop Logic (INTI PERUBAHAN DI SINI)
  const handleDrop = (e, targetBin) => {
    e.preventDefault();
    const itemId = parseInt(e.dataTransfer.getData("itemId"));
    const item = items.find((i) => i.id === itemId);

    if (item) {
      // 1. Cek Benar atau Salah
      const isCorrect = item.type === targetBin;

      // 2. Hitung Poin (Hanya nambah kalau benar)
      if (isCorrect) {
        setScore((prev) => prev + 20); // Poin plus
        setFeedback(`✅ Benar! ${item.name} adalah tipe ${targetBin.toUpperCase()}`);
      } else {
        // Kalau salah, poin tidak nambah (0), tapi barang tetap masuk
        setFeedback(`❌ Kurang tepat. ${item.name} sebenarnya adalah tipe ${item.type.toUpperCase()}`);
      }

      // 3. Pindahkan Barang: Hapus dari daftar atas, masukkan ke keranjang bawah
      setItems(items.filter((i) => i.id !== itemId));
      
      setBins(prev => ({
        ...prev,
        [targetBin]: [...prev[targetBin], { ...item, isCorrect }] // Kita simpan status benar/salah untuk warna nanti
      }));

      // Hilangkan pesan feedback setelah 2 detik
      setTimeout(() => setFeedback(""), 2000);
    }
  };

  // Cek apakah game selesai (jika daftar item kosong)
  const isCompleted = items.length === 0;

  return (
    <div className="min-h-screen bg-slate-800 p-4 flex flex-col items-center font-sans">
      
      {/* Header & Skor */}
      <div className="w-full max-w-5xl flex justify-between items-center mb-6 bg-white/10 p-4 rounded-2xl backdrop-blur-md text-white border border-white/10">
        <div>
          <h2 className="text-2xl font-bold">Klasifikasi Larutan</h2>
          <p className="text-slate-300 text-sm">Seret larutan ke keranjang yang sesuai</p>
        </div>
        <div className="flex items-center gap-4">
          {feedback && (
            <div className={`px-4 py-2 rounded-lg text-sm font-bold animate-pulse ${feedback.includes('Benar') ? 'bg-green-500/20 text-green-300 border border-green-500' : 'bg-red-500/20 text-red-300 border border-red-500'}`}>
              {feedback}
            </div>
          )}
          <div className="bg-slate-900 px-6 py-2 rounded-xl border border-slate-700 flex items-center gap-2">
            <Trophy className="text-yellow-400 w-5 h-5" />
            <span className="text-xl font-mono font-bold">{score}</span>
          </div>
        </div>
      </div>

      {!isCompleted ? (
        <div className="w-full max-w-5xl flex-1 flex flex-col">
          
          {/* AREA BOTOL (DRAGGABLE ITEMS) */}
          <div className="bg-slate-700/30 rounded-3xl p-6 mb-8 border border-white/5 min-h-[160px]">
            <h3 className="text-slate-400 text-sm font-bold mb-4 uppercase tracking-widest text-center">Bahan Kimia Tersedia</h3>
            <div className="flex flex-wrap gap-4 justify-center">
              {items.map((item) => (
                <div
                  key={item.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, item)}
                  className="cursor-grab active:cursor-grabbing bg-white px-4 py-3 rounded-xl shadow-[0_4px_0_rgb(203,213,225)] hover:translate-y-1 hover:shadow-none transition-all flex flex-col items-center gap-2 w-32"
                >
                  <FlaskConical className="text-blue-600 w-8 h-8" />
                  <span className="font-bold text-slate-700 text-sm text-center leading-tight">{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* AREA KERANJANG (DROP ZONES) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
            {['kuat', 'lemah', 'non'].map((type) => (
              <div
                key={type}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, type)}
                className={`rounded-3xl p-6 flex flex-col border-2 border-dashed transition-all duration-300 ${
                  type === 'kuat' ? 'bg-green-500/10 border-green-500/50 hover:bg-green-500/20' :
                  type === 'lemah' ? 'bg-yellow-500/10 border-yellow-500/50 hover:bg-yellow-500/20' :
                  'bg-red-500/10 border-red-500/50 hover:bg-red-500/20'
                }`}
              >
                {/* Judul Keranjang */}
                <div className="text-center mb-4">
                  <h3 className={`text-xl font-black uppercase tracking-wider ${
                    type === 'kuat' ? 'text-green-400' : type === 'lemah' ? 'text-yellow-400' : 'text-red-400'
                  }`}>
                    {type === 'non' ? 'Non Elektrolit' : `Elektrolit ${type}`}
                  </h3>
                </div>

                {/* Isi Keranjang (Barang yang sudah didrop) */}
                <div className="flex-1 space-y-2">
                  {bins[type].map((item, idx) => (
                    <div 
                      key={idx} 
                      className={`p-3 rounded-lg flex justify-between items-center text-sm font-bold animate-fade-in-up ${
                        item.isCorrect 
                          ? 'bg-green-500 text-green-950' // Kalau benar warnanya hijau
                          : 'bg-red-500/80 text-white'    // Kalau salah warnanya merah (tapi tetap masuk)
                      }`}
                    >
                      <span>{item.name}</span>
                      {item.isCorrect ? <Check className="w-4 h-4"/> : <X className="w-4 h-4"/>}
                    </div>
                  ))}
                </div>
                
                {bins[type].length === 0 && (
                  <div className="flex-1 flex items-center justify-center opacity-30">
                    <div className="w-20 h-20 border-4 border-white/20 rounded-full"></div>
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      ) : (
        /* Tampilan Selesai */
        <div className="mt-10 text-center bg-white p-12 rounded-3xl shadow-2xl animate-bounce-in max-w-2xl w-full">
          <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Trophy className="w-12 h-12 text-yellow-600" />
          </div>
          <h2 className="text-4xl font-black text-slate-800 mb-2">Klasifikasi Selesai!</h2>
          <p className="text-slate-500 mb-8">Anda telah mengelompokkan semua senyawa.</p>
          
          <div className="bg-slate-50 rounded-2xl p-8 mb-8">
            <p className="text-sm text-slate-400 uppercase tracking-widest font-bold">Skor Akhir</p>
            <div className="text-7xl font-black text-blue-600 tracking-tighter">{score}</div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
             <button 
                onClick={() => { 
                  setItems(initialItems); 
                  setScore(0); 
                  setBins({ kuat: [], lemah: [], non: [] });
                  setFeedback("");
                }}
                className="flex items-center justify-center gap-2 px-6 py-4 bg-slate-100 hover:bg-slate-200 rounded-xl font-bold text-slate-700 transition"
             >
                <RotateCcw className="w-5 h-5"/> Ulangi
             </button>
             <button 
                onClick={onNext}
                className="flex items-center justify-center gap-2 px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-xl shadow-blue-500/30 transition hover:scale-105"
             >
                Lanjut Kuis <ChevronRight/>
             </button>
          </div>
        </div>
      )}
    </div>
  );
}