import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Preferences from './pages/Preferences';
import Meals from './pages/Meals';
import RecipeDetail from './pages/RecipeDetail';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen text-slate-900 bg-[#05070e]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/preferences" element={<Preferences />} />
          <Route path="/meals" element={<Meals />} />
          <Route path="/recipe-detail" element={<RecipeDetail />} />
          {/* Catch-all route to handle bad URLs */}
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}