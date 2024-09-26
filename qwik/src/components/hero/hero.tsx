import { component$ } from "@builder.io/qwik";
import styles from "./hero.module.css";
import ImgThunder from "../../media/image.png?jsx";

export default component$(() => {
  return (
    <div class={["container", styles.hero]}>
      <ImgThunder class={styles["hero-image"]} alt="Image thunder" />
      <div class="container container-center container-spacing-xl">
        <h2>
          Connect with <span class="highlight">Flavour</span>
        </h2>
      </div>
    </div>
  );
});
