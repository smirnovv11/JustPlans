import type { Action, ThunkAction } from "@reduxjs/toolkit"
import { combineSlices, configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { api } from "./services/api"
import auth from '../features/user/userSlice'
import { listenerMiddleware } from "./middleware/auth"
import { categoryListener } from "./middleware/category"

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth,
  },
  middleware: getDefaultMiddleware => 
    getDefaultMiddleware()
      .concat(categoryListener.middleware)
      .concat(api.middleware)
      .prepend(listenerMiddleware.middleware)
})

export type RootState = ReturnType<typeof store.getState>

export type AppStore = typeof store
export type AppDispatch = AppStore["dispatch"]
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>

