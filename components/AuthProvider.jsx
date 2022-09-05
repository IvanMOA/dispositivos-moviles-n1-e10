import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useToast } from "native-base";
import { useI18n } from "./I18nProvider";
import { userUserStore } from "../stores/UserStore";
export const AuthContext = createContext({
  isAuthenticatingUser: true,
  user: null,
});
export function AuthProvider({ children }) {
  const toast = useToast();
  const { t } = useI18n();
  const userStore = userUserStore();
  const [authStoreState, setAuthStoreState] = useState({
    isAuthenticatingUser: true,
    user: null,
  });
  useEffect(() => {
    const unsubscribeFromAuthStateChanges = onAuthStateChanged(
      auth,
      async (user) => {
        if (user) {
          if (!user.emailVerified) {
            await signOut(auth);
            toast.show({
              description: t("verify_your_email"),
            });
            return setAuthStoreState({
              user: null,
              isAuthenticatingUser: false,
            });
          }
          toast.show({
            description: t("verify_your_email"),
          });
        }
        if (user !== null) {
          await userStore.fetchUser(user.uid);
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
