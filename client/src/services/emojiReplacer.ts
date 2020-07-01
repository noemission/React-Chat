/* 
    A function that given a text it will replace all emoji signs :) :D ...
    with the corresponding emoji icons
*/
const emojiMap = {
    ':)': '🙂',
    ':D': '😃',
    ':P': '😛',
    ':(': '🙁'
}

const escapeRegExp = (str: string) => str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

const regex = new RegExp(Object.keys(emojiMap).map(escapeRegExp).join('|'), "g")

export default (text: string) => {
    return text.replace(regex, (match: keyof typeof emojiMap) => emojiMap[match])
}