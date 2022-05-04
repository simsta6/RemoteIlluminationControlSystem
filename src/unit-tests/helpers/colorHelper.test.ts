import { isHexColor, shadeColorIfNeeded } from "../../helpers/colorHelper";

describe("shadeColorIfNeeded", () => {

    const white = "#FFFFFF";
    const black = "#000000";

    test("should return white color when given color is white and percent is 100", () => {
        const result = shadeColorIfNeeded(white, 100);

        expect(result.toUpperCase()).toBe(white.toUpperCase());
    });

    test("should return black color when given color is white and percent is 0", () => {
        const result = shadeColorIfNeeded(white, 0);

        expect(result.toUpperCase()).toBe(black.toUpperCase());
    });

    test("should return black color when given color is black and percent is 100", () => {
        const result = shadeColorIfNeeded(black, 100);

        expect(result.toUpperCase()).toBe(black.toUpperCase());
    });

    test("should return black color when given color is black and percent is 0", () => {
        const result = shadeColorIfNeeded(black, 0);

        expect(result.toUpperCase()).toBe(black.toUpperCase());
    });
});

describe("isHexColor", () => {

    const white = "#FFFFFF";

    test("should return true when valid color in upper case is passed", () => {
        const result = isHexColor(white);

        expect(result).toBe(true);
    });

    test("should return true when valid color in lower case is passed", () => {
        const result = isHexColor(white.toLowerCase());

        expect(result).toBe(true);
    });

    test("should return false when # is missing", () => {
        const result = isHexColor("FFFFFF");

        expect(result).toBe(false);
    });

    test("should return false when given color has length lesser than 7", () => {
        const result = isHexColor("#FFFFF");

        expect(result).toBe(false);
    });

    test("should return false when given color has length greater than 7", () => {
        const result = isHexColor("#FFFFFFF");

        expect(result).toBe(false);
    });
});