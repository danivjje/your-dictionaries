import { useDictionariesStore } from "@/store/dictionaries";
import { useCommonStore } from "@/store/common";

export const useStores = () => {
  const commonStore = useCommonStore();
  const dictionariesStore = useDictionariesStore();

  return {
    commonStore,
    dictionariesStore,
  };
};
