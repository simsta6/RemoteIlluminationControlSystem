import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-paper";
import { useAppColors } from "../../hooks/colorSchemeHooks";
import { useConnectedDevices } from "../../hooks/connectedDevicesHooks";
import { Button } from "../Buttons/Button";

interface Props {
    setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    deviceIndexInArray: number;
}

export const EditDeviceModal = (props: Props) => {
    const { setIsModalVisible, deviceIndexInArray } = props;
    const { t } = useTranslation();
    const { colors } = useAppColors();
    const [devices, actions] = useConnectedDevices();
    const device = devices[deviceIndexInArray];
    const [deviceName, setDeviceName] = React.useState(device.name);

    const onSave = () => {
        actions.modify({...device, name: deviceName}, deviceIndexInArray);
        setIsModalVisible(false);
    };

    const onCancel = () => {
        setDeviceName(device.name);
        setIsModalVisible(false);
    };

    React.useEffect(() => {
        return () => {
            onCancel();
        };
    }, []);

    return (
        <View>
            <Text style={{...styles.title, color: colors.text}}>{t("EditDeviceModal:ChangeDeviceName")}</Text>
            <TextInput
                style={{
                    ...styles.textInput,
                    backgroundColor: colors.background,
                    color: colors.text,
                }}
                underlineColor={colors.text}
                activeUnderlineColor={colors.text}
                onChangeText={setDeviceName}
                value={deviceName}
                theme={{ colors: { text: colors.text } }}
            />
            <View style={styles.row}>
                <Button title={t("save")} 
                    buttonStyle={{...styles.button, marginRight: 5 }} 
                    onPress={onSave}
                />
                <Button title={t("cancel")}
                    buttonStyle={{...styles.button, marginLeft: 5 }} 
                    onPress={onCancel}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "500"
    },
    textInput: {
        height: 40,
        marginVertical: 10,
    },
    button: {
        flex: 1, 
    },
});
