import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Meals() {
  const navigate = useNavigate();
  const location = useLocation();

  // Safely extract user preferences passed from previous page
  const userPreferences = location.state || {};
  const {
    condition = 'general',
    conditionLabel = 'GENERAL PROTOCOL',
    dietType = 'Balanced/Omnivore',
    allergens = [],
    dislikes = '',
    calories = 2400,
  } = userPreferences;

  const [loading, setLoading] = useState(true);
  const [mealPlan, setMealPlan] = useState(null);
  const [error, setError] = useState(null);

  // Memoize allergens string to prevent infinite loops in useEffect
  const allergensString = Array.isArray(allergens) ? allergens.join(', ') : allergens;

  useEffect(() => {
    async function fetchAiMealPlan() {
      setLoading(true);
      setError(null);

      try {
       const response = await fetch('https://dietai-1.onrender.com/api/generate-plan', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            condition,
            conditionLabel,
            dietType,
            allergens: allergensString,
            dislikes,
            calories,
          }),
        });

        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }

        let rawData = await response.text();
        rawData = rawData.replace(/```json/g, '').replace(/```/g, '').trim();

        let parsedData;
        try {
          parsedData = JSON.parse(rawData);
          if (typeof parsedData === 'string') {
            parsedData = JSON.parse(parsedData);
          }
        } catch (e) {
          console.error("JSON parsing failed. Raw response received:", rawData);
          parsedData = rawData;
        }

        if (parsedData && parsedData.error) {
          setError(parsedData.error);
        } else {
          setMealPlan(parsedData);
        }

      } catch (err) {
        console.error('Failed to fetch meal plan:', err);
        setError(err.message || 'Unable to connect to backend.');
      } finally {
        setLoading(false);
      }
    }

    fetchAiMealPlan();
  }, [calories, condition, conditionLabel, dietType, dislikes, allergensString]);

  const handleMealClick = (meal) => {
    navigate('/recipe-detail', {
      state: {
        mealData: meal,
        conditionLabel: conditionLabel,
        dietType: dietType,
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
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 rounded-lg border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 transition text-xs tracking-wider uppercase font-mono cursor-pointer"
          >
            ↺ Reset Engine
          </button>
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8 max-w-5xl mx-auto w-full">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-24 h-24 rounded-full border-2 border-emerald-500/30 bg-emerald-950/20 flex items-center justify-center shadow-[0_0_50px_rgba(16,185,129,0.2)] mb-6 animate-pulse">
              <span className="text-3xl animate-bounce">⚡</span>
            </div>
            <h2 className="text-xl font-bold tracking-wider text-slate-200 uppercase font-mono">
              Synthesizing Biological Matrix...
            </h2>
            <p className="text-xs text-emerald-400 font-mono mt-2 animate-pulse">
              Requesting live recommendations for: {conditionLabel} ({calories} kcal)
            </p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-12 px-6 bg-[#090d16] border border-red-500/40 rounded-2xl max-w-lg mx-auto text-center font-mono">
            <div className="w-12 h-12 rounded-full bg-red-500/20 border border-red-500/40 text-red-400 flex items-center justify-center text-xl font-bold mb-4">
              ⚠️
            </div>
            <h3 className="text-lg font-bold text-slate-100 mb-2">Backend Connection Error</h3>
            <p className="text-xs text-slate-400 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-5 py-2.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/40 text-xs font-mono uppercase tracking-wider transition cursor-pointer"
            >
              Retry Connection
            </button>
          </div>
        ) : (
          <div className="w-full space-y-8">
            <div className="text-center max-w-2xl mx-auto">
              <button
                onClick={() => navigate(-1)}
                className="text-xs font-mono text-slate-400 hover:text-emerald-400 transition mb-4 inline-block uppercase cursor-pointer"
              >
                ← Adjust Constraints
              </button>
              <div className="mb-2">
                <span className="px-3.5 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase bg-emerald-950/60 text-emerald-400 border border-emerald-500/30">
                  {conditionLabel.toUpperCase()} REGIMEN GENERATED
                </span>
              </div>
              <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-slate-100">
                AI Precision Target Plan
              </h1>
              <p className="text-xs text-slate-400 font-mono mt-2">
                Culinary Type: <span className="text-slate-200">{dietType}</span> • Exclusions:{' '}
                <span className="text-slate-200">{allergensString ? allergensString : 'None'}</span>
                {dislikes && <span> • Avoid: <span className="text-slate-200">{dislikes}</span></span>}
              </p>
            </div>

            {mealPlan && typeof mealPlan === 'object' && (
              <>
                <div className="grid grid-cols-3 gap-4 bg-[#090d16] border border-slate-800/80 rounded-2xl p-4 text-center max-w-2xl mx-auto shadow-xl">
                  <div>
                    <div className="text-[10px] font-mono text-slate-500 uppercase">Target Energy</div>
                    <div className="text-base md:text-lg font-bold text-emerald-400 font-mono">
                      {mealPlan.targetCalories || calories} kcal
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-slate-500 uppercase">Protein Est.</div>
                    <div className="text-base md:text-lg font-bold text-slate-200 font-mono">
                      {mealPlan.macroBreakdown?.protein || 'N/A'}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-slate-500 uppercase">Carb / Fat Est.</div>
                    <div className="text-base md:text-lg font-bold text-slate-200 font-mono">
                      {mealPlan.macroBreakdown?.carbs || 'N/A'} / {mealPlan.macroBreakdown?.fats || 'N/A'}
                    </div>
                  </div>
                </div>

                {Array.isArray(mealPlan.meals) && mealPlan.meals.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {mealPlan.meals.map((meal, index) => (
                      <div
                        key={meal.id || index}
                        onClick={() => handleMealClick(meal)}
                        className="bg-[#090d16] border border-slate-800/80 hover:border-emerald-500/60 rounded-2xl p-6 transition-all duration-300 shadow-xl flex flex-col justify-between cursor-pointer group relative overflow-hidden"
                      >
                        <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity text-emerald-400 font-mono text-xs">
                          View Recipe →
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-3">
                            <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-slate-900 border border-slate-800 text-emerald-400 uppercase">
                              {meal.type}
                            </span>
                            <span className="text-xs font-mono text-slate-500">{meal.calories} kcal</span>
                          </div>
                          <h3 className="text-base font-bold text-slate-100 mb-3 group-hover:text-emerald-400 transition-colors">
                            {meal.title}
                          </h3>
                          <p className="text-xs text-slate-400 mb-3 line-clamp-2">
                            {meal.description}
                          </p>
                          <ul className="space-y-2 text-xs text-slate-400">
                            {meal.items?.map((item, idx) => (
                              <li key={idx} className="flex items-center gap-2">
                                <span className="text-emerald-500">▹</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-800/50 flex justify-between items-center text-[10px] font-mono text-slate-500">
                          <span>Prep Time: {meal.prepTime || 'N/A'}</span>
                          <span className="text-emerald-400/80 group-hover:underline">Click for Procedure</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {typeof mealPlan === 'string' && (
              <div className="bg-[#090d16] border border-slate-800/80 rounded-2xl p-6 text-sm text-slate-300 whitespace-pre-wrap font-mono leading-relaxed shadow-xl">
                {mealPlan}
              </div>
            )}

            <div className="flex justify-center gap-4 pt-4">
              <button
                onClick={() => window.print()}
                className="px-6 py-3 rounded-xl border border-slate-800 bg-slate-900 text-slate-300 hover:text-white hover:border-slate-700 text-xs font-mono uppercase tracking-wider transition cursor-pointer"
              >
                🖨️ Export Regimen
              </button>
              <button
                onClick={() => navigate('/')}
                className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs font-mono uppercase tracking-wider transition shadow-[0_0_20px_rgba(16,185,129,0.3)] cursor-pointer"
              >
                ↺ New Protocol
              </button>
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-slate-900/80 py-4 text-center text-[11px] font-mono text-slate-600">
        © 2026 DietAI • Precision Biological Routing
      </footer>
    </div>
  );
}