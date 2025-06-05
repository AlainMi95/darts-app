import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/config';
import './Players.css';

const Players = () => {
  const [players, setPlayers] = useState([]);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [editingPlayer, setEditingPlayer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    try {
      const playersData = await getAllPlayersV2();
      setPlayers(playersData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching players:', error);
      setLoading(false);
    }
  };

  const handleAddPlayer = async () => {
    const name = newPlayerName.trim();
    if (!name) return;

    try {
      await createPlayerV2({
        name: newPlayerName,
        createdAt: new Date().toISOString(),
        stats: {
          gamesPlayed: 0,
          wins: 0,
          averageScore: 0,
          totalScore: 0,
          totalCheckouts: 0,
          totalCheckoutAttempts: 0,
          checkoutPercentage: 0,
        },
      });
      setNewPlayerName('');
      fetchPlayers();
    } catch (error) {
      console.error('Error adding player:', error);
    }
  };

  const handleRenamePlayer = async (playerId, newName) => {
    const name = newName.trim();
    if (!name) return;

    try {
      const playerRef = doc(db, 'players', playerId);
      await updateDoc(playerRef, { name });
      setEditingPlayer(null);
      fetchPlayers();
    } catch (error) {
      console.error('Error renaming player:', error);
    }
  };

  const handleDeletePlayer = async (playerId) => {
    if (!window.confirm('Delete this player?')) return;

    try {
      await deleteDoc(doc(db, 'players', playerId));
      fetchPlayers();
    } catch (error) {
      console.error('Error deleting player:', error);
    }
  };

  return (
    <div className="players-container">
      <h1 className="players-header">Manage Players</h1>

      <div className="add-player-section">
        <input
          type="text"
          value={newPlayerName}
          onChange={(e) => setNewPlayerName(e.target.value)}
          placeholder="New player name"
          className="player-input"
        />
        <button onClick={handleAddPlayer} className="add-btn">Add</button>
      </div>

      <div className="players-list">
        {players.map((player) => (
          <div key={player.id} className="player-card">
            {editingPlayer?.id === player.id ? (
              <input
                type="text"
                value={editingPlayer.name}
                onChange={(e) => setEditingPlayer({ ...editingPlayer, name: e.target.value })}
                onBlur={() => handleRenamePlayer(player.id, editingPlayer.name)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleRenamePlayer(player.id, editingPlayer.name);
                }}
                autoFocus
                className="player-input"
              />
            ) : (
              <span className="player-name" onClick={() => setEditingPlayer(player)}>
                {player.name}
              </span>
            )}
            <button onClick={() => handleDeletePlayer(player.id)} className="delete-btn">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Players;
