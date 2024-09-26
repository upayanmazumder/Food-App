import { component$, $ } from '@builder.io/qwik';
import type { DocumentHead, RequestHandler } from "@builder.io/qwik-city";
import { useSession } from '~/routes/plugin@auth';
import { useStore } from '@builder.io/qwik'; // Import useStore for reactive state management
import styles from "./upload.module.css";

export const onRequest: RequestHandler = (event) => {
  const session = event.sharedMap.get("session");
  if (!session || new Date(session.expires) < new Date()) {
    throw event.redirect(302, `/a/notsignedin/`);
  }
};

export default component$(() => {
  const session = useSession();
  const formData = useStore({
    title: '',
    description: '',
    email: session.value?.user?.email || '',
    fileName: null as string | null,
  });

  const handleSubmit = $(async (event: Event) => {
    event.preventDefault();

    const fd = new FormData();
    fd.append('email', formData.email); 
    fd.append('title', formData.title);
    fd.append('description', formData.description);

    const fileInput = document.getElementById('image') as HTMLInputElement;
    const selectedFile = fileInput.files?.[0]; 

    if (selectedFile) {
      fd.append('image', selectedFile); 
    } else {
      alert('Please select an image to upload.');
      return;
    }

    try {
      const response = await fetch('http://food-app-api.upayan.space/api/createpost', {
        method: 'POST',
        body: fd,
      });

      console.log('Response status:', response.status);
      console.log('Response body:', await response.text());

      if (response.ok) {
        alert('Post created successfully!');
        // Reset form data
        formData.title = '';
        formData.description = '';
        formData.email = ''; 
        formData.fileName = null;
      } else {
        const errorMsg = await response.text();
        alert(`Failed to create post: ${errorMsg}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while creating the post.');
    }
  });

  const handleFileChange = $(async (event: Event) => {
    const target = event.target as HTMLInputElement;
    formData.fileName = target.files?.[0]?.name || null;
  });

  return (
    <div class={styles.container}>
      <h1 class={styles.h1}>Add to feed</h1>
      <form onSubmit$={handleSubmit}>
        <div class={styles.formGroup}>
          <label for="title">Name :</label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onInput$={(e) => (formData.title = (e.target as HTMLInputElement).value)}
            required
            class={styles.input}
          />
        </div>
        <div class={styles.formGroup}>
          <label for="description">Recipe :</label>
          <textarea
            id="description"
            value={formData.description}
            onInput$={(e) => (formData.description = (e.target as HTMLTextAreaElement).value)}
            required
            class={styles.textarea}
          />
        </div>
        <div class={styles.formGroup}>
          <label for="image">Select a picture</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange$={handleFileChange}
            required
            class={styles.fileInput}
          />
        </div>
        <button type="submit" class={styles.button}>Add</button>
      </form>
      {formData.fileName && <p>Selected File: {formData.fileName}</p>}
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
