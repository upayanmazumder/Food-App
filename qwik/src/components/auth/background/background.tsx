import { component$ } from "@builder.io/qwik";
import styles from "./background.module.css";
import ImgThunder from "../../../media/authentication/background.jpg?jsx";

export default component$(() => {
  return (
    <div class={["container", styles.hero]}>
      <ImgThunder class={styles["hero-image"]} alt="Image thunder" />
      <div class="container container-center container-spacing-xl">
      </div>
    </div>
  );
});
