import { component$, useVisibleTask$, useStore } from "@builder.io/qwik";
import type { DocumentHead, RequestHandler } from "@builder.io/qwik-city";

export const onRequest: RequestHandler = (event) => {
  const session = event.sharedMap.get("session");
  if (!session || new Date(session.expires) < new Date()) {
    throw event.redirect(302, `/a/notsignedin/`);
  }
};

// Define an interface for the allergens
interface AllergenResponse {
  allergens: string[];
}

export default component$(() => {
  const store = useStore<{ allergens: string[]; loading: boolean; error: string | null }>({
    allergens: [],
    loading: true,
    error: null,
  });

  // Fetch allergens from the API
  useVisibleTask$(() => {
    const fetchAllergens = async () => {
      try {
        const response = await fetch('https://food-app-api.upayan.space/api/allergens');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: AllergenResponse = await response.json();
        store.allergens = data.allergens;
      } catch (error) {
        store.error = (error as Error).message;
      } finally {
        store.loading = false;
      }
    };

    fetchAllergens();
  });

  return (
    <>
      <div role="presentation" class="ellipsis"></div>
      {store.loading && <p>Loading allergens...</p>}
      {store.error && <p>Error fetching allergens: {store.error}</p>}
      {store.allergens.length > 0 && (
        <ul>
          {store.allergens.map((allergen) => (
            <li key={allergen}>
              <button onClick$={() => console.log(allergen)}>{allergen}</button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
});

export const head: DocumentHead = {
  title: "Allergens",
  meta: [
    {
      name: "description",
      content: "Configure your allergens",
    },
  ],
};
