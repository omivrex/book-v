export const capitalize1stLetterOfEachWord = (sentence?: string): string => {
    if (sentence && typeof sentence === "string") {
        const words = sentence?.split(" ");
        words?.map((word, index) => {
            words[index] = [word[0]?.toLocaleUpperCase(), ...word?.slice(1, word?.length).split("")].join("");
        });
        return words?.join(" ");
    } else {
        return "";
    }
};

export const truncateString = (string?: string, returnLength: number = 10): string => {
    if (string && typeof string === "string") {
        const formattedString = string?.slice(0, returnLength);
        return string?.length > formattedString?.length ? formattedString + "..." : formattedString;
    } else {
        return "";
    }
};
