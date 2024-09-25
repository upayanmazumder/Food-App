import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

import Infobox from "../../components/infobox/infobox";

export default component$(() => {
  return (
    <>
      <div class="container container-center container-spacing-xl">
        <h3>Our Favorite Recipes</h3>
        <br />
        <p>Discover a variety of delicious recipes that are easy to make and perfect for any occasion!</p>
      </div>

      <div class="container container-flex">
        <Infobox>
          <div q:slot="title" class="icon icon-appetizer">
            Appetizers
          </div>
          <>
            <p>
              Start your meal off right with our collection of mouth-watering appetizers. From light and fresh salads to crispy, golden-fried bites, there's something to suit every taste.
            </p>
          </>
        </Infobox>

        <Infobox>
          <div q:slot="title" class="icon icon-main">
            Main Courses
          </div>
          <>
            <p>
              Find hearty and flavorful main dishes that range from classic comfort foods to innovative creations. Whether you're in the mood for a savory pasta or a juicy steak, these recipes will not disappoint.
            </p>
          </>
        </Infobox>

        <Infobox>
          <div q:slot="title" class="icon icon-dessert">
            Desserts
          </div>
          <>
            <p>
              Satisfy your sweet tooth with our indulgent dessert recipes. From decadent chocolate cakes to fruity tarts, these desserts are perfect for any celebration or just a simple treat.
            </p>
          </>
        </Infobox>
      </div>

      <div class="container container-flex">
        <Infobox>
          <div q:slot="title" class="icon icon-vegetarian">
            Vegetarian
          </div>
          <>
            <p>
              Explore a variety of vegetarian recipes packed with fresh vegetables, grains, and flavorful seasonings. Perfect for both vegetarians and those looking to add more plant-based meals to their diet.
            </p>
          </>
        </Infobox>

        <Infobox>
          <div q:slot="title" class="icon icon-glutenfree">
            Gluten-Free
          </div>
          <>
            <p>
              Enjoy delicious gluten-free meals that everyone will love. These recipes are carefully crafted to ensure flavor and texture without gluten.
            </p>
          </>
        </Infobox>

        <Infobox>
          <div q:slot="title" class="icon icon-vegan">
            Vegan
          </div>
          <>
            <p>
              Our vegan recipes are full of fresh, vibrant ingredients and are perfect for anyone looking to enjoy plant-based meals without sacrificing taste or nutrition.
            </p>
          </>
        </Infobox>
      </div>

    </>
  );
});

export const head: DocumentHead = {
  title: "Recipes",
  meta: [
    {
      name: "description",
      content: "Explore our collection of delicious and easy-to-make recipes!"
    }
  ]
};
