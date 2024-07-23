import { createListenerMiddleware } from "@reduxjs/toolkit";
import { authApi } from "../services/auth";

export const listenerMiddleware = createListenerMiddleware()

listenerMiddleware.startListening({
    matcher: authApi.endpoints.login.matchFulfilled,
    effect: async (action, listenereApi) => {
        listenereApi.cancelActiveListeners()

        if (action.payload.token) 
            localStorage.setItem("token", action.payload.token)
    }
})

listenerMiddleware.startListening({
    matcher: authApi.endpoints.register.matchFulfilled,
    effect: async (action, listenereApi) => {
        listenereApi.cancelActiveListeners()

        if (action.payload.token) 
            localStorage.setItem("token", action.payload.token)
    }
})