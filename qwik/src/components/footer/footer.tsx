import { component$ } from "@builder.io/qwik";
import styles from "./footer.module.css";

export default component$(() => {

  return (
    <footer>
      <div class="container">
        <a class={styles.anchor}>
          <span></span>
        </a>
      </div>
    </footer>
  );
});
