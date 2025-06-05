import { db } from '../firebase/config';
import { getAllGamesV2 } from '../firebase/gameService';

export const getAllGamesV2 = async () => {
  try {
    return await getAllGamesV2();
  } catch (error) {
    console.error('Error getting all games:', error);
    throw error;
  }
};
