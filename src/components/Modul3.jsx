import React, { useState } from 'react';
import { ChevronRight, HelpCircle, Lightbulb, CheckCircle2, Search, Edit3, BookOpen } from 'lucide-react';

export default function Modul3({ onNext }) {
  // State untuk menyimpan jawaban user per pertanyaan
  // Format: { 1: "Jawaban user...", 2: "..." }
  const [userAnswers, setUserAnswers] = useState({});
  
  // State untuk menandai pertanyaan mana yang sudah disubmit
  const [submittedIds, setSubmittedIds] = useState([]);

  const questions = [
    {
      id: 1,
      text: "Apa perbedaan partikel dalam larutan NaCl dan larutan gula ketika dilarutkan dalam air?",
      hint: "Pikirkan tentang jenis ikatan (ion vs kovalen). Apakah keduanya terurai jadi partikel bermuatan?",
      answer: "NaCl (garam) terurai menjadi ion positif (Na⁺) dan ion negatif (Cl⁻). Sedangkan Gula (C₆H₁₂O₆) tetap utuh sebagai molekul netral. Perbedaan utamanya adalah adanya partikel bermuatan (ion) pada garam.",
    },
    {
      id: 2,
      text: "Mengapa ada perbedaan nyala lampu pada kedua larutan tersebut?",
      hint: "Ingat syarat arus listrik bisa mengalir: harus ada pembawa muatan yang bergerak.",
      answer: "Lampu menyala pada larutan NaCl karena adanya ion-ion yang bergerak bebas membawa muatan listrik. Larutan gula tidak memiliki ion bebas, sehingga arus listrik tidak bisa lewat.",
    },
    {
      id: 3,
      text: "Jadi, apa syarat utama agar suatu larutan dapat menghantarkan listrik?",
      hint: "Simpulkan dari jawaban nomor 1 dan 2.",
      answer: "Syarat utamanya adalah adanya ion-ion yang bergerak bebas (terionisasi). Tanpa ion bebas, listrik tidak dapat dihantarkan.",
    }
  ];

  // Fungsi saat user mengetik
  const handleInputChange = (id, text) => {
    setUserAnswers(prev => ({
      ...prev,
      [id]: text
    }));
  };

  // Fungsi saat tombol "Cek Jawaban" diklik
  const handleSubmit = (id) => {
    // Validasi: User harus mengisi sesuatu, minimal 5 karakter
    if (!userAnswers[id] || userAnswers[id].length < 5) {
      alert("Mohon isi hipotesismu terlebih dahulu sebelum melihat jawaban ilmiah.");
      return;
    }

    if (!submittedIds.includes(id)) {
      setSubmittedIds([...submittedIds, id]);
    }
  };

  // Cek apakah semua sudah selesai untuk memunculkan tombol Lanjut
  const allCompleted = questions.every(q => submittedIds.includes(q.id));

  return (
    <div className="min-h-screen bg-slate-50 font-sans p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-bold mb-4 shadow-sm">
            <Search className="w-4 h-4" />
            <span>Tahap Eksplorasi & Hipotesis</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-800 mb-4">Mengapa Lampu Bisa Menyala?</h1>
          <p className="text-slate-600 text-lg">
            Tuliskan pendapatmu (hipotesis) mengenai fenomena di bawah ini, lalu bandingkan dengan penjelasan ilmiahnya.
          </p>
        </div>

        {/* Daftar Kartu Pertanyaan */}
        <div className="space-y-8">
          {questions.map((q) => {
            const isSubmitted = submittedIds.includes(q.id);
            
            return (
              <div 
                key={q.id}
                className={`bg-white rounded-3xl shadow-xl overflow-hidden border-2 transition-all duration-500 ${isSubmitted ? 'border-green-500 shadow-green-100' : 'border-slate-100'}`}
              >
                {/* Header Pertanyaan */}
                <div className="bg-slate-50 p-6 border-b border-slate-100">
                  <div className="flex gap-4">
                    <div className="bg-blue-600 text-white w-8 h-8 flex-shrink-0 rounded-full flex items-center justify-center font-bold">
                      {q.id}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800 mb-2">{q.text}</h3>
                      
                      {/* Petunjuk (Hint) */}
                      <div className="inline-flex items-start gap-2 text-sm text-amber-600 bg-amber-50 px-3 py-2 rounded-lg">
                        <Lightbulb className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <span>Petunjuk: {q.hint}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Area Input Hipotesis */}
                <div className="p-6 md:p-8">
                  <div className="mb-6">
                    <label className="block text-sm font-bold text-slate-500 mb-2 flex items-center gap-2">
                      <Edit3 className="w-4 h-4" /> Hipotesis Kamu:
                    </label>
                    <textarea
                      disabled={isSubmitted} // Kunci jika sudah submit
                      value={userAnswers[q.id] || ''}
                      onChange={(e) => handleInputChange(q.id, e.target.value)}
                      placeholder="Tuliskan jawaban atau dugaanmu di sini... (Jangan takut salah, tidak ada batasan karakter)"
                      className={`w-full p-4 rounded-xl border-2 min-h-[120px] text-slate-700 leading-relaxed focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all ${
                        isSubmitted ? 'bg-slate-50 border-slate-200' : 'bg-white border-blue-200 focus:border-blue-500'
                      }`}
                    />
                  </div>

                  {/* Tombol Submit per Pertanyaan */}
                  {!isSubmitted && (
                    <button
                      onClick={() => handleSubmit(q.id)}
                      className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg hover:shadow-blue-200 w-full md:w-auto"
                    >
                      Simpan Hipotesis & Lihat Penjelasan
                    </button>
                  )}

                  {/* JAWABAN ILMIAH (Muncul setelah submit) */}
                  {isSubmitted && (
                    <div className="animate-fade-in-up mt-6">
                      <div className="flex items-center gap-2 mb-3 text-green-700 font-bold border-t pt-6 border-slate-100">
                        <BookOpen className="w-5 h-5" />
                        Penjelasan Ilmiah:
                      </div>
                      <div className="bg-green-50 border border-green-200 p-6 rounded-2xl relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-2 h-full bg-green-500"></div>
                        <p className="text-slate-800 leading-relaxed font-medium">
                          {q.answer}
                        </p>
                        <div className="mt-4 flex items-center gap-2 text-sm text-green-700 bg-green-100/50 p-3 rounded-lg">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Bandingkan dengan jawabanmu di atas. Apakah mirip?</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Tombol Lanjut (Hanya muncul jika semua sudah dijawab) */}
        <div className="mt-12 mb-20 text-center">
          {allCompleted ? (
            <div className="animate-bounce-in">
              <p className="text-slate-600 mb-4 font-medium">Hebat! Kamu sudah menyelesaikan tahap hipotesis.</p>
              <button
                onClick={onNext}
                className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all"
              >
                <span>Lanjut ke Materi Inti</span>
                <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-slate-200 rounded-full text-slate-500 font-bold text-sm">
              <HelpCircle className="w-4 h-4" />
              <span>Selesaikan {questions.length - submittedIds.length} hipotesis lagi untuk lanjut</span>
            </div>
          )}
        </div>

      </div>
      
      {/* Animasi Tambahan */}
      <style>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.6s ease-out forwards; }
      `}</style>
    </div>
  );
}