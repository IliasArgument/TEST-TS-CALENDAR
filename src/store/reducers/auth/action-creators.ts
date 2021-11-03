import axios from "axios";
import { AppDispatch } from "../..";
import UserService from "../../../api";
import { IUser } from "../../../models/IUser";
import {
  AuthActionEnum,
  SetUserAction,
  SetErrorAction,
  SetAuthAction,
  SetIsLoadingAction,
} from "./types";

export const AuthActionCreators = {
  setUser: (user: IUser): SetUserAction => ({
    type: AuthActionEnum.SET_USER,
    payload: user,
  }),
  setIsAuth: (auth: boolean): SetAuthAction => ({
    type: AuthActionEnum.SET_AUTH,
    payload: auth,
  }),
  setError: (error: string): SetErrorAction => ({
    type: AuthActionEnum.SET_ERROR,
    payload: error,
  }),
  setIsLoading: (loading: boolean): SetIsLoadingAction => ({
    type: AuthActionEnum.SET_IS_LOADING,
    payload: loading,
  }),
  login:
    (username: string, password: string) => async (dispatch: AppDispatch) => {
      try {
        dispatch(AuthActionCreators.setIsLoading(true));
        const response = await UserService.getUsers();
        const mockUser = response.data.find(
          (user) => user.username === username && user.password === password
        );

        if (mockUser) {
          localStorage.setItem("auth", "true");
          localStorage.setItem("username", mockUser.username);
          dispatch(AuthActionCreators.setUser(mockUser));
          dispatch(AuthActionCreators.setIsAuth(true));
        } else {
          dispatch(
            AuthActionCreators.setError("Некорректный логин или пароль!")
          );
        }
      } catch (e) {
        dispatch(AuthActionCreators.setError("Произошла ошибка при логине!"));
      } finally {
        dispatch(AuthActionCreators.setIsLoading(false));
      }
    },
  logout: () => async (dispatch: AppDispatch) => {
    try {
      dispatch(AuthActionCreators.setIsLoading(true));
      localStorage.removeItem("auth");
      localStorage.removeItem("username");
      dispatch(AuthActionCreators.setUser({} as IUser));
      dispatch(AuthActionCreators.setIsAuth(false));
    } catch {
      dispatch(AuthActionCreators.setError("Произошла ошибка при выходе!"));
    } finally {
      dispatch(AuthActionCreators.setIsLoading(false));
    }
  },
};
