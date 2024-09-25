import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <>
      <div role="presentation" class="ellipsis"></div>
      <div class="container container-center">
        <h1>404</h1>
        <br />
        <p>Sorry, the page you are looking for does not exist.</p>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "404 - Page Not Found",
  meta: [
    {
      name: "description",
      content: "The page you are looking for does not exist.",
    },
  ],
};
