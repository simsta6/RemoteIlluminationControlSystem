export enum BLE_DEVICE_COMMANDS {
    GetActiveModulesList = "LIST",
    GetStats = "STATS",
    TurnOnAllModules = "ON",
    TurnOffAllModules = "OFF",
    // Hex Color string. Brightness for non-RGB determined by first two chars
    ChangeColorOrBrightness = "CLR",
    ReadModule = "ST", // 1 - rgb color, 2 - mA, 3 - mV, 4 - temperature, 5 type (1 - RGB, 0 - nonRGB)
    // 1 or 0 at the end
    TurnOnOrOffModule = "ONF",
}

export enum TurnOnOrOffParameter {
    ON = "1",
    OFF = "0",
}

export enum ReadModuleParameter {
    GetRgbColor = "1",
    GetCurrent = "2",
    GetVoltage = "3",
    GetTemperature = "4",
    GetBulbType = "5",
}

// id should be in hex
// parameter should be hex color code or 1 | 0
export const generateMessage = (command: BLE_DEVICE_COMMANDS, id?: string, parameter?: TurnOnOrOffParameter | ReadModuleParameter | string) => {
    switch(command) {
    case BLE_DEVICE_COMMANDS.ChangeColorOrBrightness:
    case BLE_DEVICE_COMMANDS.ReadModule:
    case BLE_DEVICE_COMMANDS.TurnOnOrOffModule:
        return `ID${id}${command}${parameter}`;
    case BLE_DEVICE_COMMANDS.GetActiveModulesList:
    case BLE_DEVICE_COMMANDS.GetStats:
    case BLE_DEVICE_COMMANDS.TurnOffAllModules:
    case BLE_DEVICE_COMMANDS.TurnOnAllModules:
    default:
        if (id && parameter)
            throw new Error(`${command} do not require id or parameter. Check generateMessage function`);

        return command;
    }
};