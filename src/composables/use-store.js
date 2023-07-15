import { useLoaderStore } from "@/store/loader";

export const useStore = () => {
    const loaderStore = useLoaderStore();

    return {
        loaderStore
    };
}