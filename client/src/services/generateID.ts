export default () => {
    return Array(5)
        .fill(undefined)
        .map(x => parseInt('' + Math.random() * 10e3))
        .join('-')
}