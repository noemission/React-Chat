/* 
    Utility function that converts "false" to false and "true" to true
    Very helpful for handling values passed in an <option> element
*/
export default (val: any): boolean => {
    if (val && typeof val === 'string') {
        if (val.toLowerCase() === "true") return true;
        if (val.toLowerCase() === "false") return false;
    }
    return val;
}