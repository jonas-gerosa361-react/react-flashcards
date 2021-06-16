import { get } from "./httpService";
import { destroy } from "./httpService";

const endpoint = "http://localhost:3001/flashCards";

export async function apiGetAllFlashcards() {
  return await get(endpoint);
}

export async function apiDeleteFlashcard(id) {
  return await destroy(endpoint, id);
}
