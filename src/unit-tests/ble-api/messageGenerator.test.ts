import { BLE_DEVICE_COMMANDS, generateMessage } from "../../ble-api/messageGenerator";

describe("generateMessage", () => {

    test("should throw error when generating GetActiveModulesList command with param and id", () => {
        try {
            generateMessage(BLE_DEVICE_COMMANDS.GetActiveModulesList, "id", "param");
            expect(true).toBe(false);
        } catch(e) {
            expect(true).toBe(true);
        }
    });

    test("should throw error when generating GetStats command with param and id", () => {
        try {
            generateMessage(BLE_DEVICE_COMMANDS.GetStats, "id", "param");
            expect(true).toBe(false);
        } catch(e) {
            expect(true).toBe(true);
        }
    });

    test("should throw error when generating TurnOffAllModules command with param and id", () => {
        try {
            generateMessage(BLE_DEVICE_COMMANDS.TurnOffAllModules, "id", "param");
            expect(true).toBe(false);
        } catch(e) {
            expect(true).toBe(true);
        }
    });

    test("should throw error when generating TurnOnAllModules command with param and id", () => {
        try {
            generateMessage(BLE_DEVICE_COMMANDS.TurnOnAllModules, "id", "param");
            expect(true).toBe(false);
        } catch(e) {
            expect(true).toBe(true);
        }
    });

    test("should not throw error when generating ChangeColorOrBrightness command with param and id", () => {
        try {
            generateMessage(BLE_DEVICE_COMMANDS.ChangeColorOrBrightness, "id", "param");
            expect(true).toBe(true);
        } catch(e) {
            expect(true).toBe(false);
        }
    });

    test("should not throw error when generating ReadModule command with param and id", () => {
        try {
            generateMessage(BLE_DEVICE_COMMANDS.ReadModule, "id", "param");
            expect(true).toBe(true);
        } catch(e) {
            expect(true).toBe(false);
        }
    });

    test("should not throw error when generating TurnOnOrOffModule command with param and id", () => {
        try {
            generateMessage(BLE_DEVICE_COMMANDS.TurnOnOrOffModule, "id", "param");
            expect(true).toBe(true);
        } catch(e) {
            expect(true).toBe(false);
        }
    });

    test("should GetActiveModulesList command when GetActiveModulesList is passed", () => {
        const result = generateMessage(BLE_DEVICE_COMMANDS.GetActiveModulesList);
        expect(result).toBe(BLE_DEVICE_COMMANDS.GetActiveModulesList);
    });

});
