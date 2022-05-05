import { Slider } from "@miblanchard/react-native-slider";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";
import { useAppColors } from "../../hooks/colorSchemeHooks";
import { getSvjValue, useConnectedDevices } from "../../hooks/connectedDevicesHooks";
import { Button } from "../Buttons/Button";

interface Props {
    setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    onModalSave?: (newValue: number) => void;
}

export const EditLightSensorModal = (props: Props) => {
    const { setIsModalVisible, onModalSave } = props;
    const { t } = useTranslation();
    const { colors } = useAppColors();
    const [, actions] = useConnectedDevices();
    const oldSvjValue = getSvjValue();
    const [sliderValue, setSliderValue] = React.useState(oldSvjValue);

    const onSave = () => {
        const svjValue = sliderValue * 4095 / 100;
        actions.changeSvj(svjValue);
        onModalSave && onModalSave(svjValue);
        setIsModalVisible(false);
    };

    const onCancel = () => {
        setSliderValue(oldSvjValue);
        setIsModalVisible(false);
    };

    React.useEffect(() => {
        return () => {
            onCancel();
        };
    }, []);

    return (
        <>
            <Text style={{...styles.title, color: colors.text}}>{t("EditLightSensorModal:ChangeLightSensorThreshold")}</Text>
            <Slider
                containerStyle={{width: "100%", marginTop: 6}}
                minimumValue={1}
                maximumValue={100}
                value={ sliderValue }
                trackStyle={ styles.trackStyle }
                minimumTrackTintColor={ colors.card }
                maximumTrackTintColor={ colors.card }
                thumbTouchSize={{
                    width: 50,
                    height: 50,
                }}
                onValueChange={v => {
                    const value = v instanceof Array ? v[0] : v;
                    setSliderValue(value);
                }}
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
        </>
    );
};

const styles = StyleSheet.create({
    trackStyle: { 
        height: 10, 
        borderRadius: 10,
    },
    modalView: {
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
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
