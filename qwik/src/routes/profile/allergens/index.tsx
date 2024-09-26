import { component$, useVisibleTask$, useStore, $ } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import type { DocumentHead, RequestHandler } from "@builder.io/qwik-city";
import { useSession } from '~/routes/plugin@auth';
import styles from './allergens.module.css'; 

interface AllergenResponse {
  allergens: string[];
}

interface UserAllergyResponse {
  allergies: string[];
}

interface AllergenStore {
  allergens: string[];
  selectedAllergies: string[];
  userAllergies: string[];
  loading: boolean;
  error: string | null;
  successMessage: string | null;
}

export const onRequest: RequestHandler = (event) => {
  const session = event.sharedMap.get("session");
  if (!session || new Date(session.expires) < new Date()) {
    throw event.redirect(302, '/a/notsignedin/');
  }
};

export default component$(() => {
  const session = useSession();
  const store = useStore<AllergenStore>({
    allergens: [],
    selectedAllergies: [],
    userAllergies: [],
    loading: true,
    error: null,
    successMessage: null,
  });

  const navigate = useNavigate(); // Use Qwik's navigate utility

  // Fetch allergens from the API and user's allergies
  useVisibleTask$(() => {
    const fetchAllergens = async () => {
      try {
        // Fetch available allergens immediately
        const allergenResponse = await fetch('https://food-app-api.upayan.space/api/allergens');
        if (!allergenResponse.ok) {
          throw new Error('Network response was not ok');
        }

        const allergensData: AllergenResponse = await allergenResponse.json();
        store.allergens = allergensData.allergens;

        // Delay fetching user allergies by 2 seconds (2000 ms)
        setTimeout(async () => {
          try {
            const userAllergyResponse = await fetch(`http://food-app-api.upayan.space/api/get-allergies?email=${session.value?.user?.email}`);
            if (!userAllergyResponse.ok) {
              throw new Error('Network response was not ok');
            }
            const userAllergiesData: UserAllergyResponse = await userAllergyResponse.json();

            store.userAllergies = userAllergiesData.allergies; // Set user's allergies

            // Preselect user's allergies
            store.selectedAllergies = userAllergiesData.allergies;

          } catch (error) {
            store.error = (error as Error).message;
          } finally {
            store.loading = false; // Ensure loading is set to false after both requests
          }
        }, 2000); // 2 seconds delay

      } catch (error) {
        store.error = (error as Error).message;
        store.loading = false; // Set loading to false if there's an error
      }
    };

    fetchAllergens();
  });

  // Toggle allergen selection
  const toggleAllergen = $((allergen: string) => {
    const index = store.selectedAllergies.indexOf(allergen);
    if (index === -1) {
      store.selectedAllergies.push(allergen);
    } else {
      store.selectedAllergies.splice(index, 1);
    }
  });

  // Submit the selected allergens to the API
  const submitAllergens = $(async () => {
    store.loading = true;
    try {
      const response = await fetch('https://food-app-api.upayan.space/api/update-allergies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: session.value?.user?.email,
          allergies: store.selectedAllergies,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to update allergens');
      }
      store.successMessage = 'Allergies updated successfully!';
      
      // Redirect to /recipes upon successful update
      navigate('/recipes');
    } catch (error) {
      store.error = (error as Error).message;
    } finally {
      store.loading = false;
    }
  });

  return (
    <>
      <div class="container container-center">
        <div role="presentation" class="ellipsis"></div>
        {store.loading && <p>Loading allergens...</p>}
        {store.error && <p>Error: {store.error}</p>}
        {store.successMessage && <p>{store.successMessage}</p>}
        {store.allergens.length > 0 && (
          <ul>
            {store.allergens.map((allergen) => (
              <li key={allergen}>
                <button
                  onClick$={() => toggleAllergen(allergen)}
                  class={`${styles.button} ${store.selectedAllergies.includes(allergen) ? styles.selected : ''} ${store.userAllergies.includes(allergen) ? styles.userAllergy : ''}`}
                >
                  {allergen}
                </button>
              </li>
            ))}
          </ul>
        )}
        <button
          onClick$={submitAllergens}
          class={styles.button}
          disabled={store.loading || store.selectedAllergies.length === 0}
        >
          Submit
        </button>
      </div>
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
