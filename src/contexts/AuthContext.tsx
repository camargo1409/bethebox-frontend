import Router from "next/router";
import { parseCookies, setCookie } from "nookies";
import { createContext, ReactNode, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { api } from "../config/axios";

type SignInCredentials = {
  email: string;
  password: string;
};

interface AuthContextData {
  signIn: (credentials: SignInCredentials) => Promise<void>;
  isAuthenticated: boolean;
  user: User;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface User {
  email: string;
  first_name: string;
  last_name: string;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);
  const isAuthenticated = !!user;

  useEffect(() => {
    const { "bethebox.token": token } = parseCookies();
    if (token) {
      api
        .get("/me")
        .then((response) => {
          const { email, first_name, last_name } = response.data;

          setUser({ email, first_name, last_name });
        })
        .catch((error) => {
          toast(`${error}`);
        });
    }
  }, []);

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const { data }: any = await api.post("auth", {
        email,
        password,
      });

      const { token, user } = data;

      const { first_name, last_name } = user;

      setCookie(undefined, "bethebox.token", token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/",
      });

      setUser({
        email,
        first_name,
        last_name,
      });

      if (api?.defaults?.headers) {
        api.defaults.headers["Authorization"] = `Bearer ${token}`;
      }

      Router.push("/dashboard");
    } catch (error: any) {
      toast(`${error}`);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        isAuthenticated,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
