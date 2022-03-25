import { useEffect, useState } from 'react';
import { Post, extractVideoId } from '../interfaces';
import { youTubeApiKey } from '../config';

export interface YouTubeInfoContextInterface {
  channelUrl: string;
  subscriberCount: number;
  viewCount: number;
}

export const useYouTubeApi = (post: Post): YouTubeInfoContextInterface => {
  let channelUrl = '';
  const [subscriberCount, setSubscriberCount] = useState(-1);
  const [viewCount, setViewCount] = useState(-1);

  if (post.type === 'video') {
    channelUrl = post.feed.link;
  }

  useEffect(() => {
    if (post.type !== 'video') {
      return;
    }

    const channelId = new URL(post.feed.url).searchParams.get('channel_id');

    fetch(
      `https://youtube.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${youTubeApiKey}`
    )
      .then((res) => res.json())
      .then((json) => {
        if (json) {
          setSubscriberCount(json.items[0].statistics.subscriberCount);
        }

        return null;
      })
      .catch((err) => console.log(err));
  }, [post]);

  useEffect(() => {
    if (post.type !== 'video') {
      return;
    }

    const videoId = extractVideoId(post);

    fetch(
      `https://youtube.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=${youTubeApiKey}`
    )
      .then((res) => res.json())
      .then((json) => {
        if (json) {
          setViewCount(json.items[0].statistics.viewCount);
        }

        return null;
      })
      .catch((err) => console.log(err));
  }, [post]);

  return {
    channelUrl,
    subscriberCount,
    viewCount,
  };
};
