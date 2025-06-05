import { collection, doc, getDoc, getDocs, addDoc, updateDoc } from 'firebase/firestore';
import { db } from './config';

// Create a new player in players_v2
export const createPlayerV2 = async (playerData) => {
  try {
    const docRef = await addDoc(collection(db, 'players_v2'), playerData);
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

// Get all players from players_v2
export const getAllPlayersV2 = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'players_v2'));
    return querySnapshot.docs.map(docSnap => ({ playerId: docSnap.id, ...docSnap.data() }));
  } catch (error) {
    throw error;
  }
};

// Get a single player by ID from players_v2
export const getPlayerV2 = async (playerId) => {
  try {
    const playerDoc = await getDoc(doc(db, 'players_v2', playerId));
    return playerDoc.exists() ? { playerId, ...playerDoc.data() } : null;
  } catch (error) {
    throw error;
  }
};

// Update a player's stats in players_v2
export const updatePlayerStatsV2 = async (playerId, stats) => {
  try {
    const playerDocRef = doc(db, 'players_v2', playerId);
    await updateDoc(playerDocRef, { stats });
  } catch (error) {
    throw error;
  }
};

// Get all rounds for a player across all games_v2/{gameId}/rounds
export const getPlayerRounds = async (playerId) => {
  try {
    const gamesSnap = await getDocs(collection(db, 'games_v2'));
    let allRounds = [];
    for (const gameDoc of gamesSnap.docs) {
      const roundsSnap = await getDocs(collection(db, `games_v2/${gameDoc.id}/rounds`));
      const playerRounds = roundsSnap.docs
        .map(r => ({ roundId: r.id, gameId: gameDoc.id, ...r.data() }))
        .filter(r => r.playerId === playerId);
      allRounds = allRounds.concat(playerRounds);
    }
    return allRounds;
  } catch (error) {
    throw error;
  }
};
