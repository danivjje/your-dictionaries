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
  text: string;
}

export interface IConfirm {
  isShowed: boolean;
  text: string;
  response: null | boolean;
}

export interface IAuthErrorsMessages {
  [key: string]: string;
}

export interface IAddWordModalInformation {
  isActive: boolean;
  xCoordinate: number;
  yCoordinate: number;
}
