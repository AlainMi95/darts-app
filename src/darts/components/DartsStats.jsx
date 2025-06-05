import React, { useState, useEffect } from 'react';
import './DartsStats.css';
import { getPlayers, getLeaderboard } from '../../services/firebaseService';

const DartsStats = () => {
  const [stats, setStats] = useState({
    players: [],
    leaderboard: []
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      // Load players from Firebase
      const players = await getPlayers();
      
      // Process players for display
      const processedStats = {
        players: players,
        leaderboard: [...players]
          .sort((a, b) => b.averageScore - a.averageScore)
      };

      setStats(processedStats);
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  return (
    <div className="stats-container" style={{ maxWidth: 430, width: '100%', minWidth: 0, margin: '0 auto', padding: '12px 8px', boxSizing: 'border-box' }}>
      <div className="stats-section">
        <h2 style={{ fontSize: 22, margin: '10px 0 14px 0', textAlign: 'center', fontWeight: 700 }}>Leaderboard</h2>
        <div className="leaderboard" style={{ overflowX: 'auto', width: '100%' }}>
          <div className="leaderboard-header" style={{ display: 'flex', fontSize: 15, fontWeight: 700, background: '#23272f', color: '#7cfcab', borderRadius: 8, padding: '10px 0', marginBottom: 4 }}>
            <div className="leaderboard-cell" style={{ flex: '0 0 48px', textAlign: 'center' }}>Rank</div>
            <div className="leaderboard-cell" style={{ flex: '1 1 90px', minWidth: 70 }}>Player</div>
            <div className="leaderboard-cell" style={{ flex: '0 0 60px', textAlign: 'center' }}>Games</div>
            <div className="leaderboard-cell" style={{ flex: '0 0 60px', textAlign: 'center' }}>Wins</div>
            <div className="leaderboard-cell" style={{ flex: '0 0 70px', textAlign: 'center' }}>Avg</div>
            <div className="leaderboard-cell" style={{ flex: '0 0 80px', textAlign: 'center' }}>Checkout %</div>
          </div>
          {stats.leaderboard.map((player, index) => (
            <div key={player.name} style={{ marginBottom: 6 }}>
              <div className="leaderboard-item" style={{ display: 'flex', fontSize: 15, background: index % 2 === 0 ? '#181a1f' : '#23272f', color: '#fff', borderRadius: 8, marginBottom: 0, padding: '10px 0', alignItems: 'center' }}>
                <div className="leaderboard-cell" style={{ flex: '0 0 48px', textAlign: 'center', fontWeight: 600 }}>{index + 1}</div>
                <div className="leaderboard-cell" style={{ flex: '1 1 90px', minWidth: 70, fontWeight: 600 }}>{player.name}</div>
                <div className="leaderboard-cell" style={{ flex: '0 0 60px', textAlign: 'center' }}>{player.games}</div>
                <div className="leaderboard-cell" style={{ flex: '0 0 60px', textAlign: 'center' }}>{player.wins}</div>
                <div className="leaderboard-cell" style={{ flex: '0 0 70px', textAlign: 'center' }}>{player.averageScore.toFixed(1)}</div>
                <div className="leaderboard-cell" style={{ flex: '0 0 80px', textAlign: 'center' }}>{player.checkoutPercentage?.toFixed(1)}%</div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DartsStats;
