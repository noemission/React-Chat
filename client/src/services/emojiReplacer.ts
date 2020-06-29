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