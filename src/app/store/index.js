import { configureStore } from '@reduxjs/toolkit';

import { baseApi } from '@/shared/api/index.js';
import {tickerReducer} from "@/entities/ticket/model/ticketSlice.js";


export default configureStore({
   reducer: {
      [baseApi.reducerPath]: baseApi.reducer,
      ticket: tickerReducer
   },
   middleware: (getDefaultMiddleware) =>
     getDefaultMiddleware().concat(baseApi.middleware),
})

