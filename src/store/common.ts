import { User } from "@firebase/auth/internal";
import { defineStore } from "pinia";
import { Ref, ref, reactive } from "vue";
import { getCurrentUser } from "vuefire";
import { INotification } from "@/types/interfaces";

export const useCommonStore = defineStore("common", () => {
  const isLoading: Ref<boolean> = ref(false);
  const currentUser: Ref<User | object> = ref(setCurrentUser());
  const notification: INotification = reactive({
    isShowed: false,
    text: "",
  });

  const useNotification = (text: string, duration: number = 1000): void => {
    notification.isShowed = false;
    if (text !== notification.text) {
      notification.text = text;
    }

    notification.isShowed = true;
    setTimeout(() => (notification.isShowed = false), duration);
  };

  const showNotification = (text: string): void => {
    if (text !== notification.text) notification.text = text;
    notification.isShowed = true;
  };

  const hideNotification = (delay: number = 1000): void => {
    setTimeout(() => (notification.isShowed = false), delay);
  };

  function setCurrentUser(): User | object {
    let user: User | object = {};
    getCurrentUser()
      .then((data) => Object.assign(user, data))
      .catch((error) => console.log(error));
    return user;
  }

  async function changeCurrentUser(): Promise<void> {
    currentUser.value = setCurrentUser();
  }

  const startLoading = (): void => {
    isLoading.value = true;
  };
  const finishLoading = (): void => {
    isLoading.value = false;
  };

  return {
    notification,
    useNotification,
    showNotification,
    hideNotification,
    isLoading,
    startLoading,
    finishLoading,
    currentUser,
    changeCurrentUser,
  };
});
