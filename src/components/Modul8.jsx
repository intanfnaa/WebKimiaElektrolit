import React, { useState } from 'react';
import { Award, CheckCircle, HelpCircle, PenTool, RotateCcw, Star, LogOut, Heart } from 'lucide-react';

export default function Modul8() {
  const [submitted, setSubmitted] = useState(false);
  const [reflectionText, setReflectionText] = useState("");
  const [rating, setRating] = useState(0);
  const [checks, setChecks] = useState({
    konsep: false,
    hantaran: false,
    contoh: false,
    senang: false
  });

  const handleCheck = (key) => {
    setChecks(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex items-center justify-center p-4 md:p-8 relative overflow-hidden">
      
      {/* Background Decor Halus */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-blue-100/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-indigo-100/40 rounded-full blur-3xl"></div>
      </div>

      {!submitted ? (
        /* --- FORMULIR REFLEKSI --- */
        <div className="relative z-10 max-w-3xl w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 animate-fade-in-up">
          
          {/* Header Biru Profesional */}
          <div className="bg-gradient-to-r from-blue-700 to-indigo-800 p-8 text-white text-center">
            <h1 className="text-3xl font-black mb-2 tracking-tight">Refleksi Diri</h1>
            <p className="text-blue-100 text-sm font-medium">Evaluasi pemahamanmu sebelum menutup sesi ini</p>
          </div>

          <div className="p-8 md:p-10 space-y-8">
            
            {/* 1. Checklist Pemahaman (Self Assessment) */}
            <div>
              <h3 className="text-slate-800 font-bold flex items-center gap-2 mb-4 text-lg">
                <div className="bg-green-100 p-2 rounded-lg"><CheckCircle className="w-5 h-5 text-green-600" /></div>
                Cek Pemahaman Mandiri
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { id: 'konsep', label: 'Paham beda Elektrolit Kuat/Lemah' },
                  { id: 'hantaran', label: 'Mengerti konsep Ionisasi' },
                  { id: 'contoh', label: 'Tahu contoh di kehidupan nyata' },
                  { id: 'senang', label: 'Saya senang belajar metode ini' }
                ].map((item) => (
                  <label 
                    key={item.id}
                    className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all duration-200 group ${
                      checks[item.id] ? 'border-green-500 bg-green-50/50' : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
                      checks[item.id] ? 'bg-green-500 border-green-500' : 'border-slate-300 bg-white group-hover:border-blue-400'
                    }`}>
                      {checks[item.id] && <CheckCircle className="w-3 h-3 text-white" />}
                    </div>
                    <span className={`text-sm font-bold ${checks[item.id] ? 'text-green-800' : 'text-slate-600'}`}>
                      {item.label}
                    </span>
                    <input type="checkbox" className="hidden" checked={checks[item.id]} onChange={() => handleCheck(item.id)}/>
                  </label>
                ))}
              </div>
            </div>

            {/* 2. Rating Bintang (Opsional tapi bagus untuk data) */}
            <div>
               <h3 className="text-slate-800 font-bold flex items-center gap-2 mb-4 text-lg">
                <div className="bg-yellow-100 p-2 rounded-lg"><Star className="w-5 h-5 text-yellow-600" /></div>
                Rating Pemahaman Materi
              </h3>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className={`p-1 transition-transform hover:scale-110 ${star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-200'}`}
                  >
                    <Star className="w-8 h-8" />
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Essay Refleksi (BAGIAN UTAMA YANG DIUBAH) */}
            <div>
              <h3 className="text-slate-800 font-bold flex items-center gap-2 mb-4 text-lg">
                <div className="bg-blue-100 p-2 rounded-lg"><HelpCircle className="w-5 h-5 text-blue-600" /></div>
                Hal yang Belum Dipahami
              </h3>
              <div className="relative group">
                <textarea
                  value={reflectionText}
                  onChange={(e) => setReflectionText(e.target.value)}
                  placeholder="Contoh: Saya masih bingung membedakan ionisasi sempurna dan sebagian. Bagian mana yang menurutmu paling sulit? Tuliskan disini..."
                  className="w-full min-h-[140px] p-5 rounded-2xl border border-slate-300 bg-slate-50 text-slate-700 leading-relaxed focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50 transition-all resize-y font-medium placeholder:font-normal placeholder:text-slate-400"
                ></textarea>
                <div className="absolute bottom-4 right-4 text-slate-400 text-xs flex items-center gap-1 bg-white/80 px-2 py-1 rounded-md border border-slate-100 shadow-sm">
                  <PenTool className="w-3 h-3" /> Ceritakan kendalamu
                </div>
              </div>
            </div>

            {/* Tombol Submit */}
            <div className="pt-4 border-t border-slate-100">
              <button 
                onClick={() => setSubmitted(true)}
                className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-black transition shadow-lg hover:shadow-xl hover:-translate-y-1 transform duration-200 flex items-center justify-center gap-2"
              >
                <span>Kirim Refleksi & Selesai</span>
                <CheckCircle className="w-5 h-5" />
              </button>
            </div>

          </div>
        </div>
      ) : (
        /* --- TAMPILAN SELESAI (SERTIFIKAT/PIALA) --- */
        <div className="relative z-10 max-w-2xl w-full text-center animate-bounce-in">
          
          <div className="bg-white rounded-[2.5rem] p-12 shadow-2xl border border-white/50 relative overflow-hidden backdrop-blur-sm">
            
            {/* Dekorasi Confetti CSS */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
            
            {/* Ikon Piala Besar */}
            <div className="relative inline-block mb-8 group cursor-default">
              <div className="absolute inset-0 bg-yellow-400/20 rounded-full blur-2xl group-hover:bg-yellow-400/40 transition-all duration-500"></div>
              <Award className="relative w-32 h-32 text-yellow-500 drop-shadow-lg transform group-hover:scale-110 transition-transform duration-500" />
              <Star className="absolute -top-2 -right-4 w-10 h-10 text-yellow-400 fill-yellow-400 animate-spin-slow" />
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-4 tracking-tight">LUAR BIASA!</h2>
            <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed font-medium">
              Selamat, kamu telah menuntaskan seluruh misi pembelajaran <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 font-bold">Larutan Elektrolit</span>
            </p>

            {/* Kotak Pesan Terima Kasih */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-10 mx-auto max-w-md">
               <div className="flex items-center justify-center gap-2 text-slate-700 font-bold mb-2">
                  <Heart className="w-5 h-5 text-pink-500 fill-pink-500 animate-pulse"/> Terima Kasih
               </div>
               <p className="text-sm text-slate-500 italic">
                 "Refleksi dirimu telah tersimpan. Teruslah belajar dan bereksperimen!"
               </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {/* Tombol Ulangi (Reload) */}
              <button 
                onClick={() => window.location.reload()} 
                className="flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 rounded-2xl font-bold transition border border-slate-200 shadow-sm hover:shadow-md"
              >
                <RotateCcw className="w-5 h-5" /> Ulangi Materi
              </button>
              
              {/* Tombol Keluar */}
              <button 
                onClick={() => alert("Silakan tutup tab browser Anda untuk keluar.")}
                className="flex items-center justify-center gap-2 px-10 py-4 bg-slate-900 hover:bg-black text-white rounded-2xl font-bold shadow-lg hover:shadow-xl transition hover:-translate-y-1"
              >
                <LogOut className="w-5 h-5" /> Selesai
              </button>
            </div>

          </div>
          
          <p className="mt-8 text-slate-400 text-sm font-medium tracking-widest uppercase">© 2025 Project ElektroLIT</p>
        </div>
      )}

      {/* Style Animasi */}
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce-in {
          0% { transform: scale(0.9); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.6s ease-out forwards; }
        .animate-bounce-in { animation: bounce-in 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
      `}</style>
    </div>
  );
}