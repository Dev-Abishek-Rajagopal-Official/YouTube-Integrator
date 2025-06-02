export interface Thumbnail {
    url: string;
  }
  
  export interface Snippet {
    title: string;
    description: string;
    publishedAt: string;
    channelTitle: string;
    thumbnails: { [key: string]: Thumbnail };
    tags?: string[];
  }
  
  export interface VideoItem {
    id: { videoId: string };
    snippet: Snippet;
  }
  
  export interface VideoDetail {
    id: string;
    snippet: Snippet;
    statistics: {
      viewCount: string;
      likeCount: string;
      [key: string]: any;
    };
    contentDetails: {
      duration: string;
      licensedContent: boolean;
    };
  }
  