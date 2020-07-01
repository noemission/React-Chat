/* 
    A function that returns a pseudo random id in the format
    "xxxx-xxxx-xxxx-xxxx-xxxx"
*/
export default () => {
    return Array(5)
        .fill(undefined)
        .map(x => parseInt('' + Math.random() * 10e3))
        .join('-')
}