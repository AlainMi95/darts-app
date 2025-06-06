import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DartsApp from './darts/DartsApp';
import AdvancedLeaderboard from './darts/components/AdvancedLeaderboard';
import DartsStats from './darts/components/DartsStats';
import ProtectedStats from './darts/components/ProtectedStats';
import ProtectedRoute from './darts/ProtectedRoute';
import Login from './darts/Login';

const App = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/" element={
      <ProtectedRoute>
        <DartsApp />
      </ProtectedRoute>
    } />
    <Route path="/leaderboard" element={
      <ProtectedRoute>
        <AdvancedLeaderboard />
      </ProtectedRoute>
    } />
    <Route path="/stats" element={
      <ProtectedRoute>
        <DartsStats />
      </ProtectedRoute>
    } />
    <Route path="/protected-stats" element={
      <ProtectedRoute>
        <ProtectedStats />
      </ProtectedRoute>
    } />
  </Routes>
);

export default App;
