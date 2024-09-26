import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import AuthBg from "../../../media/authentication/background.jpg?jsx"
import styles from "../auth.module.css"
export default component$(() => {
  return (
    <>
    <AuthBg class={styles["hero-image"]} alt="Image thunder" />
      <div class="container container-center container-spacing-xl">
        <h3>Signed out!</h3>
        <p>You are now signed out!</p>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Signed Out Successfully!",
};