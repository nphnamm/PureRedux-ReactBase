import { configureStore } from '@reduxjs/toolkit';
import { withExtraArgument } from 'redux-thunk';
import { loginReducer } from './reducers/loginReducer';
import { signUpReducer } from './reducers/signupReducer';
import { authReducer } from './reducers/authReducer';
import { loadUser } from './actions/authActions';

const store = configureStore({
  reducer: {
    login: loginReducer as any,
    register: signUpReducer as any,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(withExtraArgument({})),
});

const initializeApp = async (): Promise<void> => {
  await store.dispatch(loadUser());
};

initializeApp();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
