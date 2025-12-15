import React, { useState } from 'react';
import { Zap, ChevronRight, Sparkles, Lock, X, RefreshCw, Trash2, CheckCircle, AlertCircle } from 'lucide-react';

export default function Modul1({ onNext }) {
  // --- STATE ---
  const [isHovered, setIsHovered] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [studentData, setStudentData] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false); // Status loading saat hapus

  // --- KONFIGURASI ---
  const TEACHER_PASSWORD = "bismillah"; 
  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzYLH-DhQncDHDstXFjRSGkuO2QypSR8tNDWQYcH-tL8wkfe1NpTvitcQ8V-nsuZSIS/exec";
  const KKM = 75; // Batas Nilai Lulus

  const handleStartLearning = () => {
    setShowAnimation(true);
    setTimeout(() => {
      onNext(); 
    }, 600);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === TEACHER_PASSWORD) {
      setIsLoggedIn(true);
      fetchData(); 
    } else {
      alert("Password Salah! Coba lagi.");
    }
  };

  const fetchData = async () => {
    setLoadingData(true);
    try {
      const response = await fetch(SCRIPT_URL);
      const data = await response.json();
      setStudentData(data);
    } catch (error) {
      alert("Gagal mengambil data. Pastikan internet lancar.");
    }
    setLoadingData(false);
  };

  // FUNGSI HAPUS DATA
  const handleDelete = async (rowIndex) => {
    if (!confirm("Yakin ingin menghapus data siswa ini? Data di Google Sheet akan hilang permanen.")) return;

    setIsDeleting(true);
    const formData = new FormData();
    formData.append('action', 'delete'); // Beritahu script untuk menghapus
    formData.append('row', rowIndex);    // Kirim nomor baris (index array)

    try {
      await fetch(SCRIPT_URL, { method: 'POST', body: formData });
      // Setelah berhasil di server, hapus juga di tampilan lokal biar cepat
      const newData = studentData.filter((_, index) => index !== rowIndex);
      setStudentData(newData);
      alert("Data berhasil dihapus.");
    } catch (error) {
      alert("Gagal menghapus data.");
    }
    setIsDeleting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 font-sans relative overflow-hidden flex flex-col justify-between">
      
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      {/* TOMBOL DASHBOARD GURU */}
      <button 
        onClick={() => setShowDashboard(true)}
        className="absolute top-6 right-6 z-30 flex items-center gap-2 px-5 py-3 bg-slate-800 text-white rounded-full font-bold shadow-lg hover:bg-slate-900 hover:scale-105 transition-all duration-300 ring-4 ring-white/50"
        title="Login Dashboard Guru"
      >
        <Lock className="w-5 h-5 text-yellow-400"/>
        <span className="text-sm tracking-wide">Guru</span>
      </button>

      {/* KONTEN UTAMA */}
      <div className="container mx-auto px-4 py-8 relative z-10 flex-1 flex flex-col">
        <header className="flex justify-between items-center mb-8 md:mb-12">
          <div className="flex items-center gap-2 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full shadow-sm border border-slate-200">
            <div className="bg-blue-600 p-1.5 rounded-full">
              <Zap className="w-4 h-4 text-white" fill="currentColor" />
            </div>
            <span className="font-bold text-slate-700 text-sm tracking-wide">ElektroLIT</span>
          </div>
        </header>

        <div className="max-w-4xl mx-auto text-center mt-4 md:mt-12 mb-16 flex-1 flex flex-col justify-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-bold mb-8 animate-bounce">
              <Sparkles className="w-4 h-4" />
              <span>Selamat Datang di Laboratorium Virtual</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
              Jelajahi Dunia <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                Larutan Elektrolit
              </span>
            </h1>
            
            <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Temukan rahasia bagaimana larutan dapat menghantarkan listrik.
            </p>

            <div className="text-center pb-10">
              <button
                onClick={handleStartLearning}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <span className="relative tracking-wide">Mulai Pembelajaran</span>
                <ChevronRight className={`relative w-6 h-6 transition-transform duration-300 ${isHovered ? 'translate-x-2' : ''}`} strokeWidth={3} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 w-full text-center pb-6">
        <p className="text-slate-400 text-sm font-medium tracking-wide">
          © Pembelajaran Kimia Interaktif 2025
        </p>
      </div>

      {/* --- MODAL DASHBOARD GURU (UPDATED) --- */}
      {showDashboard && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden animate-fade-in-up">
            
            {/* Header Modal */}
            <div className="bg-slate-900 p-5 flex justify-between items-center text-white border-b border-slate-800">
              <h3 className="font-bold flex items-center gap-2 text-lg tracking-wide">
                <Lock className="w-5 h-5 text-blue-400"/> Dashboard Guru
              </h3>
              <button onClick={() => setShowDashboard(false)} className="hover:bg-slate-700 p-2 rounded-full transition-colors"><X className="w-5 h-5"/></button>
            </div>

            <div className="p-8">
              {!isLoggedIn ? (
                /* FORM LOGIN */
                <form onSubmit={handleLogin} className="flex flex-col gap-5 max-w-md mx-auto py-10">
                  <div className="text-center mb-2">
                    <p className="text-slate-800 font-bold text-lg">Akses Terbatas</p>
                    <p className="text-slate-500 text-sm">Silakan masukkan kode akses pengajar.</p>
                  </div>
                  
                  <div className="relative">
                    <input 
                      type="password" 
                      placeholder="Kode Akses"
                      className="p-4 pl-12 border border-slate-300 rounded-xl w-full focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all outline-none text-slate-800 font-medium"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                    />
                    <Lock className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2"/>
                  </div>
                  
                  <button type="submit" className="bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-black transition-all shadow-lg hover:shadow-xl">
                    Buka Data Nilai
                  </button>
                </form>
              ) : (
                /* TABEL DATA SISWA + HAPUS + STATUS */
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <div>
                       <h4 className="font-bold text-xl text-slate-800">Rekap Nilai Siswa</h4>
                       <p className="text-xs text-slate-500">KKM: {KKM} | Total Siswa: {studentData.length}</p>
                    </div>
                    <button 
                      onClick={fetchData} 
                      disabled={isDeleting}
                      className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-blue-100 transition"
                    >
                      <RefreshCw className={`w-4 h-4 ${loadingData ? 'animate-spin' : ''}`}/> Refresh
                    </button>
                  </div>
                  
                  {loadingData ? (
                    <div className="py-12 text-center text-slate-500 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                       <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-blue-500"/>
                       <p className="text-sm">Sedang menyinkronkan data...</p>
                    </div>
                  ) : (
                    <div className="overflow-hidden border border-slate-200 rounded-xl shadow-sm">
                      <div className="overflow-y-auto max-h-[400px]">
                        <table className="w-full text-sm text-left">
                          <thead className="bg-slate-100 text-slate-600 font-bold sticky top-0 z-10 shadow-sm">
                            <tr>
                              <th className="p-4 w-32">Tanggal</th>
                              <th className="p-4">Nama Siswa</th>
                              <th className="p-4">Kelas</th>
                              <th className="p-4 w-24 text-center">Nilai</th>
                              <th className="p-4 w-32 text-center">Status</th>
                              <th className="p-4 w-20 text-center">Aksi</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 bg-white">
                            {studentData.length > 0 ? (
                              studentData.map((row, idx) => {
                                const nilai = row[3];
                                const isLulus = nilai >= KKM;
                                
                                return (
                                  <tr key={idx} className="hover:bg-blue-50/50 transition-colors group">
                                    <td className="p-4 text-xs text-slate-400 font-mono">
                                      {row[0] ? new Date(row[0]).toLocaleDateString('id-ID', {day: 'numeric', month: 'short', hour: '2-digit', minute:'2-digit'}) : '-'}
                                    </td>
                                    <td className="p-4 font-bold text-slate-700">{row[1]}</td>
                                    <td className="p-4 text-slate-600">
                                      <span className="bg-slate-100 px-2 py-1 rounded text-xs font-bold border border-slate-200">{row[2]}</span>
                                    </td>
                                    <td className="p-4 text-center">
                                      <span className={`font-black text-lg ${isLulus ? 'text-green-600' : 'text-red-500'}`}>
                                        {nilai}
                                      </span>
                                    </td>
                                    {/* Kolom Status Lulus/Tidak */}
                                    <td className="p-4 text-center">
                                      {isLulus ? (
                                        <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold border border-green-200">
                                          <CheckCircle className="w-3 h-3"/> Lulus
                                        </div>
                                      ) : (
                                        <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold border border-red-200">
                                          <AlertCircle className="w-3 h-3"/> Remedial
                                        </div>
                                      )}
                                    </td>
                                    {/* Kolom Hapus */}
                                    <td className="p-4 text-center">
                                      <button 
                                        onClick={() => handleDelete(idx)}
                                        disabled={isDeleting}
                                        className="p-2 bg-slate-100 text-slate-400 rounded-lg hover:bg-red-100 hover:text-red-600 transition-colors disabled:opacity-50"
                                        title="Hapus Data"
                                      >
                                        <Trash2 className="w-4 h-4"/>
                                      </button>
                                    </td>
                                  </tr>
                                );
                              })
                            ) : (
                              <tr><td colSpan="6" className="p-12 text-center text-slate-400 italic">Belum ada data siswa yang masuk.</td></tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-4 text-center">
                    <button onClick={() => setIsLoggedIn(false)} className="text-xs text-red-500 font-bold hover:underline">Keluar Dashboard</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
}