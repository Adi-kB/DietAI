import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const DEFAULT_RECIPE = {
  title: 'Gentle Cocoa Banana Collagen Elixir',
  description: 'Easily absorbable, velvety smoothie formulated to kickstart slow morning appetites.',
  prepTime: '5 mins',
  targetYield: '1 Servings',
  calories: 456,
  glycemicIndex: 'Medium (45)',
  ingredients: [
    { name: 'Premium Collagen powder', amount: '1.5 scoop' },
    { name: 'Unsweetened Almond Milk', amount: '1.3 cup' },
    { name: 'Organic Banana', amount: '1 unit' },
    { name: 'Raw Cacao powder', amount: '1 tbsp' },
    { name: 'MCT Oil or Coconut cream', amount: '1 tbsp' },
  ],
  stages: [
    'Add liquid unsweetened almond milk first into the blender cup.',
    'Incorporate collagen peptides along with the raw organic cacao powder.',
    'Slice the banana to ease motor strain and add the high-grade MCT energy oil.',
    'Blend on high velocity for 45 seconds until perfectly smooth and frothy.',
  ],
};

export default function RecipeDetail() {
  const navigate = useNavigate();
  const location = useLocation();

  // Safely extract payload or fallback to default
  const rawMeal = location.state?.mealData;
  const conditionLabel = location.state?.conditionLabel || 'GENERAL PROTOCOL';
  const dietType = location.state?.dietType || 'BALANCED';

  // Normalize recipe data structure to ensure it matches UI expectations regardless of AI backend variations
  const recipe = rawMeal ? {
    title: rawMeal.title || DEFAULT_RECIPE.title,
    description: rawMeal.description || DEFAULT_RECIPE.description,
    prepTime: rawMeal.prepTime || DEFAULT_RECIPE.prepTime,
    targetYield: rawMeal.targetYield || DEFAULT_RECIPE.targetYield,
    calories: rawMeal.calories || DEFAULT_RECIPE.calories,
    glycemicIndex: rawMeal.glycemicIndex || DEFAULT_RECIPE.glycemicIndex,
    // Handle ingredients or fallback to parsing `items` array if backend didn't format structured ingredients
    ingredients: Array.isArray(rawMeal.ingredients) 
      ? rawMeal.ingredients 
      : (Array.isArray(rawMeal.items) 
          ? rawMeal.items.map(item => ({ name: item, amount: 'As needed' })) 
          : DEFAULT_RECIPE.ingredients),
    // Handle steps/stages or fallback
    stages: Array.isArray(rawMeal.stages) 
      ? rawMeal.stages 
      : (Array.isArray(rawMeal.instructions) ? rawMeal.instructions : DEFAULT_RECIPE.stages)
  } : DEFAULT_RECIPE;

  const [servingMultiplier, setServingMultiplier] = useState(1);
  const [completedStages, setCompletedStages] = useState([]);

  const toggleStage = (index) => {
    if (completedStages.includes(index)) {
      setCompletedStages(completedStages.filter((s) => s !== index));
    } else {
      setCompletedStages([...completedStages, index]);
    }
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
            ↺ RESET ENGINE
          </button>
        </nav>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-6">
        <div className="bg-[#080c14] border border-slate-800/80 rounded-3xl p-6 md:p-10 shadow-2xl">
          
          {/* Back Action */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-xs font-mono tracking-wider text-slate-400 hover:text-white transition uppercase mb-8 cursor-pointer"
          >
            ← RETURN TO GRID
          </button>

          {/* Hero Section */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-10">
            <div className="md:col-span-4 aspect-square bg-[#0c121e] border border-slate-800 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden group">
              <div className="text-emerald-400 text-5xl mb-2 group-hover:scale-110 transition duration-300">
                🍴
              </div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-emerald-500/70 border border-emerald-500/20 px-3 py-1 rounded-full bg-emerald-950/20">
                PREMIUM FORMULA
              </span>
            </div>

            <div className="md:col-span-8 flex flex-col justify-between h-full">
              <div>
                <div className="flex gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase bg-rose-950/50 text-rose-400 border border-rose-500/30">
                    {conditionLabel}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase bg-emerald-950/50 text-emerald-400 border border-emerald-500/30">
                    {dietType}
                  </span>
                </div>

                <h1 className="text-2xl md:text-4xl font-extrabold text-white mb-3">
                  {recipe.title}
                </h1>
                <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                  {recipe.description}
                </p>
              </div>

              {/* Stat Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-[#0b101b] border border-slate-800/80 rounded-xl p-3">
                  <div className="text-[9px] font-mono uppercase text-slate-500">PREP/COOK</div>
                  <div className="text-sm font-bold text-slate-200">{recipe.prepTime}</div>
                </div>

                <div className="bg-[#0b101b] border border-slate-800/80 rounded-xl p-3">
                  <div className="text-[9px] font-mono uppercase text-slate-500">TARGET YIELD</div>
                  <div className="text-sm font-bold text-slate-200">{recipe.targetYield}</div>
                </div>

                <div className="bg-[#0b101b] border border-slate-800/80 rounded-xl p-3">
                  <div className="text-[9px] font-mono uppercase text-slate-500">CALORIES / SERVING</div>
                  <div className="text-sm font-bold text-slate-200">{recipe.calories} kcal</div>
                </div>

                <div className="bg-[#0b101b] border border-slate-800/80 rounded-xl p-3">
                  <div className="text-[9px] font-mono uppercase text-slate-500">GI / LOAD INDEX</div>
                  <div className="text-sm font-bold text-emerald-400">{recipe.glycemicIndex}</div>
                </div>
              </div>
            </div>
          </div>

          <hr className="border-slate-800/80 mb-10" />

          {/* Main Content Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Ingredients Column */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2 font-bold text-slate-200 text-sm uppercase tracking-wider">
                  <span>🛍️</span> CORE INGREDIENTS
                </div>
                
                <div className="flex items-center border border-slate-800 bg-[#0b101b] rounded-lg p-1 text-xs font-mono">
                  <button 
                    onClick={() => setServingMultiplier(Math.max(1, servingMultiplier - 1))}
                    className="w-6 h-6 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 rounded transition"
                  >
                    -
                  </button>
                  <span className="px-2 font-bold text-emerald-400">{servingMultiplier}x</span>
                  <button 
                    onClick={() => setServingMultiplier(servingMultiplier + 1)}
                    className="w-6 h-6 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 rounded transition"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {recipe.ingredients?.map((ing, idx) => (
                  <div key={idx} className="flex justify-between items-center py-2 border-b border-slate-800/50 text-xs">
                    <span className="text-slate-300 font-medium">{ing.name || ing}</span>
                    <span className="font-mono text-emerald-400 font-bold">
                      {ing.amount || ''}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stages Column */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2 font-bold text-slate-200 text-sm uppercase tracking-wider mb-4">
                <span>🥣</span> COOKING ALGORITHMS & STAGES
              </div>

              <div className="space-y-4">
                {recipe.stages?.map((stageText, idx) => {
                  const isDone = completedStages.includes(idx);
                  return (
                    <div
                      key={idx}
                      onClick={() => toggleStage(idx)}
                      className={`p-5 rounded-2xl border transition-all cursor-pointer flex gap-4 items-start ${
                        isDone
                          ? 'bg-emerald-950/10 border-emerald-500/40 opacity-70'
                          : 'bg-[#0b101b] border-slate-800/80 hover:border-slate-700'
                      }`}
                    >
                      <button className={`w-5 h-5 rounded border flex items-center justify-center mt-0.5 text-xs font-bold transition ${
                        isDone ? 'bg-emerald-500 border-emerald-400 text-black' : 'border-slate-700 bg-slate-900'
                      }`}>
                        {isDone ? '✓' : ''}
                      </button>
                      <div>
                        <div className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 mb-1 font-semibold">
                          STAGE {idx + 1}
                        </div>
                        <p className={`text-xs md:text-sm leading-relaxed ${isDone ? 'line-through text-slate-500' : 'text-slate-300'}`}>
                          {stageText}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </main>

      <footer className="border-t border-slate-900/80 py-4 text-center text-[11px] font-mono text-slate-600 mt-8">
        © 2026 DietAI • Precision Biological Routing
      </footer>
    </div>
  );
}