/* 
    A function that will check on the server if the required username
    is available
*/
export default (username: string): Promise<boolean> => {
    const url = new URL(`${process.env.SERVER_URL}/available`)
    const params = { username }
    url.search = new URLSearchParams(params).toString();
    return fetch(url.toString())
        .then(response => response.json())
}