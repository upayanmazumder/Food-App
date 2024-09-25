import { component$, useTask$, useStore, $ } from "@builder.io/qwik";
import styles from "./allergens.module.css";
import ImgThunder from "../../media/food.jpg?jsx";

// Define a type for the allergens state
interface AllergensState {
  allergens: string[];
}

export default component$(() => {
  const state = useStore<AllergensState>({ allergens: [] });

  useTask$(() => {
    // Fetch allergens from the API
    fetch("http://food-app-api.upayan.space/api/allergens")
      .then((response) => {
        // Check if the response is okay
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        state.allergens = data.allergens;
      })
      .catch((error) => console.error("Error fetching allergens:", error));
  });

  // Function to handle button click
  const handleButtonClick = $((allergen: string) => {
    console.log(`Button clicked for allergen: ${allergen}`);
    // Add any additional logic here (e.g., update user preferences)
  });

  return (
    <div class={["container", styles.hero]}>
      <ImgThunder class={styles["hero-image"]} alt="Image thunder" />
      <div class="container container-center container-spacing-xl">
        <h3>Update your allergens</h3>
        <ul>
          {state.allergens.length > 0 ? (
            state.allergens.map((allergen) => (
              <li key={allergen}>
                {allergen}
                <button onClick$={() => handleButtonClick(allergen)}>
                  Update
                </button>
              </li>
            ))
          ) : (
            <li>No allergens found</li>
          )}
        </ul>
      </div>
    </div>
  );
});
