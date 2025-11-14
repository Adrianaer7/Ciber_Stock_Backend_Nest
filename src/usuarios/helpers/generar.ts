export const generarId = (): string => {
    const array = new Uint8Array(16);
    crypto.getRandomValues(array);

    const hexId = Array.from(array)
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");

    return hexId;
}