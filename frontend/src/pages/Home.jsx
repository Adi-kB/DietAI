import React from 'react';
import { useNavigate } from 'react-router-dom';

const CONDITIONS = [
  { id: 'anorexia', label: 'Anorexia Recovery', subtitle: 'Gentle Nutrient Density', icon: '🧰' },
  { id: 'high_bp', label: 'High Blood Press.', subtitle: 'DASH Align / Cardio-Safe', icon: '💙' },
  { id: 'bulimia', label: 'Bulimia Support', subtitle: 'Digestive Harmony', icon: '🪴' },
  { id: 'type2_diabetic', label: 'Type 2 Diabetic', subtitle: 'Insulin Sensitizing', icon: '🔬' },
  { id: 'low_bp', label: 'Low Blood Press.', subtitle: 'Sodium & Mineral Support', icon: '💜' },
  { id: 'binge_eating', label: 'Binge Eating Reg.', subtitle: 'High Satiety, Stable GI', icon: '🍴' },
  { id: 'general', label: 'Optimal Healthy', subtitle: 'Performance & Longevity', icon: '⚡' },
  { id: 'type1_diabetic', label: 'Type 1 Diabetic', subtitle: 'Meticulous Carb Ratio', icon: '🧪' },
];

export default function Home() {
  const navigate = useNavigate();

  const handleSelectCondition = (condition) => {
    navigate('/preferences', {
      state: { condition: condition.id, conditionLabel: condition.label },
    });
  };

  const topRow = CONDITIONS.slice(0, 3);
  const sideRowLeft = CONDITIONS.slice(3, 4);
  const sideRowRight = CONDITIONS.slice(4, 5);
  const bottomRow = CONDITIONS.slice(5, 8);

  return (
    <div className="min-h-screen bg-[#05070e] text-white flex flex-col justify-between selection:bg-emerald-500 selection:text-black font-sans">
      {/* Navbar */}
      <header className="flex justify-between items-center px-6 md:px-12 py-6 max-w-7xl w-full mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold text-xl shadow-[0_0_15px_rgba(16,185,129,0.3)]">
            ⚡
          </div>
          <div>
            <div className="font-extrabold tracking-wider text-base uppercase text-slate-100">
              Diet<span className="text-emerald-400">AI</span>
            </div>
            <div className="text-[10px] tracking-widest text-slate-500 uppercase font-mono">
              AI-Engineered Physiologies
            </div>
          </div>
        </div>

        <nav className="flex items-center gap-6 text-sm text-slate-400 font-medium">
          <button className="hover:text-emerald-400 transition cursor-pointer hidden md:block">Home Portal</button>
          <button className="hover:text-emerald-400 transition cursor-pointer hidden md:block">Physiological Guide</button>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 rounded-lg border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 transition text-xs tracking-wider uppercase font-mono cursor-pointer"
          >
            ↺ Reset Engine
          </button>
        </nav>
      </header>

      {/* Main Hero & Nodes Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 max-w-6xl mx-auto w-full py-6">
        
        {/* Title Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="px-3.5 py-1 rounded-full text-[11px] font-mono tracking-widest uppercase bg-emerald-950/60 text-emerald-400 border border-emerald-500/30">
            QUANTUM HEALTH INTELLIGENCE
          </span>
          <h1 className="text-3xl md:text-5xl font-serif tracking-tight mt-4 mb-3 text-slate-100">
            Custom Plates Tailored for{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent italic font-normal">
              Your Unique Biology
            </span>
          </h1>
          <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Select a dynamic physiological profile or pathological state to configure target macro-matrix and custom wellness paths.
          </p>
        </div>

        {/* Central Orbital Hub Container */}
        <div className="w-full max-w-4xl flex flex-col items-center gap-6 my-2">
          
          {/* Top Row Cards */}
          <div className="flex flex-wrap justify-center gap-4 w-full">
            {topRow.map((cond) => (
              <ConditionCard key={cond.id} cond={cond} onClick={() => handleSelectCondition(cond)} />
            ))}
          </div>

          {/* Middle Row with Engine Core */}
          <div className="flex flex-wrap items-center justify-center gap-6 w-full my-2">
            {sideRowLeft.map((cond) => (
              <ConditionCard key={cond.id} cond={cond} onClick={() => handleSelectCondition(cond)} />
            ))}

            {/* Central Glowing Core */}
            <div className="flex flex-col items-center justify-center mx-4 my-2">
              <div className="w-28 h-28 rounded-full border border-emerald-500/30 bg-emerald-950/20 backdrop-blur-md flex items-center justify-center shadow-[0_0_40px_rgba(16,185,129,0.2)]">
                <div className="w-20 h-20 rounded-full border border-emerald-400/50 flex items-center justify-center animate-pulse">
                  <span className="text-2xl">👆</span>
                </div>
              </div>
              <span className="mt-3 text-[10px] font-mono tracking-widest text-emerald-400 uppercase font-bold">
                ENGINE READY
              </span>
            </div>

            {sideRowRight.map((cond) => (
              <ConditionCard key={cond.id} cond={cond} onClick={() => handleSelectCondition(cond)} />
            ))}
          </div>

          {/* Bottom Row Cards */}
          <div className="flex flex-wrap justify-center gap-4 w-full">
            {bottomRow.map((cond) => (
              <ConditionCard key={cond.id} cond={cond} onClick={() => handleSelectCondition(cond)} />
            ))}
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-4 text-center text-xs font-mono text-slate-600">
        DietAI Physiology Engine • Powered by Groq AI backend
      </footer>
    </div>
  );
}

function ConditionCard({ cond, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 bg-[#0d121f] hover:bg-[#141c2e] border border-slate-800 hover:border-emerald-500/50 px-4 py-3 rounded-2xl transition-all duration-300 text-left group shadow-lg hover:shadow-[0_0_20px_rgba(16,185,129,0.2)] cursor-pointer w-64"
    >
      <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-lg shrink-0 group-hover:scale-110 transition">
        {cond.icon}
      </div>
      <div className="overflow-hidden">
        <h3 className="text-sm font-bold text-slate-200 group-hover:text-emerald-400 transition truncate">
          {cond.label}
        </h3>
        <p className="text-[11px] text-slate-500 font-mono mt-0.5 truncate">{cond.subtitle}</p>
      </div>
    </button>
  );
}