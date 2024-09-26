import { component$, Slot, useStyles$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { RequestHandler } from "@builder.io/qwik-city";

import Header from "../components/header/header";
import SecondaryFooter from "../components/secondary-footer/secondary-footer"
import Footer from "../components/footer/footer";

import styles from "./styles.css?inline";

export const onGet: RequestHandler = async ({ cacheControl }) => {

  cacheControl({
    staleWhileRevalidate: 60 * 60 * 24 * 7,

    maxAge: 5,
  });
};

export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: new Date().toISOString(),
  };
});

export default component$(() => {
  useStyles$(styles);
  return (
    <>
      <Header />
      <main>
        <Slot />
      </main>
      <SecondaryFooter />
      <Footer />
    </>
  );
});
