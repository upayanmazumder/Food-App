import { QwikAuth$ } from "@auth/qwik";
import Google from "@auth/qwik/providers/google";

export const { onRequest, useSession, useSignIn, useSignOut } = QwikAuth$(
  () => {

    return {
      providers: [Google],
      pages: {
        signIn: "/a/signin/",
        signOut: "/a/signout/",
        signedOut: "/a/signedout/"
      }
    };
  },
);