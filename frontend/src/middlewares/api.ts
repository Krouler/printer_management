import { createListenerMiddleware } from "@reduxjs/toolkit";
import { authApi } from "../app/services/auth";

export const tokenSetterMiddleware = createListenerMiddleware();

tokenSetterMiddleware.startListening({
    matcher: authApi.endpoints.login.matchFulfilled,
    effect: async (action, listenerapi) => {
        listenerapi.cancelActiveListeners();
        if (action.payload.access && action.payload.refresh) {
            localStorage.setItem('access', action.payload.access)
            localStorage.setItem('refresh', action.payload.refresh)
        }
    }
})
