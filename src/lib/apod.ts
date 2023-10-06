const BASE_URL = "https://spacelab.henni.be";

export type Apod = {
  date: string;
  title: string;
  explanation: string;
  url: string;
  hdUrl: string;
  media_type: string;
  likes: number;
};

function formatDate(date: Date) {
  const day =
    date.getDate() < 10 ? `0${date.getDate()}` : date.getDate().toString();
  const month =
    date.getMonth() + 1 < 10
      ? `0${date.getMonth() + 1}`
      : `${date.getMonth() + 1}`;
  return `${date.getFullYear()}-${month}-${day}`;
}

export async function fetchLatestApods(): Promise<Apod[]> {
  const now = new Date();
  const start = new Date();
  start.setDate(now.getDate() - 7);

  const res = await fetch(
    `${BASE_URL}/apod?start_date=${formatDate(start)}&end_date=${formatDate(
      now
    )}`
  );

  if (res.ok) {
    return await res.json();
  }

  throw Error("Couldn't fetch from API");
}
