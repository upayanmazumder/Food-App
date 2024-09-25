import { component$ } from "@builder.io/qwik";
import styles from "./hero.module.css";
import ImgThunder from "../../media/food.jpg?jsx";

export default component$(() => {
  return (
    <div class={["container", styles.hero]}>
      <ImgThunder class={styles["hero-image"]} alt="Image thunder" />
      <div class="container container-center container-spacing-xl">
        <h2>
          Connect with <span class="highlight">F</span>
          <span class="high1">L</span>
          <span class="high2">A</span>
          <span class="high3">V</span>
          <span class="high4">O</span>
          <span class="high5">U</span>
          <span class="high6">R</span>
        </h2>
      </div>
    </div>
  );
});
