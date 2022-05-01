import { IMPROV_DATABASE } from "../data/improv-database";

export function generateWorkshop() {
  const numWarmupGames = 2;
  const numExcercises = 3;
  const numGames = 3;

  function findWorkshopsWithTags(tag: string) {
    return (
      JSON.parse(JSON.stringify(IMPROV_DATABASE)) as typeof IMPROV_DATABASE
    ).filter((workshop) => workshop.tags.find((item) => item === tag));
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
    const { title } =
      IMPROV_DATABASE[Math.floor(Math.random() * IMPROV_DATABASE.length)];
    workshopElementTitles.push(title);
  }
  return workshopElementTitles;
}
