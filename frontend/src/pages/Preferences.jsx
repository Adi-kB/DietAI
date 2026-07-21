import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const CULINARY_OPTIONS = ['Balanced/Omnivore', 'Strict Vegan', 'Vegetarian', 'Low Carb / Paleo'];

const ALLERGEN_OPTIONS = ['Tree Nuts', 'Gluten / Wheat', 'Lactose / Dairy'];

export default function Preferences() {
  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve selected condition from state or default
  const selectedConditionLabel = location.state?.conditionLabel || 'GENERAL PROTOCOL';

  const [dietType, setDietType] = useState('Balanced/Omnivore');
  const [selectedAllergens, setSelectedAllergens] = useState([]);
  const [dislikes, setDislikes] = useState('');
  const [calories, setCalories] = useState(2400);

  const toggleAllergen = (item) => {
    if (selectedAllergens.includes(item)) {
      setSelectedAllergens(selectedAllergens.filter((a) => a !== item));
    } else {
      setSelectedAllergens([...selectedAllergens, item]);
    }
  };

  const handleGenerate = () => {
    // Navigates to '/meals' to match your App.jsx router configuration
    navigate('/meals', {
      state: {
        condition: location.state?.condition || 'general',
        conditionLabel: selectedConditionLabel,
        dietType,
        allergens: selectedAllergens,
        dislikes,
        calories,
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#05070e] text-white flex flex-col justify-between selection:bg-emerald-500 selection:text-black font-sans">
      {/* Top Navbar */}
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
          <button onClick={() => navigate('/')} className="hover:text-emerald-400 transition cursor-pointer hidden md:block">
            Home Portal
          </button>
          <button className="hover:text-emerald-400 transition cursor-pointer hidden md:block">Physiological Guide</button>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 rounded-lg border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 transition text-xs tracking-wider uppercase font-mono cursor-pointer"
          >
            ↺ Reset Engine
          </button>
        </nav>
      </header>

      {/* Main Constraints Form Container */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-2xl bg-[#090d16] border border-slate-800/80 rounded-3xl p-6 md:p-10 shadow-2xl relative">
          
          {/* Header Controls */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-xs font-mono tracking-wider text-slate-400 hover:text-white transition uppercase cursor-pointer"
            >
              ← Back
            </button>
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-emerald-400">
              🎙️
            </div>
          </div>

          {/* Title Header */}
          <div className="text-center mb-8">
            <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase bg-emerald-950/60 text-emerald-400 border border-emerald-500/30">
              {selectedConditionLabel.toUpperCase()} PROTOCOL
            </span>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-100 mt-3 mb-2">
              Physiological Constraints
            </h2>
            <p className="text-xs md:text-sm text-slate-400 max-w-md mx-auto">
              Configure systemic filters, dynamic food exclusions, and lifestyle parameters.
            </p>
          </div>

          <div className="space-y-6 text-left">
            {/* Primary Culinary Preference */}
            <div>
              <label className="block text-xs font-mono tracking-wider text-slate-300 uppercase mb-3">
                Primary Culinary Preference
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {CULINARY_OPTIONS.map((option) => {
                  const isSelected = dietType === option;
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setDietType(option)}
                      className={`px-3 py-3 rounded-xl border text-xs font-semibold transition text-center cursor-pointer ${
                        isSelected
                          ? 'border-emerald-500 bg-emerald-950/30 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                          : 'border-slate-800/80 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Allergies & Immune Reactivities */}
            <div>
              <label className="block text-xs font-mono tracking-wider text-slate-300 uppercase mb-3">
                Allergies & Immune Reactivities
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {ALLERGEN_OPTIONS.map((allergen) => {
                  const isChecked = selectedAllergens.includes(allergen);
                  return (
                    <button
                      key={allergen}
                      type="button"
                      onClick={() => toggleAllergen(allergen)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-xs font-medium transition cursor-pointer text-left ${
                        isChecked
                          ? 'border-emerald-500 bg-emerald-950/30 text-emerald-300'
                          : 'border-slate-800/80 bg-slate-900/60 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded border flex items-center justify-center ${isChecked ? 'bg-emerald-500 border-emerald-400 text-black font-bold text-[10px]' : 'border-slate-700 bg-slate-950'}`}>
                        {isChecked && '✓'}
                      </div>
                      <span>{allergen}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Prohibited Ingredients & Dislikes */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-mono tracking-wider text-slate-300 uppercase">
                  Prohibited Ingredients & Dislikes
                </label>
                <span className="text-[10px] font-mono text-slate-500">Separated by commas</span>
              </div>
              <div className="relative">
                <span className="absolute left-4 top-3.5 text-slate-500 text-sm">🚫</span>
                <input
                  type="text"
                  value={dislikes}
                  onChange={(e) => setDislikes(e.target.value)}
                  placeholder="e.g., cilantro, mushrooms, sugar, pork..."
                  className="w-full bg-slate-950/80 border border-slate-800/80 rounded-xl pl-11 pr-4 py-3 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
                />
              </div>
            </div>

            {/* Energy Target Matrix */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="block text-xs font-mono tracking-wider text-slate-300 uppercase">
                  Energy Target Matrix
                </label>
                <span className="text-emerald-400 font-mono font-bold text-sm">{calories} kcal</span>
              </div>
              <input
                type="range"
                min="1200"
                max="4000"
                step="50"
                value={calories}
                onChange={(e) => setCalories(Number(e.target.value))}
                className="w-full h-2 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
            </div>

            {/* Initialize Button */}
            <button
              onClick={handleGenerate}
              className="w-full mt-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-4 rounded-xl transition-all duration-300 tracking-wider text-xs uppercase flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(16,185,129,0.3)] hover:shadow-[0_0_35px_rgba(16,185,129,0.5)] cursor-pointer"
            >
              <span>⚡</span> INITIALIZE AI MEAL GENERATION
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900/80 py-4 text-center text-[11px] font-mono text-slate-600">
        © 2026 DietAI. Empowering human physiology through computational wellness algorithms.
        <div className="mt-1 text-slate-700">Precision. Hydration. Homeostasis. Integrity.</div>
      </footer>
    </div>
  );
}