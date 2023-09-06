import { User } from "@firebase/auth/internal";
import { defineStore } from "pinia";
import { Ref, ref, reactive } from "vue";
import { getCurrentUser } from "vuefire";
import { IConfirm, INotification } from "@/types/interfaces";

export const useCommonStore = defineStore("common", () => {
  const isLoading: Ref<boolean> = ref(false);
  const currentUser: Ref<User | object> = ref(setCurrentUser());
  const notificationsQueue: Ref<INotification[]> = ref([]);
  const currentNotification: Ref<INotification> = ref({ text: "" });

  const confirm: IConfirm = reactive({
    isShowed: false,
    text: "",
    response: null,
  });

  const showConfirm = (text: string): void => {
    confirm.isShowed = true;
    confirm.text = text;
  };

  const useNotification = (text: string, duration: number = 1000): void => {
    notificationsQueue.value = [...notificationsQueue.value, { text }];
    currentNotification.value = notificationsQueue.value[0];
    setTimeout((): void => {
      currentNotification.value = { text: "" };
      setTimeout(() => {
        notificationsQueue.value = notificationsQueue.value.slice(1);
        currentNotification.value = notificationsQueue.value[0] || { text: "" };
      }, 200);
    }, duration * notificationsQueue.value.length);
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
    confirm,
    showConfirm,
    notificationsQueue,
    currentNotification,
    useNotification,
    isLoading,
    startLoading,
    finishLoading,
    currentUser,
    changeCurrentUser,
  };
});
