import { IMPROWIKI } from "../data/improwiki";

export function generateWorkshop() {
  const numWarmupGames = 2;
  const numExcercises = 3;
  const numGames = 3;

  function findWorkshopsWithTags(tag: string) {
    return (JSON.parse(JSON.stringify(IMPROWIKI)) as typeof IMPROWIKI).filter(
      (workshop) => workshop.tags.find((item) => item === tag)
    );
  }

  const workshopElementTitles: string[] = [];
  const warmups = findWorkshopsWithTags("warmup").sort(
    () => Math.random() - 0.5
  );
  for (let i = 0; i < numWarmupGames; i++) {
    workshopElementTitles.push(warmups.pop()!.title);
  }

  const excercises = findWorkshopsWithTags("excercise").sort(
    () => Math.random() - 0.5
  );
  for (let i = 0; i < numExcercises; i++) {
    workshopElementTitles.push(excercises.pop()!.title);
  }

  const games = findWorkshopsWithTags("game").sort(() => Math.random() - 0.5);
  for (let i = 0; i < numGames; i++) {
    workshopElementTitles.push(games.pop()!.title);
  }

  return workshopElementTitles;
}

export function randomGenerator() {
  const workshopElementTitles: string[] = [];
  for (let i = 0; i < 8; i++) {
    const { title } = IMPROWIKI[Math.floor(Math.random() * IMPROWIKI.length)];
    workshopElementTitles.push(title);
  }
  return workshopElementTitles;
}
