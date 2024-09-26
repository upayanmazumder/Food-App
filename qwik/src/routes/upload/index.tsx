import { component$, useSignal, $ } from '@builder.io/qwik';
import type { DocumentHead, RequestHandler } from "@builder.io/qwik-city";
import { useSession } from '~/routes/plugin@auth';
import styles from "./upload.module.css"

export const onRequest: RequestHandler = (event) => {
  const session = event.sharedMap.get("session");
  if (!session || new Date(session.expires) < new Date()) {
    throw event.redirect(302, `/a/notsignedin/`);
  }
};

export default component$(() => {
  const title = useSignal('');
  const session = useSession();
  const description = useSignal('');
  const email = useSignal(session.value?.user?.email);
  const fileName = useSignal<string | null>(null);

  const handleSubmit = $(async (event: Event) => {
    event.preventDefault();

    // Create FormData object to send with the POST request
    const formData = new FormData();
    formData.append('email', email.value || ''); 
    formData.append('title', title.value);
    formData.append('description', description.value);

    // Get the file input element directly
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
    <div class="create-post-container">
      <h1>Create a New Post</h1>
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
          <label for="description">Description:</label>
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
        <button type="submit">Create Post</button>
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
