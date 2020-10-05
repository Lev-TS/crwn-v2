import { createStore, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";
import logger from "redux-logger";

import rootReducer from "./root-reducer";

const middlewares = [logger];

// this is more scaleable verstion to create middlewares variable and
// spread it out inside of applyMiddleware function, that's just in case we
// would need to add more middleware in the future. Otherwise, we could
// write it lie applyMiddleware(logger).
export const store = createStore(rootReducer, applyMiddleware(...middlewares));

export const persistor = persistStore(store);
