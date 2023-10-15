import {
  get,
  writable,
  type Subscriber,
  type Invalidator,
  type Unsubscriber,
} from "svelte/store";
import { addToCollection, removeFromCollection, token, user } from "./auth";
import type { Apod } from "./apod";

const BASE_URL = "https://spacelab.henni.be";

export interface LikeStatus {
  isLiked: boolean;
  likes: number;
}

export interface LikeStore {
  subscribe: (
    this: void,
    run: Subscriber<Map<string, LikeStatus>>,
    invalidate?: Invalidator<Map<string, LikeStatus>> | undefined
  ) => Unsubscriber;
  like: (apodId: string) => Promise<void>;
  unlike: (apodId: string) => Promise<void>;
  insert: (apodId: string, likeStatus: LikeStatus) => void;
}

export function createLikeStore(): LikeStore {
  const { subscribe, update } = writable(new Map<string, LikeStatus>());

  return {
    subscribe,
    like: async (apodId: string) => {
      update((map) => {
        const status = map.get(apodId);

        if (!status) return map;

        status.likes++;
        status.isLiked = true;

        return map;
      });
      addToCollection(apodId);
      await likeApod(apodId);
    },
    unlike: async (apodId: string) => {
      update((map) => {
        const status = map.get(apodId);

        if (!status) return map;

        status.likes--;
        status.isLiked = false;

        return map;
      });
      removeFromCollection(apodId);
      await unlikeApod(apodId);
    },
    insert: (apodId: string, likeStatus: LikeStatus) => {
      update((map) => {
        map.set(apodId, likeStatus);

        return map;
      });
    },
  };
}

export async function updateLikes(apods: Apod[], store: LikeStore) {
  const collection = get(user)?.apods;

  if (collection) {
    for (const apodId of collection) {
      const likesCount = await getLikes(apodId);
      console.log(
        `Inserting ${apodId} -> {likes: ${likesCount}, isLiked: true}`
      );
      store.insert(apodId, { likes: likesCount, isLiked: true });
    }
  }

  const value = get(store);
  for (const apod of apods) {
    if (!value.has(apod.date)) {
      store.insert(apod.date, { likes: apod.likes, isLiked: false });
    }
  }
}

async function getLikes(apodId: string): Promise<number> {
  const res = await fetch(`${BASE_URL}/apod/${apodId}`);

  if (res.ok) {
    const apod = (await res.json()) as Apod;
    return apod.likes;
  }

  return 1;
}

async function likeApod(apodId: string) {
  const userId = get(user)!.id;
  const authToken = get(token)!;

  await fetch(`https://spacelab.henni.be/user/${userId}/apod/${apodId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });
}

async function unlikeApod(apodId: string) {
  const userId = get(user)?.id;

  if (!userId) return;

  const authToken = get(token)!;

  await fetch(`https://spacelab.henni.be/user/${userId}/apod/${apodId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });
}
