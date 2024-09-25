import { QwikAuth$ } from "@auth/qwik";
import Google from "@auth/qwik/providers/google";

export const { onRequest, useSession, useSignIn, useSignOut } = QwikAuth$(
  () => ({
    providers: [Google],
  }),
);
