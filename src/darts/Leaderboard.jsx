import React, { useState, useEffect } from 'react';
import { getAllPlayersV2, getPlayerRounds } from '../firebase/playerService';
import './Leaderboard.css';

const Leaderboard = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      try {
        const allPlayers = await getAllPlayersV2();
        const leaderboardData = await Promise.all(
          allPlayers.map(async (player) => {
            const rounds = await getPlayerRounds(player.playerId);
            const validRounds = rounds.filter(r => !r.wasCorrected);
            const totalRounds = validRounds.length;
            const totalPoints = validRounds.reduce((sum, r) => sum + (r.totalScore || 0), 0);
            const avgScore = totalRounds > 0 ? totalPoints / totalRounds : 0;
            return {
              ...player,
              gamesPlayed: player.stats?.gamesPlayed || 0,
              wins: player.stats?.wins || 0,
              winRate: player.stats?.gamesPlayed ? (player.stats.wins / player.stats.gamesPlayed) * 100 : 0,
              averageScore: avgScore,
            };
          })
        );
        // Sort by win rate desc, then wins desc
        leaderboardData.sort((a, b) => b.winRate - a.winRate || b.wins - a.wins);
        setPlayers(leaderboardData);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      }
      setLoading(false);
    };
    fetchLeaderboard();
  }, []);

  const calculateWinPercentage = (wins, games) => {
    if (!games || games === 0) return '0%';
    return ((wins / games) * 100).toFixed(1) + '%';
  };


  return (
    <div className="leaderboard-container">
      <div className="leaderboard-header">
        <h1>Leaderboard</h1>
      </div>

      {loading ? (
        <div className="loading">Loading leaderboard...</div>
      ) : (
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Player</th>
              <th>Games</th>
              <th>Wins</th>
              <th>Win %</th>
              <th>AVG Score</th>
              <th>Checkout %</th>
            </tr>
          </thead>
          <tbody>
            {players.length > 0 ? (
              players.map((player, index) => (
                <tr key={player.id}>
                  <td className="rank">{index + 1}</td>
                  <td className="player-name">{player.name || 'Unknown'}</td>
                  <td>{player.gamesPlayed || 0}</td>
                  <td>{player.wins || 0}</td>
                  <td>{calculateWinPercentage(player.wins || 0, player.gamesPlayed || 0)}</td>
                  <td>{(player.averageScore || 0).toFixed(1)}</td>
                  <td>{(player.checkoutPercentage || 0).toFixed(1)}%</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="no-players">No players found. Add some to get started!</td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      <div className="leaderboard-footer">
        <p>Updated: {new Date().toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default Leaderboard;
