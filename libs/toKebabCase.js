/**
 * Given a string, converts it to kebab case (lowercase, hyphen-separated). For example,
 * "makeFoo" becomes "make-foo", and "a Multi Word string" becomes "a-multi-word-string".
 *
 * @param {string} string Your input string.
 * @returns {string} Kebab-cased string.
 */

export function toKebabCase(string) {
    let result = string;

    // Convert non-camelCase capitals to lowercase.
    result = result.toLowerCase();

    // Convert accented characters to non accented 

    result = result
        .replace(/[ÀÁÂÃÄÅ]/g,"A")
        .replace(/[àáâãäå]/g,"a")
        .replace(/[ÈÉÊË]/g,"E")
        .replace(/[èéêë]/g,"e")
        .replace(/[ÎÏ]/g,"I")
        .replace(/[îï]/g,"i")
        .replace(/[ÔÖ]/g,"O")
        .replace(/[ôö]/g,"o")
        .replace(/[ÛÜ]/g,"U")
        .replace(/[ûü]/g,"u")

    // Convert non-alphanumeric characters to hyphens
    result = result.replace(/[^-a-z0-9]+/g, '-');

    // Remove hyphens from both ends
    result = result.replace(/^-+/, '').replace(/-+$/, '');

    // Remove double hyphens from both ends
    result = result.replace(/-{2,}/, '-');

    return result;
}