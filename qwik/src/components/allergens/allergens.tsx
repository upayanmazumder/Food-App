import { component$ } from "@builder.io/qwik";
import styles from "./allergens.module.css";
import ImgThunder from "../../media/food.jpg?jsx";

export default component$(() => {
  return (
    <div class={["container", styles.hero]}>
      <ImgThunder class={styles["hero-image"]} alt="Image thunder" />
      <div class="container container-center container-spacing-xl">
        <h3>
          Update your allergens
        </h3>
      </div>
    </div>
  );
});
