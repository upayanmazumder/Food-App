import { QwikAuth$ } from "@auth/qwik";
import Google from "@auth/qwik/providers/google";

export const { onRequest, useSession, useSignIn, useSignOut } = QwikAuth$(
  () => ({
    providers: [
      Google({
        clientId: process.env.AUTH_GOOGLE_ID,
        clientSecret: process.env.AUTH_GOOGLE_SECRET,
      }),
    ],
  }),
);
