import { component$ } from "@builder.io/qwik";
import type { DocumentHead, RequestHandler } from "@builder.io/qwik-city";
import { useSignOut, useSession } from '~/routes/plugin@auth';
import sessionStyles from "../../components/auth/session/session.module.css";
import { Form } from '@builder.io/qwik-city';
import Allergens from "../../../components/allergens/allergens"

export const onRequest: RequestHandler = (event) => {
  const session = event.sharedMap.get("session");
  if (!session || new Date(session.expires) < new Date()) {
    throw event.redirect(302, `/a/notsignedin/`);
  }
};

export default component$(() => {

  return (
    <>
      <div role="presentation" class="ellipsis"></div>
      <Allergens />
      
    </>
  );
});

export const head: DocumentHead = {
  title: "Allergens",
  meta: [
    {
      name: "description",
      content: "Configure your allergens",
    },
  ],
};
