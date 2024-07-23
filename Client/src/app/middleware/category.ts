import { createListenerMiddleware } from "@reduxjs/toolkit";
import { categoryApi } from "../services/category";

export const categoryListener = createListenerMiddleware()

categoryListener.startListening({
    matcher: categoryApi.endpoints.createCategory.matchFulfilled,
    effect: async (action, listenereApi) => {
        listenereApi.cancelActiveListeners

        if (action.payload.id) 
            localStorage.setItem("defaultCategoryId", action.payload.id)
    }
})