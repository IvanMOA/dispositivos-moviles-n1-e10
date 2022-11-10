import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { Text, useToast } from "native-base";
export const AuthContext = createContext({
  isAuthenticatingUser: true,
  user: null,
});
export function AuthProvider({ children }) {
  const [authStoreState, setAuthStoreState] = useState({
    isAuthenticatingUser: true,
    user: null,
  });
  const toast = useToast();
  useEffect(() => {
    const unsubscribeFromAuthStateChanges = onAuthStateChanged(
      auth,
      async (user) => {
        if (user) {
          if (!user.emailVerified) {
            toast.show({
              description: "Verifica tu correo antes de entrar",
            });
            setAuthStoreState({
              user: null,
              isAuthenticatingUser: false,
            });
            return;
          }
          toast.show({
            description: "Bienvenido",
          });
        }
        setAuthStoreState({
          user,
          isAuthenticatingUser: false,
        });
      }
    );
    return () => {
      unsubscribeFromAuthStateChanges();
    };
  }, []);
  return (
    <AuthContext.Provider value={authStoreState}>
      {children}
    </AuthContext.Provider>
  );
}
export const useAuthStore = () => useContext(AuthContext);
