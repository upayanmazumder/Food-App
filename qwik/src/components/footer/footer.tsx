/* eslint-disable qwik/jsx-a */
import { component$ } from "@builder.io/qwik";
import styles from "./footer.module.css";

export default component$(() => {

  return (
    <footer class={styles.footer}>
      <a class={styles.anchor}>
        Built with <span>♡ by Byte Me</span>
      </a>
    </footer>
  );
});
