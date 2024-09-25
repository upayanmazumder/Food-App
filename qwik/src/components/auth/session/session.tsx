import { component$, useSignal, $, useTask$ } from '@builder.io/qwik';
import { useSession, useSignIn } from '~/routes/plugin@auth';
import sessionStyles from "./session.module.css";
import { Form } from '@builder.io/qwik-city';
import { BsGoogle } from "@qwikest/icons/bootstrap";
import unknownPerson from "../../../media/authentication/unknown-person.png"

export default component$(() => {
  const session = useSession();
  const signIn = useSignIn();
  const isSignedIn = session.value?.user;

  // Signal to hold the response or status after POST request
  const signupStatus = useSignal<string>('Not yet signed up');

  // Function to handle the POST request to /signup
  const signup = $(async (email: string) => {
    try {
      const response = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
        signupStatus.value = 'Signed up successfully!';
      } else {
        signupStatus.value = `Failed to sign up: ${response.status}`;
      }
    } catch (error) {
      if (error instanceof Error) {
        signupStatus.value = `Error: ${error.message}`;
      } else {
        signupStatus.value = 'An unknown error occurred';
      }
    }
  });

  // Trigger the signup task when user is signed in and has an email
  useTask$(({ track }) => {
    const email = track(() => session.value?.user?.email);
    if (email) {
      signup(email);
    }
  });

  return (
    <div class={sessionStyles.container}>
      {isSignedIn ? (
        <>
          <a href="/profile">
            <div class={sessionStyles.imgContainer}>
              <img
                class={sessionStyles.img}
                src={session.value.user?.image ?? unknownPerson}
                loading="lazy"
                alt={session.value.user?.name ?? 'User Icon'}
                width="80"
                height="80"
              />
            </div>
          </a>
          <div class={sessionStyles.userInfo}>
            <p>{session.value.user?.name}</p>
            <p>{session.value.user?.email}</p>
          </div>
          <div class={sessionStyles.signupStatus}>
            <p>{signupStatus.value}</p>
          </div>
        </>
      ) : (
        <Form action={signIn} class={sessionStyles.form}>
          <input type="hidden" name="providerId" value="google" />
          <input type="hidden" name="options.redirectTo" value="/a/signedin" />
          <button class={sessionStyles.iconButton}>
            <BsGoogle />
          </button>
        </Form>
      )}
    </div>
  );
});
