import { createContext, useMemo, ReactNode } from 'react';
import { Post } from '../interfaces';
import { GitHubInfoContextInterface, extractGitHubInfo } from './GitHubInfo';
import { YouTubeInfoContextInterface, useYouTubeApi } from './YouTubeInfo';

type GenericInfoContextInterface = {
  gitHubInfo: GitHubInfoContextInterface;
  youTubeInfo: YouTubeInfoContextInterface;
};

const GenericInfoContext = createContext<GenericInfoContextInterface>({
  gitHubInfo: {
    issues: [],
    pullRequests: [],
    repos: [],
    commits: [],
    users: [],
  },
  youTubeInfo: {
    channelUrl: '',
    subscriberCount: -1,
    viewCount: -1,
  },
});

type Props = {
  children: ReactNode;
  post: Post;
};

const GenericInfoProvider = ({ children, post }: Props) => {
  const youTubeInfo = useYouTubeApi(post);

  const gitHubInfo = useMemo(() => extractGitHubInfo(post), [post]);

  const genericInfo = {
    gitHubInfo,
    youTubeInfo,
  };

  return <GenericInfoContext.Provider value={genericInfo}>{children}</GenericInfoContext.Provider>;
};

export default GenericInfoProvider;
export { GenericInfoContext };
