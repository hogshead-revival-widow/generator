export const toDataURI = (ahk: string) => {
    const mimeType = 'data:application/ahk;charset=UTF-8';
    return `${mimeType},${encodeURIComponent(ahk)}`;
};
