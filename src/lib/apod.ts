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
  const month = `${
    date.getMonth() < 10 ? `0${date.getMonth()}` : `${date.getMonth()}`
  }`;
  return `${date.getFullYear()}-${month}-${date.getDate()}`;
}

export async function fetchLatestApods(): Promise<Apod[]> {
  const now = new Date();
  const start = new Date();
  start.setDate(now.getDate() - 6);

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
