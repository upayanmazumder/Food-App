import { component$, useSignal, $, useTask$ } from '@builder.io/qwik';
import { useSession, useSignIn } from '~/routes/plugin@auth';
import sessionStyles from "./session.module.css";
import { Form } from '@builder.io/qwik-city';
import { BsGoogle } from "@qwikest/icons/bootstrap";
import unknownPerson from "../../../media/authentication/unknown-person.png";
import { signupUser } from '../../../shared/auth';

export default component$(() => {
  const session = useSession();
  const signIn = useSignIn();
  const isSignedIn = session.value?.user;

  // Signal to hold the response or status after POST request
  const signupStatus = useSignal<string>('Not yet signed up');

  // Function to handle signup
  const signup = $(async (email: string) => {
    signupStatus.value = await signupUser(email);
  });

  // Trigger the signup task when the component mounts and user has an email
  useTask$(({ track }) => {
    const email = track(() => session.value?.user?.email);
    if (isSignedIn && email) {
      signup(email);
    }
  });

  return (
    <>
      {isSignedIn ? (
        <div class={sessionStyles.container}>
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
        </div>
      ) : (
        <Form action={signIn} class={sessionStyles.form}>
          <input type="hidden" name="providerId" value="google" />
          <input type="hidden" name="options.redirectTo" value="/a/signedin" />
          <button class={sessionStyles.iconButton}>
            <BsGoogle />
          </button>
        </Form>
      )}
    </>
  );
});
