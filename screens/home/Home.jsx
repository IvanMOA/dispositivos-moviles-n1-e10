import { useAuthStore } from "../../components/AuthProvider";
import { userUserStore } from "../../stores/UserStore";
import { useI18n } from "../../components/I18nProvider";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { View } from "react-native";
import {
  Box,
  HamburgerIcon,
  HStack,
  Menu,
  Pressable,
  Stack,
  Text,
} from "native-base";
import { LangSelector } from "../../components/LangSelector";
import React from "react";

export default function Home() {
  const { user } = useAuthStore();
  const userStore = userUserStore();
  const { t } = useI18n();

  return (
    <View>
      <Stack space={4}>
        <Stack px={5}>
          <Text>
            {t("welcome")} {userStore.user.name}
          </Text>
          <Text>
            {t("role")}: {t(userStore.user.role)}
          </Text>
        </Stack>
      </Stack>
    </View>
  );
}
