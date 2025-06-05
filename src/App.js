import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DartsApp from './darts/DartsApp';
import AdvancedLeaderboard from './darts/components/AdvancedLeaderboard';
import DartsStats from './darts/components/DartsStats';
import ProtectedStats from './darts/components/ProtectedStats';

const App = () => (
  <Routes>
    <Route path="/" element={<DartsApp />} />
    <Route path="/leaderboard" element={<AdvancedLeaderboard />} />
    <Route path="/stats" element={<DartsStats />} />
    <Route path="/protected-stats" element={<ProtectedStats />} />
  </Routes>
);

export default App;
