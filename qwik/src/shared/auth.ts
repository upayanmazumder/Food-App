export const signupUser = async (email: string): Promise<string> => {
    try {
      const response = await fetch(`http://food-app-api.upayan.space/api/auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
  
      if (response.ok) {
        return 'Signed up successfully!';
      } else {
        return `Failed to sign up: ${response.status}`;
      }
    } catch (error) {
      if (error instanceof TypeError) {
        return 'API is down or network error';
      } else if (error instanceof Error) {
        return `Error: ${error.message}`;
      } else {
        return 'An unknown error occurred';
      }
    }
  };
  