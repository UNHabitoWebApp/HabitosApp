async function patchData(url, body) {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        throw new Error('No access token found in local storage');
    }

    const response = await fetch("http://localhost:8080/" + url, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
}

export default patchData;