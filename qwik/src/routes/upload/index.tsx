import { component$, useSignal, $ } from '@builder.io/qwik';
import type { DocumentHead } from "@builder.io/qwik-city";
import { useSession } from '~/routes/plugin@auth';
import styles from './upload.module.css';

export default component$(() => {
  const title = useSignal('');
  const description = useSignal('');
  const session = useSession();
  const email = useSignal(session.value?.user?.email);
  const fileName = useSignal<string | null>(null);

  const handleSubmit = $(async (event: Event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('email', email.value || '');
    formData.append('title', title.value);
    formData.append('description', description.value);

    const fileInput = document.getElementById('image') as HTMLInputElement;
    const selectedFile = fileInput.files?.[0];

    if (selectedFile) {
      formData.append('image', selectedFile);
    } else {
      alert('Please select an image to upload.');
      return;
    }

    try {
      const response = await fetch('http://food-app-api.upayan.space/api/createpost', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Post created successfully!');
        title.value = '';
        description.value = '';
        email.value = '';
        fileName.value = null;
      } else {
        alert('Failed to create post.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while creating the post.');
    }
  });

  const handleFileChange = $(async (event: Event) => {
    const target = event.target as HTMLInputElement;
    fileName.value = target.files?.[0]?.name || null;
  });

  return (
    <div class={styles['create-post-container']}>
      <h2 class={styles.h2}>Post a feed</h2>
      <form onSubmit$={handleSubmit}>
        <div>
          <br></br>
          <br></br>
          <label for="title">Name :</label>
          <br></br><br></br>
          <input
            type="text"
            id="title"
            value={title.value}
            onInput$={(e) => (title.value = (e.target as HTMLInputElement).value)}
            required
          />
        </div>
        <div>
          <label for="description">Recipe :</label>
          <br></br><br></br>
          <textarea
            id="description"
            value={description.value}
            onInput$={(e) => (description.value = (e.target as HTMLTextAreaElement).value)}
            required
          />
        </div>
        <div>
          <label for="image">Select Image:</label>
          <br></br>
          <br></br>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange$={handleFileChange}
            required
          />
        </div>
        <button type="submit" class={styles.css}>Create Post</button>
      </form>
      {fileName.value && <p>Selected File: {fileName.value}</p>}
    </div>
  );
});

export const head: DocumentHead = {
  title: "Upload",
  meta: [
    {
      name: "description",
      content: "Create a new post"
    }
  ]
};
