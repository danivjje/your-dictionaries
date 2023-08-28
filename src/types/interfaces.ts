export interface IDictionary {
  id: string;
  title: string;
  isPinned: boolean;
  isPrivate: boolean;
  words: IDictionaryWord[];
}

export interface IDictionaryWord {
  word: string;
  isFavorite: boolean;
  creationDate: string;
}

export interface IUserInformation {
  email: string;
}

export interface INotification {
  isShowed: boolean;
  text: string;
}

export interface IAuthErrorsMessages {
  [key: string]: string;
}

export interface IAddWordModalInformation {
  isActive: boolean;
  xCoordinate: number;
  yCoordinate: number;
}
