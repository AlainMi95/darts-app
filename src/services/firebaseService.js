import { createPlayerV2, updatePlayerStatsV2, getAllPlayersV2 } from '../firebase/playerService';

export const addPlayer = async (playerData) => {
  try {
    await createPlayerV2({
      ...playerData,
      createdAt: new Date()
    });
  } catch (error) {
    console.error('Error adding player:', error);
    throw error;
  }
};

export const updatePlayer = async (playerData) => {
  try {
    await updatePlayerStatsV2({
      ...playerData,
      updatedAt: new Date()
    });
  } catch (error) {
    console.error('Error updating player:', error);
    throw error;
  }
};

// Fetch all players from players_v2
export const getPlayers = async () => {
  try {
    return await getAllPlayersV2();
  } catch (error) {
    console.error('Error fetching players:', error);
    throw error;
  }
};
