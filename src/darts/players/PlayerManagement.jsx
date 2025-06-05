import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { getPlayers, updatePlayer, addPlayer } from '../../services/firebaseService';

const PlayerManagement = ({ onPlayerSelect, onPlayersUpdate }) => {
  const [localPlayers, setLocalPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch players on mount
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const fetchedPlayers = await getPlayers();
        setLocalPlayers(fetchedPlayers);
        if (onPlayersUpdate) {
          onPlayersUpdate(fetchedPlayers);
        };
        // Select first player by default
        if (fetchedPlayers.length > 0) {
          setSelectedPlayer(fetchedPlayers[0]);
          onPlayerSelect(fetchedPlayers[0]);
        }
      } catch (err) {
        setError('Failed to fetch players');
        console.error('Error fetching players:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, [onPlayerSelect]);

  // Add new player
  const handleAddPlayer = async (e) => {
    e.preventDefault();
    if (!newPlayerName.trim()) {
      setError('Please enter a player name');
      return;
    }

    setLoading(true);
    setError('');
    try {
      await addPlayer({
        name: newPlayerName.trim(),
        createdAt: new Date(),
        games: 0,
        wins: 0,
        averageScore: 0,
        checkoutPercentage: 0
      });
      setNewPlayerName('');
      const updatedPlayers = await getPlayers();
      setLocalPlayers(updatedPlayers);
      if (onPlayersUpdate) {
        onPlayersUpdate(updatedPlayers);
      };
    } catch (err) {
      setError('Failed to add player');
      console.error('Error adding player:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="player-management">
      <h2>Player Management</h2>
      <form onSubmit={handleAddPlayer} className="settings">
        <div>
          <label htmlFor="newPlayer">Add Player:</label>
          <input
            type="text"
            id="newPlayer"
            value={newPlayerName}
            onChange={(e) => setNewPlayerName(e.target.value)}
            placeholder="Enter player name"
            disabled={loading}
          />
        </div>
        <button
          type="submit"
          disabled={loading || !newPlayerName.trim()}
        >
          {loading ? 'Adding...' : 'Add Player'}
        </button>
        {error && <div className="error-message">{error}</div>}
      </form>

      <div className="player-selector">
        <label htmlFor="playerSelect">Select Player:</label>
        <select
  id="playerSelect"
  value={selectedPlayer?.id || ''}
  onChange={(e) => {
    const selected = localPlayers.find(p => p.id === e.target.value);
    setSelectedPlayer(selected);
    onPlayerSelect(selected);
  }}
  disabled={loading || localPlayers.length === 0}
>
  <option value="">Select a player</option>
  {localPlayers.map(player => (
    <option key={player.id} value={player.id}>
      {player.name}
    </option>
  ))}
</select>
      </div>
    </div>
  );
};

export default PlayerManagement;
