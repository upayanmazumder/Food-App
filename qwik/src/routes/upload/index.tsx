import { component$, useSignal, $ } from '@builder.io/qwik';
import type { DocumentHead } from "@builder.io/qwik-city";
import { useSession } from '~/routes/plugin@auth';

export default component$(() => {
  const title = useSignal('');
  const description = useSignal('');
  const session = useSession();
  const email = useSignal(session.value?.user?.email);
  const fileName = useSignal<string | null>(null);

  const handleSubmit = $(async (event: Event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Create FormData object to send with the POST request
    const formData = new FormData();
    formData.append('email', email.value || '');
    formData.append('title', title.value);
    formData.append('description', description.value);

    // Get the file input element directly
    const fileInput = document.getElementById('image') as HTMLInputElement;
    const selectedFile = fileInput.files?.[0]; // Use optional chaining

    if (selectedFile) {
      formData.append('image', selectedFile); // Append the actual file object
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
        // Clear the form after successful submission
        title.value = '';
        description.value = '';
        email.value = ''; // Reset email to default
        fileName.value = null; // Clear the file name
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

    // Safely set the file name (not the File object)
    fileName.value = target.files?.[0]?.name || null; // Optional chaining to avoid null access
  });

  return (
    <div class="create-post-container">
      <h1>Create a New Post</h1>
      <form onSubmit$={handleSubmit}>
        <div>
          <label for="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title.value}
            onInput$={(e) => (title.value = (e.target as HTMLInputElement).value)}
            required
          />
        </div>
        <div>
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
      {fileName.value && <p>Selected File: {fileName.value}</p>} {/* Display selected file name */}
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
