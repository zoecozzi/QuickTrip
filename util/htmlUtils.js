export const stripHtmlTags = (html) => {
    const regex = /(<([^>]+)>)/gi;
    return html.replace(regex, '');
};