export const getCurrentTime = () => {
    const now = new Date();
    const formattedHH = now.getHours().toString().padStart(2, "0");
    const formattedMM = now.getMinutes().toString().padStart(2, "0");
    const formattedSS = now.getSeconds().toString().padStart(2, "0");
    return `${formattedHH}:${formattedMM}:${formattedSS}`;
};
