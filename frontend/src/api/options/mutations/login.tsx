import { UseMutationOptions } from "@tanstack/react-query";
import { login, LoginType } from "../../authApiQueries";
import {
  GameStateManager,
  setGameStateType,
} from "../../../types/GameStateManager";
import { User } from "../../../types/User";
import { setAuthType } from "../../../types/AuthStore";

const onSuccess = ({
  token,
  expiry,
  user,
  setGameState,
  setAuth,
}: {
  token: string;
  expiry: string;
  user: User;
  setGameState: setGameStateType;
  setAuth: setAuthType;
}) => {
  setAuth(token, expiry, user);
  const { game_session } = user;
  if (game_session) {
    const {
      state,
      action,
      history,
      currentDirectory,
      dataToDisplay,
      terminal,
    } = game_session as GameStateManager;

    setGameState(
      state,
      action,
      history,
      currentDirectory,
      dataToDisplay,
      terminal
    );
  }
};

export const getLoginMutationOptions = (
  username: string,
  password: string,
  setGameState: setGameStateType,
  setAuth: setAuthType
): UseMutationOptions<LoginType, Error> => ({
  mutationKey: ["login", username, password],
  mutationFn: async () => login(username, password),
  onSuccess: ({ token, expiry, user }) =>
    onSuccess({ token, expiry, user, setAuth, setGameState }),
  onError: (error) => console.log(error.message),
});
