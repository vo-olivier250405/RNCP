import { UseMutationOptions } from "@tanstack/react-query";
import { patch } from "../..";
import { GameStateDataType } from "../../../types/GameStateManager";
import { User } from "../../../types/User";

const handleSaveMutation = async (
  data: GameStateDataType,
  token: string,
  user: User
) =>
  await patch(token!, `user/${user!.id}`, {
    username: user!.username,
    game_session: data,
  });

export const getSaveMutationOptions = (
  data: GameStateDataType,
  token: string,
  user: User
): UseMutationOptions<User, Error> => ({
  mutationKey: ["save", user.id],
  mutationFn: () => handleSaveMutation(data, token, user),
  onError: (error) => alert(error.message),
});
