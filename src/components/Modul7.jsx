import React, { useState } from 'react';
import { ArrowRight, CheckCircle, XCircle, Activity, User, Save, HelpCircle, AlertTriangle } from 'lucide-react';

export default function Modul7({ onNext }) {
  // --- LINK DATABASE MILIKMU ---
  // Pastikan link ini sesuai dengan yang kamu dapat dari Google Apps Script
  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzYLH-DhQncDHDstXFjRSGkuO2QypSR8tNDWQYcH-tL8wkfe1NpTvitcQ8V-nsuZSIS/exec";

  const [step, setStep] = useState('login'); // login | quiz | result
  const [student, setStudent] = useState({ nama: '', kelas: '' });
  
  // State Quiz
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0); 
  const [selectedOption, setSelectedOption] = useState(null); 
  const [finalScore, setFinalScore] = useState(0); 
  
  // State Status
  const [isSending, setIsSending] = useState(false);
  const [sendStatus, setSendStatus] = useState(null);

  // Data Soal (5 Soal - Jelas & Anti Miskonsepsi)
  const questions = [
    {
      id: 1, type: 'data_analysis',
      intro: "Data hasil uji daya hantar listrik tiga jenis larutan:",
      data: [
        { larutan: "Larutan K", lampu: "Nyala Terang", gelembung: "Banyak" },
        { larutan: "Larutan L", lampu: "Mati", gelembung: "Tidak Ada" },
        { larutan: "Larutan M", lampu: "Mati", gelembung: "Sedikit" }
      ],
      question: "Berdasarkan data tabel, urutan kekuatan daya hantar listrik dari yang TERKUAT ke TERLEMAH adalah...",
      options: ["K - L - M", "K - M - L", "L - M - K", "M - L - K"], 
      ans: 1, // Kunci: K - M - L
      explanation: "Larutan K (Kuat) > Larutan M (Lemah, karena ada gelembung meski lampu mati) > Larutan L (Non-Elektrolit, tidak ada ciri apapun)."
    },
    {
      id: 2, type: 'concept', 
      intro: "Garam dapur (NaCl) dalam bentuk padatan kristal tidak dapat menyalakan lampu alat uji.",
      question: "Mengapa padatan NaCl tidak menghantarkan listrik, sedangkan larutannya bisa?",
      options: [
        "Karena padatan tidak mengandung air sebagai penghantar.",
        "Karena dalam padatan, ion-ionnya terkunci rapat dan tidak bebas bergerak.",
        "Karena padatan NaCl adalah senyawa kovalen.",
        "Karena arus listrik hanya bisa mengalir di benda cair."
      ], 
      ans: 1, // Kunci: Ion terkunci
      explanation: "Syarat menghantar listrik adalah adanya partikel bermuatan yang BERGERAK BEBAS. Di padatan ionik, ionnya ada tapi diam (terkunci rapat)."
    },
    {
      id: 3, type: 'logic', 
      intro: "Gula pasir larut sempurna dalam air bening, namun saat diuji, lampu tetap mati dan tidak ada gelembung gas.",
      question: "Kesimpulan yang paling tepat mengenai partikel gula dalam air adalah...",
      options: [
        "Gula terurai menjadi ion positif dan negatif.",
        "Gula bereaksi dengan air membentuk endapan.",
        "Gula menyebar sebagai molekul netral (tidak bermuatan).",
        "Gula mengalami ionisasi sebagian kecil."
      ], 
      ans: 2, // Kunci: Molekul netral
      explanation: "Gula (Non-elektrolit) larut secara molekuler. Ia tidak pecah menjadi ion. Tanpa ion, tidak ada 'kurir' yang membawa muatan listrik."
    },
    {
      id: 4, type: 'application', 
      intro: "Saat menguji air sungai dari pegunungan kapur, ternyata lampu alat uji menyala redup.",
      question: "Hal ini membuktikan bahwa air sungai tersebut...",
      options: [
        "Merupakan air murni (H2O) yang bebas zat lain.",
        "Mengandung mineral atau garam terlarut yang terionisasi.",
        "Adalah senyawa kovalen non-polar.",
        "Alat ujinya mengalami kerusakan."
      ], 
      ans: 1, // Kunci: Mengandung mineral
      explanation: "Air murni itu isolator. Jika menghantar listrik (meski redup), berarti ada zat terlarut (mineral/garam) yang menjadi ion-ion."
    },
    {
      id: 5, type: 'theory', 
      intro: "Perhatikan data: Asam Klorida (HCl) lampu terang. Asam Cuka (CH3COOH) lampu redup.",
      question: "Penyebab utama perbedaan nyala lampu tersebut adalah...",
      options: [
        "Jumlah air pelarutnya berbeda.",
        "HCl terionisasi sempurna (α=1), sedangkan Cuka terionisasi sebagian (0<α<1).",
        "HCl adalah senyawa kovalen, sedangkan Cuka senyawa ion.",
        "Cuka mengandung lebih banyak ion daripada HCl."
      ], 
      ans: 1, // Kunci: Derajat ionisasi
      explanation: "Kekuatan elektrolit ditentukan oleh Derajat Ionisasi (α). α=1 artinya semua zat jadi ion (Kuat/Terang). α<1 artinya hanya sedikit yang jadi ion (Lemah/Redup)."
    }
  ];

  // 1. LOGIN HANDLER
  const handleLogin = (e) => {
    e.preventDefault();
    if (student.nama && student.kelas) {
      setStep('quiz');
    } else {
      alert("Mohon isi Nama dan Kelas dulu ya!");
    }
  };

  // 2. JAWAB SOAL
  const handleAnswer = (idx) => {
    setSelectedOption(idx);
    // Tambah score jika benar
    if (idx === questions[currentQ].ans) {
      setScore(prev => prev + 1);
    }
  };

  // 3. NAVIGASI (LANJUT / SELESAI)
  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelectedOption(null); 
    } else {
      finishQuiz();
    }
  };

  // 4. KIRIM DATA & HITUNG SKOR
  const finishQuiz = async () => {
    // Hitung Nilai Akhir (Skala 100)
    // Rumus: (Jumlah Benar / 5 Soal) * 100 -> Alias Score * 20
    const calculatedScore = score * 20; 
    
    setFinalScore(calculatedScore); 
    setStep('result'); // Pindah ke halaman hasil
    
    // Kirim data ke Spreadsheet
    setIsSending(true);
    const formData = new FormData();
    formData.append('Nama', student.nama);
    formData.append('Kelas', student.kelas);
    formData.append('Nilai', calculatedScore);

    try {
      await fetch(SCRIPT_URL, { method: 'POST', body: formData });
      setIsSending(false);
      setSendStatus('success');
    } catch (error) {
      console.error("Gagal kirim data", error);
      setIsSending(false);
      setSendStatus('error');
    }
  };

  /* --- TAMPILAN 1: LOGIN --- */
  if (step === 'login') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
        <div className="bg-white max-w-md w-full p-8 rounded-3xl shadow-xl border border-slate-200">
          <div className="text-center mb-8">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-blue-600"/>
            </div>
            <h2 className="text-2xl font-black text-slate-800">Identitas Siswa</h2>
            <p className="text-slate-500 text-sm">Isi data diri untuk memulai evaluasi.</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Nama Lengkap</label>
              <input type="text" className="w-full p-3 rounded-xl border border-slate-300 focus:border-blue-500 outline-none" placeholder="Contoh: Budi Santoso" value={student.nama} onChange={e => setStudent({...student, nama: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Kelas</label>
              <input type="text" className="w-full p-3 rounded-xl border border-slate-300 focus:border-blue-500 outline-none" placeholder="Contoh: X IPA 2" value={student.kelas} onChange={e => setStudent({...student, kelas: e.target.value})} />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg">Mulai Mengerjakan</button>
          </form>
        </div>
      </div>
    );
  }

  /* --- TAMPILAN 2: QUIZ --- */
  if (step === 'quiz') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
        <div className="bg-white max-w-3xl w-full rounded-3xl shadow-2xl p-6 md:p-10 border border-slate-200">
           
           {/* Header */}
           <div className="flex justify-between items-center mb-6">
              <span className="text-xs font-bold bg-blue-100 text-blue-700 px-3 py-1 rounded-full uppercase">Soal {currentQ + 1} dari {questions.length}</span>
              <span className="text-xs font-bold text-slate-400">User: {student.nama}</span>
           </div>
           
           {/* Intro / Data */}
           <div className="mb-6 bg-slate-50 p-5 rounded-xl border border-slate-200 text-sm">
              <p className="font-medium text-slate-700 mb-3">{questions[currentQ].intro}</p>
              
              {questions[currentQ].type === 'data_analysis' && (
                 <div className="overflow-hidden rounded-lg border border-slate-300">
                    <div className="grid grid-cols-3 bg-slate-200 p-2 text-xs font-bold text-slate-600">
                        <span>Sampel</span><span>Lampu</span><span>Gelembung</span>
                    </div>
                    {questions[currentQ].data.map((d, i) => (
                       <div key={i} className="grid grid-cols-3 p-2 text-xs border-t border-slate-200 bg-white">
                          <span className="font-bold">{d.larutan}</span><span>{d.lampu}</span><span>{d.gelembung}</span>
                       </div>
                    ))}
                 </div>
              )}
           </div>

           {/* Pertanyaan */}
           <h2 className="text-xl font-bold text-slate-900 mb-6 leading-snug">{questions[currentQ].question}</h2>
           
           {/* Pilihan Jawaban */}
           <div className="space-y-3 mb-6">
             {questions[currentQ].options.map((opt, idx) => {
               let btnClass = "border-slate-200 hover:border-blue-400 hover:bg-blue-50 text-slate-700";
               if (selectedOption !== null) {
                 if (idx === questions[currentQ].ans) btnClass = "border-green-500 bg-green-50 text-green-800 font-bold"; 
                 else if (idx === selectedOption) btnClass = "border-red-500 bg-red-50 text-red-800 font-bold";
                 else btnClass = "border-slate-100 text-slate-300 opacity-60";
               }

               return (
                 <button 
                   key={idx} 
                   onClick={() => !selectedOption && handleAnswer(idx)} 
                   disabled={selectedOption !== null}
                   className={`w-full text-left p-4 rounded-xl border-2 transition-all flex justify-between items-center ${btnClass}`}
                 >
                   <span>{opt}</span>
                   {selectedOption !== null && idx === questions[currentQ].ans && <CheckCircle className="w-5 h-5 text-green-600"/>}
                   {selectedOption !== null && idx === selectedOption && idx !== questions[currentQ].ans && <XCircle className="w-5 h-5 text-red-600"/>}
                 </button>
               )
             })}
           </div>

           {/* Feedback & Tombol Next */}
           {selectedOption !== null && (
             <div className="animate-fade-in-up">
               <div className="bg-blue-50 border border-blue-100 p-5 rounded-xl mb-6 flex gap-4">
                  <div className="bg-blue-200 p-2 rounded-full h-fit text-blue-700">
                    <HelpCircle className="w-5 h-5"/>
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-800 text-sm mb-1 uppercase tracking-wide">Pembahasan:</h4>
                    <p className="text-slate-700 text-sm leading-relaxed">
                      {questions[currentQ].explanation}
                    </p>
                  </div>
               </div>

               <button onClick={handleNext} className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-black transition flex items-center justify-center gap-2 shadow-lg">
                 {currentQ < questions.length - 1 ? "Soal Berikutnya" : "Lihat Hasil Akhir"} 
                 <ArrowRight className="w-5 h-5"/>
               </button>
             </div>
           )}
        </div>
      </div>
    );
  }

  /* --- TAMPILAN 3: RESULT --- */
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 text-center font-sans">
       <div className="bg-white p-10 rounded-3xl shadow-xl max-w-lg w-full border border-slate-100">
          
          <div className="inline-block p-6 bg-yellow-50 rounded-full mb-6 animate-bounce">
            <Activity className="w-16 h-16 text-yellow-500"/>
          </div>
          
          <h2 className="text-3xl font-black text-slate-800 mb-2">Evaluasi Selesai!</h2>
          <p className="text-slate-500 mb-8">Terima kasih telah mengerjakan dengan jujur.</p>
          
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 mb-8">
             <p className="text-xs text-slate-400 uppercase font-bold tracking-widest mb-2">Nilai Akhir Siswa</p>
             <div className="text-7xl font-black text-blue-600 tracking-tighter">
                {finalScore}
             </div>
             <div className="mt-4 text-sm font-medium text-slate-600 bg-white inline-block px-4 py-1 rounded-full border border-slate-200 shadow-sm">
                Nama: {student.nama} | Kelas: {student.kelas}
             </div>
          </div>

          <div className="mb-8 min-h-[24px]">
            {isSending ? (
               <span className="text-sm text-blue-500 font-bold flex items-center justify-center gap-2 animate-pulse">
                 <Save className="w-4 h-4"/> Mengirim ke Database Guru...
               </span>
            ) : sendStatus === 'success' ? (
               <span className="text-sm text-green-600 font-bold flex items-center justify-center gap-2">
                 <CheckCircle className="w-4 h-4"/> Data Berhasil Disimpan!
               </span>
            ) : sendStatus === 'error' ? (
               <span className="text-sm text-red-500 font-bold flex items-center justify-center gap-2">
                 <AlertTriangle className="w-4 h-4"/> Gagal Simpan (Cek Internet)
               </span>
            ) : null}
          </div>

          <button 
            onClick={onNext} 
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition shadow-xl hover:shadow-2xl hover:-translate-y-1"
          >
            Lanjut ke Refleksi Diri <ArrowRight className="inline w-5 h-5 ml-1"/>
          </button>
       </div>
       
       <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.4s ease-out forwards; }
      `}</style>
    </div>
  );
}