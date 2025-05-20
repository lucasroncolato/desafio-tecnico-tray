import { collection, addDoc } from "firebase/firestore";
import { db } from "@/services/firebase";

interface GameSummary {
  user: string;
  time: number;
  attempts: number;
  date: string;
}

export async function saveGameSummary(summary: GameSummary): Promise<void> {
  console.log(summary)
  try {
    await addDoc(collection(db, "gamesummaries"), summary);
    console.log("Resumo do jogo salvo com sucesso no Firestore.");
  } catch (error) {
    console.error("Erro ao salvar o resumo do jogo no Firestore:", error);
  }
}
