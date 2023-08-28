import { useStores } from "@/composables/use-stores";
import {
  getDictionaries,
  postDictionary,
  deleteDictionary,
  updateDictionaryValue,
  addDictionaryWord,
} from "@/helpers/firebase/firebase-requests";
import { IDictionary, IDictionaryWord } from "@/types/interfaces";
import { defineStore } from "pinia";
import { Ref, ref } from "vue";

export const useDictionariesStore = defineStore("dictionaries", () => {
  const dictionaries: Ref<IDictionary[]> = ref([]);
  const { commonStore } = useStores();

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
        const fetchedDictionaries = await getDictionaries(
          commonStore.currentUser.uid
        );
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
        const newID = await postDictionary(
          commonStore.currentUser.uid,
          dictionary
        );
        dictionaries.value.push(Object.assign(dictionary, { id: newID }));
      }
    } catch (err) {
      console.log("err", err);
      commonStore.useNotification(
        "an error occurred during item creating, try again or reload the page. sorry =("
      );
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
      commonStore.useNotification(
        "an error occurred during dictionary deleting, try again or reload the page. sorry =("
      );
    } finally {
      commonStore.finishLoading();
    }
  };

  const editDictionaryName = async (
    dictionaryId: string,
    newTitle: string
  ): Promise<void> => {
    try {
      commonStore.startLoading();
      if ("uid" in commonStore.currentUser) {
        await updateDictionaryValue(
          commonStore.currentUser.uid,
          dictionaryId,
          "title",
          newTitle
        );
        const dictionaryIndex = dictionaries.value.findIndex((item) => {
          return item.id === dictionaryId;
        });
        dictionaries.value[dictionaryIndex].title = newTitle;
      }
    } catch (err) {
      console.log("err: ", err);
    } finally {
      commonStore.finishLoading();
    }
  };

  const toggleDictionaryPrivateStatus = async (
    dictionaryId: string,
    newValue: boolean
  ): Promise<void> => {
    try {
      if ("uid" in commonStore.currentUser) {
        const dictionaryIndex = dictionaries.value.findIndex((item) => {
          return item.id === dictionaryId;
        });
        await updateDictionaryValue(
          commonStore.currentUser.uid,
          dictionaryId,
          "isPrivate",
          newValue
        );
        dictionaries.value[dictionaryIndex].isPrivate = newValue;
      }
    } catch (err) {
      console.log("err: ", err);
    }
  };

  const clearDictionariesList = async (): Promise<void> => {
    dictionaries.value = [];
  };

  const addWordInDictionary = async (
    dictionaryId: string,
    newWord: string
  ): Promise<void> => {
    if ("uid" in commonStore.currentUser) {
      try {
        commonStore.startLoading();

        const date = new Date();
        const newDictionaryWord: IDictionaryWord = {
          word: newWord,
          isFavorite: false,
          creationDate: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`,
        };

        const dictionaryIndex = dictionaries.value.findIndex(
          (item) => item.id === dictionaryId
        );
        dictionaries.value[dictionaryIndex].words.push(newDictionaryWord);
        await addDictionaryWord(
          commonStore.currentUser.uid,
          dictionaries.value[dictionaryIndex].id,
          newDictionaryWord
        );
      } catch (err) {
        commonStore.useNotification(
          "unknown error: try again or reload the page. sorry =("
        );
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
  };
});
