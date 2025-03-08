const postData = async (url, data) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await fetch("http://localhost:8080" + url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Error making POST request: ' + response.statusText);
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error making POST request:', error);
        throw error;
    }
};

export default postData;