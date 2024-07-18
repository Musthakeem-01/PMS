 export const apiPostRequest = async(apiUrl, requestData) => {
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
          // Add any additional headers if required
        },
        body: JSON.stringify(requestData)
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
