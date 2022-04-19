import base64 from "base-64";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { BleManager, Subscription } from "react-native-ble-plx";
import { TextInput } from "react-native-paper";
import { sendMessage } from "../ble-api/bleManager";
import { useBleDevice } from "../hooks/bleDeviceHook";
import { useAppColors } from "../hooks/colorSchemeHooks";
import { Button } from "./Buttons/Button";
import Collapsible from "react-native-collapsible";
import { IconButton } from "./Buttons/IconButton";
import DownArrowIcon from "../assets/icons/DownArrowIcon";
import UpArrowIcon from "../assets/icons/UpArrowIcon";
import { getCurrentTime } from "../helpers/time";

const formatMessageWithTime = (message: string) => {
    return `${getCurrentTime()} | ${message}`;
};


interface Props {
    bleManager: BleManager;
}

export const Terminal = (props: Props) => {
    const { bleManager } = props;
    const { colors } = useAppColors();
    const scrollViewRef = React.useRef<ScrollView | null>(null);
    const [bleDevice, actions] = useBleDevice();
    const [message, setMessage] = React.useState("");
    const [isCollapsed, setIsCollapsed] = React.useState(true);
    const [consoleOutputMessages, setConsoleOutputMessages] = React.useState<string[]>([]);
    const { deviceId, serviceUUID, uuid, isDeviceConnected } = bleDevice;

    React.useEffect(() => {
        let subscription: Subscription | undefined;

        if (deviceId && serviceUUID && uuid && isDeviceConnected) {
            subscription = bleManager.monitorCharacteristicForDevice(deviceId, serviceUUID, uuid, (error, char) => {
                if (error) {    
                    if (error.message.includes("is not connected") && isDeviceConnected) return;
        
                    setConsoleOutputMessages(arr => {
                        arr.length > 200 && arr.shift();
                        return [...arr, formatMessageWithTime(error.message)];
                    });
                }
                const receivedMessage = char?.value;
                if (receivedMessage) {
                    setConsoleOutputMessages(arr => {
                        arr.length > 200 && arr.shift();
                        return [...arr, formatMessageWithTime(base64.decode(receivedMessage))];
                    });
                }
            });
        }
        
        return subscription?.remove;
    }, [deviceId, serviceUUID, uuid, isDeviceConnected]);
    
    return (
        <View style={styles.container}>
            <IconButton 
                Icon={() => isCollapsed ? <DownArrowIcon color={colors.icon} width={15} height={15} /> : <UpArrowIcon color={colors.icon} width={15} height={15} />}
                textStyle={{...styles.title, color: colors.text}}
                title="Terminal"
                onPress={() => setIsCollapsed(oldState => !oldState)}
            />
            <Collapsible collapsed={isCollapsed}>
                <View style={styles.row}>
                    <TextInput
                        style={{
                            ...styles.textInput,
                            backgroundColor: colors.background,
                            color: colors.text
                        }}
                        underlineColor={colors.text}
                        activeUnderlineColor={colors.text}
                        placeholderTextColor={colors.text}
                        theme={{ colors: { text: colors.text } }}
                        onChangeText={setMessage}
                        value={message}
                        placeholder={"Message"}
                    />
                    {deviceId ? <Button buttonStyle={styles.button} title="send" onPress={() => sendMessage(bleManager, deviceId, message, actions.modify)} /> : null}
                </View>
                <ScrollView
                    style={{...styles.consoleOutputList, borderColor: colors.text}}
                    contentContainerStyle={styles.consoleOutputContainer}
                    ref={scrollViewRef}
                    onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
                >
                    {
                        consoleOutputMessages.map((message, index) => (
                            <Text key={index.toString()} style={{ ...styles.consoleMessage, color: colors.text }}>
                                {message}
                            </Text>
                        ))
                    }
                </ScrollView>
            </Collapsible>
        </View>
    );
};
  
const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center",
    },
    button: {
        flex: 1
    },
    container: {
        paddingTop: 20,
    },
    title: {
        marginRight: 10,
        fontSize: 20,
        fontWeight: "500"
    },
    consoleMessage: {
        height: 18,
    },
    textInput: {
        flex: 3,
        marginRight: 8,
        height: 40,
        marginVertical: 10,
    },
    consoleOutputList: {
        height: 180,
        border: 1,
        borderWidth: 1,
        borderRadius: 5,
        marginVertical: 10,
    },
    consoleOutputContainer: {
        paddingVertical: 5,
        paddingHorizontal: 8,
    },
});
  
