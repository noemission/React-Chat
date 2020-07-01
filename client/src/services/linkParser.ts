/* 
    A utility function that matches all the
    urls in a string.
    Special occasions are links that point to a youtube video or an image
*/
export const linkRegex = /(https?:\/\/\S*)/g
const parseYoutubeLink = (text: string) => {
    const url = new URL(text);
    if (url.hostname.replace('www.', '') === 'youtube.com') {
        return url.searchParams.get('v')
    } else if (url.hostname.replace('www.', '') === 'youtu.be') {
        return url.pathname.replace('/', '')
    }
    return null
}
const isImageLink = (text: string): Promise<boolean> => {
    return new Promise((resolve) => {
        const img = new Image()
        img.onload = () => resolve(true)
        img.onerror = () => resolve(false)
        img.src = text
    })
}

export type LinkMatch = {
    link: string,
    from: number,
    to: number,
    youtubeID?: string | null,
    isImage?: boolean
}

export default async (text: string) => {
    let matches: LinkMatch[] = [];
    text.replace(linkRegex, (_, match, index) => {
        matches.push({
            link: match,
            from: index,
            to: index + match.length
        })
        return match;
    });
    return await Promise.all(matches.map(async match => {
        const youtubeID = parseYoutubeLink(match.link);
        let isImage = false;
        if (!youtubeID) {
            isImage = await isImageLink(match.link)
        }

        return {
            ...match,
            youtubeID,
            isImage
        }
    }))
}