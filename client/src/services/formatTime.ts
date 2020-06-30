export default (date : Date, hour12: boolean) => {
    return date.toLocaleTimeString([],{
        hour:'2-digit',
        minute: '2-digit',
        hour12
    })
}