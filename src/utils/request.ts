export async function request(url: string, options: RequestInit) {
    const response = await fetch(url, options);
  
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
  
    return response.json();
  }
  