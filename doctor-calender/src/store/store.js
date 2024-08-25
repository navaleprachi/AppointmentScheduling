import { configureStore } from "@reduxjs/toolkit";
import apptReducer from "../features/apptSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Use localStorage as default

// Persist config
const persistConfig = {
  key: "root",
  storage,
};

// Wrap the apptReducer with persistReducer
const persistedReducer = persistReducer(persistConfig, apptReducer);

// Configure store with the persisted reducer
const store = configureStore({
  reducer: {
    appointments: persistedReducer,
  },
});

// Persistor for persisting the store
const persistor = persistStore(store);

export { store, persistor };
