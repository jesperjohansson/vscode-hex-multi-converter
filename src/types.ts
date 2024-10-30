export type ConvertCallback = (word: string) => string | null;

export type MatcherCallback = (word: string, extended: boolean) => boolean;

export type InsertLineCommentCallback = (
  comment: string,
  updatedLineText: string,
  updatedLineEndIndex: number,
) => void;
