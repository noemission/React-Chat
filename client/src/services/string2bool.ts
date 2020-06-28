export default (val: any): boolean => {
    if (val && typeof val === 'string') {
        if (val.toLowerCase() === "true") return true;
        if (val.toLowerCase() === "false") return false;
    }
    return val;
}