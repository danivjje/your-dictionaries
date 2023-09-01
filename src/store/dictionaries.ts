import { useStores } from "@/composables/use-stores";
import {
  getDictionaries,
  postDictionary,
  deleteDictionary,
  updateDictionaryValue,
  addDictionaryWord,
  deleteDictionaryWord,
} from "@/helpers/firebase/firebase-requests";
import { IDictionary, IDictionaryWord } from "@/types/interfaces";
import { defineStore } from "pinia";
import { Ref, ref } from "vue";

export const useDictionariesStore = defineStore("dictionaries", () => {
  const { commonStore } = useStores();
  const dictionaries: Ref<IDictionary[]> = ref([]);

  const sortByPinned = (): void => {
    dictionaries.value = dictionaries.value.sort((first, second) => {
      if (first.isPinned === true && second.isPinned === false) {
        return -1;
      }

      if (first.isPinned === false && second.isPinned === true) {
        return 1;
      }

      return 0;
    });
  };

  const fetchDictionaries = async (): Promise<void> => {
    try {
      commonStore.startLoading();
      if ("uid" in commonStore.currentUser) {
        const fetchedDictionaries = await getDictionaries(commonStore.currentUser.uid);
        if (fetchedDictionaries.length > 0) {
          dictionaries.value.push(...fetchedDictionaries);
        }
      }
    } catch (err) {
      console.log("err: ", err);
    } finally {
      commonStore.finishLoading();
    }
  };

  const addDictionary = async (title: string): Promise<void> => {
    const dictionary: IDictionary = {
      id: "will generated new id",
      title,
      isPinned: false,
      isPrivate: false,
      words: [],
    };

    try {
      commonStore.startLoading();
      if ("uid" in commonStore.currentUser) {
        const newID = await postDictionary(commonStore.currentUser.uid, dictionary);
        dictionaries.value.push(Object.assign(dictionary, { id: newID }));
      }
    } catch (err) {
      console.log("err", err);
      commonStore.useNotification("an error occurred during item creating, try again or reload the page. sorry =(");
    } finally {
      commonStore.finishLoading();
    }
  };

  const removeDictionary = async (dictionaryId: string): Promise<void> => {
    try {
      commonStore.startLoading();
      if ("uid" in commonStore.currentUser) {
        await deleteDictionary(commonStore.currentUser.uid, dictionaryId);
        dictionaries.value = dictionaries.value.filter((dictionary) => {
          return dictionary.id !== dictionaryId;
        });
        commonStore.useNotification("dictionary was successfully deleted");
      }
    } catch (err) {
      console.log("err: ", err);
      commonStore.useNotification("an error occurred during dictionary deleting, try again or reload the page. sorry =(");
    } finally {
      commonStore.finishLoading();
    }
  };

  const editDictionaryName = async (dictionaryId: string, newTitle: string): Promise<void> => {
    try {
      commonStore.startLoading();
      if ("uid" in commonStore.currentUser) {
        await updateDictionaryValue(commonStore.currentUser.uid, dictionaryId, "title", newTitle);
        const dictionaryIndex = dictionaries.value.findIndex((item) => item.id === dictionaryId);
        if (dictionaryIndex !== -1) dictionaries.value[dictionaryIndex].title = newTitle;
      }
    } catch (err) {
      console.log("err: ", err);
    } finally {
      commonStore.finishLoading();
    }
  };

  const toggleDictionaryPrivateStatus = async (dictionaryId: string, newValue: boolean): Promise<void> => {
    try {
      if ("uid" in commonStore.currentUser) {
        await updateDictionaryValue(commonStore.currentUser.uid, dictionaryId, "isPrivate", newValue);

        const dictionaryIndex: number = dictionaries.value.findIndex((item) => item.id === dictionaryId);
        if (dictionaryIndex !== -1) dictionaries.value[dictionaryIndex].isPrivate = newValue;
      }
    } catch (err) {
      console.log("err: ", err);
    }
  };

  const clearDictionariesList = async (): Promise<void> => {
    dictionaries.value = [];
  };

  const addWordInDictionary = async (dictionaryId: string, newWord: string, words?: IDictionaryWord[]): Promise<void> => {
    if ("uid" in commonStore.currentUser) {
      if (newWord) {
        try {
          commonStore.startLoading();

          const date = new Date();
          const newDictionaryWord: IDictionaryWord = {
            word: newWord,
            isFavorite: false,
            creationDate: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`,
          };

          await addDictionaryWord(commonStore.currentUser.uid, dictionaryId, newDictionaryWord);
          if (words) {
            const hasThisWord: boolean = words.some((item) => item.word === newWord);
            if (!hasThisWord) {
              words.push(newDictionaryWord);
            } else {
              commonStore.useNotification("this dictionary already has this word");
            }
          } else {
            const dictionaryIndex = dictionaries.value.findIndex((item) => item.id === dictionaryId);
            const hasThisWord: boolean = dictionaries.value[dictionaryIndex].words.some((item) => item.word === newWord);
            if (!hasThisWord) {
              dictionaries.value[dictionaryIndex].words.push(newDictionaryWord);
            } else {
              commonStore.useNotification("this dictionary already has this word");
            }
          }
        } catch (err) {
          console.log(err);
          commonStore.useNotification("unknown error: try again or reload the page. sorry =(");
        } finally {
          commonStore.finishLoading();
        }
      } else {
        commonStore.useNotification("the field must not be empty", 2000);
      }
    }
  };

  const removeWordFromDictionary = async (
    dictionaryId: string,
    word: IDictionaryWord,
    words?: IDictionaryWord[],
  ): Promise<void | IDictionaryWord[]> => {
    if ("uid" in commonStore.currentUser) {
      try {
        commonStore.startLoading();
        await deleteDictionaryWord(commonStore.currentUser.uid, dictionaryId, word);

        if (words) {
          return words.filter((item) => item.word !== word.word);
        } else {
          const dictionaryIndex = dictionaries.value.findIndex((item) => item.id === dictionaryId);
          dictionaries.value[dictionaryIndex].words = dictionaries.value[dictionaryIndex].words.filter((item) => {
            return item.word !== word.word;
          });
        }
      } catch (err) {
        console.log(err);
        commonStore.useNotification("unknown error. try again or reload the page. sorry =(");
      } finally {
        commonStore.finishLoading();
      }
    }
  };

  return {
    dictionaries,
    fetchDictionaries,
    addDictionary,
    removeDictionary,
    editDictionaryName,
    toggleDictionaryPrivateStatus,
    clearDictionariesList,
    sortByPinned,
    addWordInDictionary,
    removeWordFromDictionary,
  };
});
