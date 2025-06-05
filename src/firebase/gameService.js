import { collection, addDoc, getDocs, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from './config';

// Create a new game in games_v2
export const createGameV2 = async (gameData) => {
  try {
    const docRef = await addDoc(collection(db, 'games_v2'), gameData);
    return docRef.id;
  } catch (error) {
    console.error('[createGameV2] Failed to add game:', error);
    throw error;
  }
};

// Update a game in games_v2
export const updateGameV2 = async (gameId, data) => {
  try {
    const gameDocRef = doc(db, 'games_v2', gameId);
    await updateDoc(gameDocRef, data);
  } catch (error) {
    console.error('[updateGameV2] Failed to update game:', error);
    throw error;
  }
};

// Add a round to a game's rounds subcollection in games_v2
export const addRoundToGame = async (gameId, roundData) => {
  try {
    await addDoc(collection(db, `games_v2/${gameId}/rounds`), roundData);
  } catch (error) {
    console.error('[addRoundToGame] Failed to add round:', error);
    throw error;
  }
};

// Get a single game by ID from games_v2
export const getGameV2 = async (gameId) => {
  try {
    const gameDoc = await getDoc(doc(db, 'games_v2', gameId));
    return gameDoc.exists() ? { gameId, ...gameDoc.data() } : null;
  } catch (error) {
    console.error('[getGameV2] Failed to get game:', error);
    throw error;
  }
};

// Get all games from games_v2
export const getAllGamesV2 = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'games_v2'));
    return querySnapshot.docs.map(docSnap => ({ gameId: docSnap.id, ...docSnap.data() }));
  } catch (error) {
    console.error('[getAllGamesV2] Failed to get games:', error);
    throw error;
  }
};
