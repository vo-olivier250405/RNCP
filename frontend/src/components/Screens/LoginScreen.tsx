import { useMutation } from "@tanstack/react-query";
import { FC, FormEvent, useState } from "react";
import useAuth from "../../stores/useAuth";
import useGameStateManager from "../../stores/useGameStateManager";
import { getLoginMutationOptions } from "../../api/options/mutations/login";

export const LoginScreen: FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { setAuth } = useAuth();
  const { setGameState } = useGameStateManager();

  const options = getLoginMutationOptions(
    username,
    password,
    setGameState,
    setAuth
  );

  const { mutate, isPending } = useMutation(options);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="h-screen w-screen flex flex-col gap-2 items-center justify-center text-green-300 bg-black text-xl"
    >
      <input
        className="p-4 bg-green-300 text-black rounded-md placeholder:text-black focus:bg-green-600 focus:text-green-200"
        value={username}
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        type="text"
        name=""
        id=""
      />
      <input
        className="p-4 bg-green-300 text-black rounded-md placeholder:text-black focus:bg-green-600 focus:text-green-200"
        value={password}
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        name=""
        id=""
      />

      <button
        className="mt-10 text-4xl hover:text-green-800"
        type="submit"
        disabled={isPending}
      >
        Login
      </button>
    </form>
  );
};
