import Router from "next/router";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import { createContext, ReactNode, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { api } from "../config/axios";

type SignInCredentials = {
  email: string;
  password: string;
};

interface AuthContextData {
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => void;
  setUserInfo: (user: User) => void;
  isAuthenticated: boolean;
  user: User;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface User {
  first_name: string;
  last_name: string;
  email: string;
  cpf: string;
  confirm_password: string;
  address: {
    street: string;
    neighborhood: string;
    city: string;
  };
  state: string;
  city: string;
  available: boolean;
  lat: number;
  long: number;
  cellphone: string;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);
  const isAuthenticated = Object.keys(user).length > 0;

  useEffect(() => {
    const { "bethebox.token": token } = parseCookies();
    if (token) {
      api
        .get("/me")
        .then((response) => {
          const user = response.data;

          setUser(user);
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

      setCookie(undefined, "bethebox.token", token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/",
      });

      setUser(user);

      if (api?.defaults?.headers) {
        api.defaults.headers["Authorization"] = `Bearer ${token}`;
      }

      Router.push("/map");
    } catch (error: any) {
      toast(`${error}`);
    }
  }

  function setUserInfo(user: User) {
    setUser(user);
  }

  function signOut() {
    destroyCookie(undefined, "bethebox.token");
    Router.push("/");
  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        setUserInfo,
        isAuthenticated,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
