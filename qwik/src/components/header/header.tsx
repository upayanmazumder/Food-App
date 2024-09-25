
import ImgIconTransparent from '../../media/icon-transparent.png?jsx';
import { component$ } from "@builder.io/qwik";
import styles from "./header.module.css";
import Sessions from "../auth/session/session"
export default component$(() => {
  return (
    <header class={styles.header}>
      <div class={styles.container}>
        <div class={styles.logoContainer}>
          <ImgIconTransparent alt="Food App" class={styles.logoImage} />
          <h2 class={styles.logoText}>Fork Life</h2>
        </div>
        <nav class={styles.nav}>
          <ul class={styles.navList}>
            <li> <a href="/">Home</a></li>
            <li> <a href='/recipes'>Recipes</a></li>
            <li><a href='/upload'>Flavour Flash</a></li>          
          </ul>
        </nav>
        <Sessions />
      </div>
    </header>
  );
});
