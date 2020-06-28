export default (date : Date) => {
    return date.toLocaleTimeString([],{
        hour:'2-digit',
        minute: '2-digit',
        hour12: true
    })
}