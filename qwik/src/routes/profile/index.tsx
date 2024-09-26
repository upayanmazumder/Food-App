import { component$ } from "@builder.io/qwik";
import type { DocumentHead, RequestHandler } from "@builder.io/qwik-city";
import { useSignOut, useSession } from '~/routes/plugin@auth';
import sessionStyles from "../../components/auth/session/session.module.css";
import { Form } from '@builder.io/qwik-city';
import Infobox from "../../components/infobox/infobox";
import profileStyles from "./profile.module.css";

export const onRequest: RequestHandler = (event) => {
  const session = event.sharedMap.get("session");
  if (!session || new Date(session.expires) < new Date()) {
    throw event.redirect(302, `/a/notsignedin/`);
  }
};

export default component$(() => {
  const session = useSession();
  const signOut = useSignOut();

  const isSignedIn = session.value?.user;

  return (
    <>
      <div role="presentation" class="ellipsis"></div>

      {isSignedIn ? (
        <div class="container container-center">
          <h3>
            Your <span class="highlight">Profile</span>
          </h3>
          <br />
          
          <Infobox>
            <div class={sessionStyles.userInfo}>
              <p id="p1" class={profileStyles.p}>{session.value.user?.name}</p>
              <p id="p2" class={profileStyles.p}>{session.value.user?.email}</p>
            </div>
          </Infobox>

          <br/>
          <p><a href='/profile/allergens' id="links">Set up Allergens ↪</a></p>

          <Form action={signOut} class={sessionStyles.form}>
            <input type="hidden" name="redirectTo" value="/a/signedout" />
            <button class={sessionStyles.button}>Sign Out</button>
          </Form>
        </div>
      ) : (
        <div class="container container-center container-spacing-xl">
          You must be signed in!
        </div>
      )}
    </>
  );
});

export const head: DocumentHead = {
  title: "Profile",
  meta: [
    {
      name: "description",
      content: "Configure your profile",
    },
  ],
};
