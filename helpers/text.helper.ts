export const capitalize1stLetterOfEachWord = (sentence: string | undefined): string => {
    if (sentence) {
        const words = sentence.split(" ");
        words.map((word, index) => {
            words[index] = [word[0].toLocaleUpperCase(), ...word.slice(1, word?.length).split("")].join("");
        });
        return words?.join(" ");
    } else {
        return "";
    }
};

export const truncateString = (string: string | undefined, returnLength: number = 10): string => {
    if (string) {
        const formattedString = string.slice(0, returnLength);
        return string.length > formattedString.length ? formattedString + "..." : formattedString;
    } else {
        return "";
    }
};
