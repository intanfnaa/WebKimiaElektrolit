import React, { useState } from 'react';
import { ChevronRight, BookOpen, Zap, CheckCircle2, Flame, Atom, Microscope, ArrowRight, Droplets, Box, Ban } from 'lucide-react';

export default function Modul4({ onNext }) {
  const [activeTab, setActiveTab] = useState('pengertian');

  // Komponen Kecil untuk Visualisasi Fase (Padat/Leleh/Larutan)
  const PhaseStatus = ({ label, conducts, reason, icon: Icon }) => (
    <div className={`flex items-start gap-3 p-3 rounded-lg border ${conducts ? 'bg-green-50 border-green-100' : 'bg-slate-50 border-slate-100'}`}>
      <div className={`mt-1 p-1.5 rounded-full ${conducts ? 'bg-green-200 text-green-700' : 'bg-slate-200 text-slate-500'}`}>
        <Icon className="w-3 h-3" />
      </div>
      <div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-slate-700">{label}</span>
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${conducts ? 'text-green-600 border-green-200 bg-green-100' : 'text-slate-400 border-slate-200 bg-slate-100'}`}>
            {conducts ? 'MENGHANTAR' : 'TIDAK'}
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-1 leading-snug">{reason}</p>
      </div>
    </div>
  );

  // Data Materi Lengkap
  const content = {
    pengertian: {
      title: "Pengertian Dasar",
      icon: BookOpen,
      color: "text-blue-600",
      bg: "bg-blue-100",
      description: (
        <div className="space-y-4 text-left">
          <p className="leading-relaxed">
            <strong>Larutan Elektrolit</strong> adalah larutan yang dapat menghantarkan arus listrik. 
            Kemampuan ini disebabkan karena zat terlarut terurai (terdisosiasi) menjadi ion-ion yang bergerak bebas.
          </p>
          <div className="bg-blue-50 p-4 rounded-xl border-l-4 border-blue-500">
            <h4 className="font-bold text-blue-800 mb-2">Konsep Penting:</h4>
            <ul className="list-disc pl-5 space-y-1 text-slate-700">
              <li><strong>Elektrolit Kuat:</strong> Terionisasi sempurna (α = 1). Contoh: Garam dapur, Air Aki.</li>
              <li><strong>Elektrolit Lemah:</strong> Terionisasi sebagian (0 &lt; α &lt; 1). Contoh: Cuka, Amonia.</li>
              <li><strong>Non-Elektrolit:</strong> Tidak terionisasi (α = 0). Contoh: Gula, Alkohol.</li>
            </ul>
          </div>
        </div>
      )
    },
    ciri: {
      title: "Ciri-Ciri & Gejala",
      icon: CheckCircle2,
      color: "text-green-600",
      bg: "bg-green-100",
      description: (
        <div className="space-y-6 text-left">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
              <h4 className="font-bold text-green-700 mb-2 border-b pb-2">Pengamatan Makroskopis</h4>
              <p className="text-sm text-slate-600 mb-2">Apa yang terlihat mata?</p>
              <ul className="text-sm space-y-2">
                <li className="flex items-start gap-2">
                   <span className="text-green-500">✓</span> Nyala lampu terang/redup
                </li>
                <li className="flex items-start gap-2">
                   <span className="text-green-500">✓</span> Timbul gelembung gas pada elektroda
                </li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
              <h4 className="font-bold text-purple-700 mb-2 border-b pb-2">Pengamatan Mikroskopis</h4>
              <p className="text-sm text-slate-600 mb-2">Apa yang terjadi pada partikel?</p>
              <ul className="text-sm space-y-2">
                <li className="flex items-start gap-2">
                   <span className="text-purple-500">✓</span> Zat terurai menjadi ion (+) dan (-)
                </li>
                <li className="flex items-start gap-2">
                   <span className="text-purple-500">✓</span> Ion bergerak acak namun terarah saat ada listrik
                </li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    senyawa: {
      title: "Senyawa Pembentuk",
      icon: Flame,
      color: "text-orange-600",
      bg: "bg-orange-100",
      description: (
        <div className="space-y-6 text-left">
          <p className="text-slate-600">
            Daya hantar listrik bergantung pada jenis ikatan kimia dan wujud zatnya (Fase).
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* KARTU 1: SENYAWA ION */}
            <div className="bg-white rounded-2xl shadow-sm border border-orange-200 overflow-hidden">
              <div className="bg-orange-50 p-4 border-b border-orange-100 flex justify-between items-center">
                <h4 className="font-bold text-orange-800 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-orange-500"></div> A. Senyawa Ion
                </h4>
                <span className="text-xs font-bold text-orange-400 bg-white px-2 py-1 rounded">Contoh: NaCl</span>
              </div>
              
              <div className="p-4 space-y-3">
                <p className="text-xs text-slate-500 mb-2">Zat yang jika larut menghasilkan ion-ion.</p>
                
                {/* Visualisasi Molekul Ion Padat vs Cair */}
                <div className="flex gap-2 mb-4 justify-center">
                   <div className="text-center">
                      <div className="w-16 h-16 bg-slate-100 rounded-lg border border-slate-200 grid grid-cols-3 gap-1 p-1 items-center justify-items-center mb-1">
                         {[...Array(9)].map((_,i) => <div key={i} className="w-3 h-3 rounded-full bg-orange-400"></div>)}
                      </div>
                      <span className="text-[10px] font-bold text-slate-400">Padat (Rapat)</span>
                   </div>
                   <div className="text-center">
                      <div className="w-16 h-16 bg-blue-50 rounded-lg border border-blue-100 relative mb-1 overflow-hidden">
                         {[...Array(5)].map((_,i) => (
                           <div key={i} className="absolute w-3 h-3 rounded-full bg-orange-400" style={{top: Math.random()*80+'%', left: Math.random()*80+'%'}}></div>
                         ))}
                      </div>
                      <span className="text-[10px] font-bold text-blue-400">Larutan (Bebas)</span>
                   </div>
                </div>

                <PhaseStatus 
                  label="Padatan" icon={Box} conducts={false} 
                  reason="Ion terkunci rapat, tidak bisa bergerak bebas." 
                />
                <PhaseStatus 
                  label="Lelehan (Cair)" icon={Droplets} conducts={true} 
                  reason="Ion dapat bergerak relatif lebih bebas." 
                />
                <PhaseStatus 
                  label="Larutan (Air)" icon={Atom} conducts={true} 
                  reason="Ion bergerak sangat bebas dalam air." 
                />
              </div>
            </div>

            {/* KARTU 2: KOVALEN POLAR */}
            <div className="bg-white rounded-2xl shadow-sm border border-indigo-200 overflow-hidden">
              <div className="bg-indigo-50 p-4 border-b border-indigo-100 flex justify-between items-center">
                <h4 className="font-bold text-indigo-800 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-indigo-500"></div> B. Kovalen Polar
                </h4>
                <span className="text-xs font-bold text-indigo-400 bg-white px-2 py-1 rounded">Contoh: HCl, NH₃</span>
              </div>
              
              <div className="p-4 space-y-3">
                <p className="text-xs text-slate-500 mb-2">Terbentuk karena beda keelektronegatifan antar atom.</p>

                 {/* Visualisasi Molekul Kovalen */}
                 <div className="flex gap-2 mb-4 justify-center">
                   <div className="text-center">
                      <div className="w-16 h-16 bg-slate-100 rounded-lg border border-slate-200 flex items-center justify-center gap-1 mb-1">
                         <div className="w-4 h-4 rounded-full bg-indigo-400"></div>
                         <div className="w-3 h-3 rounded-full bg-indigo-600"></div>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400">Molekul Netral</span>
                   </div>
                   <div className="text-center">
                      <div className="w-16 h-16 bg-blue-50 rounded-lg border border-blue-100 relative mb-1 flex items-center justify-center gap-4">
                         <div className="w-4 h-4 rounded-full bg-indigo-400 relative"><span className="absolute -top-1 -right-1 text-[8px]">+</span></div>
                         <div className="w-3 h-3 rounded-full bg-indigo-600 relative"><span className="absolute -top-1 -right-1 text-[8px]">-</span></div>
                      </div>
                      <span className="text-[10px] font-bold text-blue-400">Terionisasi</span>
                   </div>
                </div>

                <PhaseStatus 
                  label="Padatan" icon={Box} conducts={false} 
                  reason="Terdiri atas molekul netral (meski polar)." 
                />
                <PhaseStatus 
                  label="Lelehan (Cair)" icon={Droplets} conducts={false} 
                  reason="Molekul netral bergerak bebas, tapi tak ada ion." 
                />
                <PhaseStatus 
                  label="Larutan (Air)" icon={Atom} conducts={true} 
                  reason="Terhidrolisis (pecah) menjadi ion yang bergerak bebas." 
                />
              </div>
            </div>

          </div>
        </div>
      )
    },
    hubungan: {
      title: "Mekanisme Hantaran",
      icon: Zap,
      color: "text-yellow-600",
      bg: "bg-yellow-100",
      description: (
        <div className="text-left space-y-4">
          <div className="bg-slate-800 text-white p-6 rounded-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/20 rounded-full blur-2xl"></div>
            <h4 className="font-bold text-yellow-400 mb-3 text-lg">Bagaimana listrik mengalir?</h4>
            <ol className="space-y-3 relative z-10 text-slate-200 list-decimal pl-5">
              <li>Sumber arus (baterai) memompa elektron ke katoda (-).</li>
              <li><strong className="text-white">Kation</strong> (ion positif) bergerak menuju Katoda untuk menangkap elektron.</li>
              <li><strong className="text-white">Anion</strong> (ion negatif) bergerak menuju Anoda (+) untuk melepas elektron.</li>
              <li>Perpindahan muatan inilah yang menyebabkan arus listrik mengalir dan lampu menyala.</li>
            </ol>
          </div>
        </div>
      )
    }
  };

  return (
    <div className="min-h-screen bg-indigo-50 py-8 px-4 font-sans flex flex-col items-center">
      
      {/* Header Modul */}
      <div className="text-center mb-8 max-w-2xl">
        <h2 className="text-sm font-bold text-indigo-500 tracking-widest uppercase mb-2">Modul 4 • Materi Inti</h2>
        <h1 className="text-3xl md:text-4xl font-black text-slate-800">Teori Dasar Elektrolit</h1>
      </div>

      <div className="max-w-6xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px]">
        
        {/* Sidebar Navigasi (Kiri) */}
        <div className="w-full md:w-1/4 bg-slate-50 border-r border-slate-200 flex flex-col">
          <div className="p-6">
            <h3 className="font-bold text-slate-400 text-xs uppercase tracking-wider mb-4">Daftar Topik</h3>
            <div className="space-y-2">
              {Object.keys(content).map((key) => {
                const item = content[key];
                const isActive = activeTab === key;
                return (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-left ${
                      isActive 
                        ? `${item.bg} ${item.color} shadow-sm font-bold ring-2 ring-opacity-50 ring-offset-1 ring-${item.color.split('-')[1]}-400` 
                        : 'hover:bg-slate-100 text-slate-600'
                    }`}
                  >
                    <item.icon className={`w-5 h-5 ${isActive ? item.color : 'text-slate-400'}`} />
                    <span className="text-sm">{item.title}</span>
                    {isActive && <ChevronRight className="ml-auto w-4 h-4 opacity-50"/>}
                  </button>
                );
              })}
            </div>
          </div>
          
          <div className="mt-auto p-6 bg-indigo-900 text-white">
            <p className="text-xs opacity-70 mb-2">Status</p>
            <div className="w-full bg-indigo-700 h-1.5 rounded-full mb-2">
              <div className="bg-green-400 h-1.5 rounded-full" style={{ width: '50%' }}></div>
            </div>
            <p className="text-[10px] font-bold">Materi Inti</p>
          </div>
        </div>

        {/* Area Konten Utama (Kanan) */}
        <div className="flex-1 p-6 md:p-10 flex flex-col overflow-y-auto max-h-[800px]">
          {/* Judul Konten */}
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100 sticky top-0 bg-white z-10">
            <div className={`p-3 rounded-2xl ${content[activeTab].bg}`}>
              {React.createElement(content[activeTab].icon, { className: `w-8 h-8 ${content[activeTab].color}` })}
            </div>
            <h2 className="text-2xl font-bold text-slate-800">{content[activeTab].title}</h2>
          </div>

          {/* Isi Teks */}
          <div className="flex-1 text-slate-600 leading-relaxed animate-fade-in">
            {content[activeTab].description}
          </div>

          {/* Tombol Lanjut */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end">
            <button 
              onClick={onNext} 
              className="group flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
            >
              <span>Lanjut ke Simulasi</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}