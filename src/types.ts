export type ConvertCallback = (word: string) => string | null;

export type MatcherCallback = (word: string) => boolean;

export type InsertLineCommentCallback = (
  comment: string,
  updatedLineText: string,
  updatedLineEndIndex: number,
) => void;
