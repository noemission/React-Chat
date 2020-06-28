export default (username: string): Promise<boolean> => {
    const url = new URL('http://localhost:3000/available')
    const params = { username }
    url.search = new URLSearchParams(params).toString();

    return fetch(url.toString())
        .then(response => response.json())
}