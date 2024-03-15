import { useContext, useState, useRef, Ref, forwardRef, useImperativeHandle, useEffect } from "react";
import { heightPercentageToDP as hp, widthPercentageToDP } from "react-native-responsive-screen";
import {
    KeyboardTypeOptions,
    StyleProp,
    TextInput,
    TextStyle,
    ViewStyle,
    StyleSheet,
    View,
    Platform,
    TouchableOpacity,
    ImageStyle,
    Switch,
} from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import colors from "../constants/colors.constant";
import RNDateTimePicker, { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import Checkbox from "expo-checkbox";
import TextComponent from "./Text.component";
import PhoneInput from "react-native-phone-number-input";
import { Dropdown } from "react-native-element-dropdown";

interface textInputPropType {
    type?: "text" | "hidden";
    children?: React.ReactNode;
    wrapperStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<TextStyle>;
    placeholder?: string;
    maxLength?: number;
    editable?: boolean;
    defaultValue?: string;
    value?: string;
    hidden?: boolean;
    multiLine?: boolean;
    ref?: Ref<TextInput> | undefined;
    keyboardType?: KeyboardTypeOptions;
    onChange: (text: string) => void;
    onFocus?: () => void;
}

interface textInputMethodType {
    clear?: () => void;
}

const CustTextInput = forwardRef<textInputMethodType, textInputPropType>(
    (
        {
            children,
            editable,
            style,
            wrapperStyle,
            placeholder,
            defaultValue,
            value,
            maxLength,
            hidden,
            onChange,
            onFocus,
            multiLine,
            keyboardType,
        }: textInputPropType,
        ref
    ) => {
        const textInputRef = useRef<TextInput>(null);

        const clearTextInput = () => {
            if (textInputRef.current) {
                textInputRef.current.clear();
            }
        };

        // Forward the ref to the TextInput component
        useImperativeHandle(ref, () => ({
            clear: clearTextInput,
        }));

        const styles = StyleSheet.create({
            inputWrapper: {
                width: "100%",
                // height: "50%",
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
                backgroundColor: colors.black,
                borderColor: colors.yellow,
                borderWidth: 1,
                borderRadius: 15,
                paddingHorizontal: "7%",
                ...(wrapperStyle as object),
            },

            textInput: {
                // flex: 0.9,
                width: "100%",
                color: colors.white,
                paddingVertical: "3.7%",
                fontSize: hp("2%"),
                fontFamily: "Poppins_300Light",
                ...(style as object),
            },
        });

        return (
            <View style={styles.inputWrapper}>
                {children}
                <TextInput
                    ref={textInputRef}
                    multiline={multiLine}
                    maxLength={maxLength}
                    onFocus={onFocus}
                    keyboardType={keyboardType}
                    defaultValue={defaultValue}
                    value={value}
                    onChange={(e) => onChange(e.nativeEvent.text)}
                    style={styles.textInput}
                    placeholder={placeholder}
                    placeholderTextColor={colors.grey4}
                    editable={editable}
                    secureTextEntry={hidden}
                />
            </View>
        );
    }
);

interface dateInputPropType {
    onChange: (value: Date | undefined) => void;
    placeholder?: string;
    mode: "date" | "time";
    wrapperStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<TextStyle>;
    defaultValue?: string | number;
}

const DateComponent = ({ onChange, placeholder, style, mode, wrapperStyle, defaultValue }: dateInputPropType) => {
    const [dateVal, setdateVal] = useState<Date | undefined>(defaultValue ? new Date(defaultValue) : new Date());
    const [showDateSelector, setshowDateSelector] = useState(false);

    const toggleDatePicker = () => {
        if (Platform.OS === "android") {
            DateTimePickerAndroid.open({
                mode,
                value: new Date(),
                onChange: (e: any, value: any) => {
                    if (e.type === "set") {
                        onChange(value);
                        setdateVal(value);
                    }
                },
            } as any);
        }
    };

    useEffect(() => {
        Platform.OS === "ios" && setshowDateSelector(true);
    }, []);

    const styles = StyleSheet.create({
        inputWrapper: {
            flexDirection: "row",
            marginVertical: "2%",
            borderWidth: 1.2,
            borderColor: colors.grey4,
            borderRadius: 10,
            justifyContent: "center",
            paddingHorizontal: "5%",
            alignItems: "center",
            ...(wrapperStyle as object),
        },
    });

    return (
        <TouchableOpacity style={styles.inputWrapper} onPress={toggleDatePicker}>
            <TextComponent style={style} fontFamily="Poppins_300Light" type="plain">
                {(mode === "date"
                    ? dateVal?.toLocaleDateString()
                    : dateVal?.toLocaleTimeString("en-US", { hourCycle: "h24", hour: "numeric", minute: "numeric" })) ||
                    placeholder ||
                    (mode === "date"
                        ? new Date()?.toLocaleDateString()
                        : new Date()?.toLocaleTimeString("en-US", { hourCycle: "h24", hour: "numeric", minute: "numeric" }))}
            </TextComponent>
            {showDateSelector && (
                <>
                    {[1, 2, 3, 4, 5].map((date, i) => (
                        <RNDateTimePicker
                            key={i}
                            mode={mode}
                            style={{ opacity: 0.02, flex: 1, backgroundColor: "rgba(0,0,0,0)", zIndex: 10 }}
                            value={dateVal || new Date()}
                            onChange={(e, value) => {
                                if (e.type === "set") {
                                    onChange(value);
                                    setdateVal(value);
                                }
                            }}
                        />
                    ))}
                </>
            )}
        </TouchableOpacity>
    );
};

interface CustCheckBoxProps {
    style?: StyleProp<ViewStyle>;
    onChange?: (value: boolean) => void;
    checked?: boolean;
    color?: string;
}

const CustCheckBox = ({ onChange, checked, style, color }: CustCheckBoxProps) => {
    const styles = StyleSheet.create({
        checkbox: {
            height: hp("3%"),
            width: hp("3%"),
            marginRight: "5%",
            ...(style as object),
        },
    });
    return <Checkbox style={styles.checkbox} value={checked} onValueChange={onChange} color={color} />;
};

interface CustSwitchProps {
    style?: StyleProp<ViewStyle>;
    onChange?: (value: boolean) => void;
    on?: boolean;
    thumbColor?: string;
    trackColor?: { true: string; false: string };
}

const CustSwitch = ({ onChange, on, style, trackColor, thumbColor }: CustSwitchProps) => {
    const styles = StyleSheet.create({
        switch: {
            height: hp("3%"),
            width: hp("3%"),
            marginRight: "5%",
            ...(style as object),
        },
    });
    return <Switch style={styles.switch} value={on} onValueChange={onChange} trackColor={trackColor} thumbColor={thumbColor} />;
};

interface RadioButnProps {
    value?: boolean;
    size?: number;
    selectedColor: string;
    color: string;
    onChange?: (value: boolean) => void;
}
const RadioButn = ({ value, size, selectedColor, color, onChange }: RadioButnProps) => {
    const currentSize = useRef<number>(size || hp("3%")).current;
    return (
        <TouchableOpacity
            onPress={() => onChange && onChange(false)}
            style={{
                width: currentSize,
                height: currentSize,
                borderRadius: 100,
                justifyContent: "center",
                alignItems: "center",
                borderColor: value ? selectedColor : color,
                borderWidth: 2,
            }}
        >
            {value && (
                <View
                    style={{
                        width: Math.round(currentSize / 2),
                        height: Math.round(currentSize / 2),
                        borderRadius: 100,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: value ? selectedColor : color,
                    }}
                />
            )}
        </TouchableOpacity>
    );
};

interface phoneInputProps {
    style?: StyleProp<ViewStyle>;
    defaultValue?: string;
    countryCode?: any;
    onChange: (value: { countryCode: string; countrySymbol: string; number: string }) => void;
}

const CustPhoneInput = ({ style, onChange, defaultValue, countryCode }: phoneInputProps) => {
    const phoneNumInput = useRef<PhoneInput>();

    useEffect(() => {
        phoneNumInput.current?.setState({
            number: defaultValue as string,
        });
    }, [defaultValue]);

    phoneNumInput.current?.getCallingCode();

    const styles = StyleSheet.create({
        phoneNumberView: {
            width: "100%",
            paddingVertical: "3.7%",
            borderRadius: 10,
            borderColor: colors.yellow,
            borderWidth: 1,
            backgroundColor: colors.black,
            fontSize: hp("3%"),
            ...(style as object),
        },
    });

    const onInput = (number: string) => {
        const countryCode = phoneNumInput.current?.getCallingCode();
        const countrySymbol = phoneNumInput.current?.getCountryCode();
        onChange({
            countryCode: countryCode as string,
            countrySymbol: countrySymbol as string,
            number: number.replace(`+${countryCode}`, ""),
        });
    };

    return (
        <PhoneInput
            defaultCode={"NG"}
            layout="first"
            placeholder=" "
            ref={phoneNumInput as React.MutableRefObject<PhoneInput>}
            containerStyle={styles.phoneNumberView}
            textContainerStyle={{ paddingVertical: 0, backgroundColor: colors.black }}
            textInputStyle={{ color: colors.yellow }}
            codeTextStyle={{ color: colors.yellow }}
            defaultValue={(countryCode || "") + defaultValue}
            onChangeFormattedText={onInput}
        />
    );
};

export const HiddenInput = ({
    children,
    editable,
    style,
    wrapperStyle,
    placeholder,
    defaultValue,
    maxLength,
    onChange,
    onFocus,
    multiLine,
    keyboardType,
}: textInputPropType) => {
    const [hidden, sethidden] = useState<boolean>(true);
    // const [darkMode] = useContext(DarkModeContext);

    const styles = StyleSheet.create({
        inputWrapper: {
            width: "100%",
            // height: "50%",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            backgroundColor: colors.black,
            borderColor: colors.yellow,
            borderWidth: 1,
            borderRadius: 15,
            paddingHorizontal: "7%",
            ...(wrapperStyle as object),
        },

        textInput: {
            // flex: 0.9,
            width: "100%",
            color: colors.white,
            paddingVertical: "3.7%",
            fontSize: hp("2%"),
            fontFamily: "Poppins_300Light",
            ...(style as object),
        },
    });

    return (
        <View style={styles.inputWrapper}>
            {children}
            <TextInput
                multiline={multiLine}
                maxLength={maxLength}
                onFocus={onFocus}
                keyboardType={keyboardType}
                defaultValue={defaultValue}
                onChange={(e) => onChange(e.nativeEvent.text)}
                style={styles.textInput}
                placeholder={placeholder}
                placeholderTextColor={colors.grey3}
                editable={editable}
                secureTextEntry={hidden}
            />
            <TouchableOpacity onPress={() => sethidden(!hidden)}>
                {hidden ? (
                    <Ionicons name="eye-off" size={hp("3%")} style={{ marginRight: "0%" }} color={colors.grey4} />
                ) : (
                    <Ionicons name="eye" size={hp("3%")} style={{ marginRight: "0%" }} color={colors.grey4} />
                )}
            </TouchableOpacity>
        </View>
    );
};

interface DropdownInputProps {
    type?: "dropdown";
    style?: StyleProp<ViewStyle>;
    containerStyle?: StyleProp<ViewStyle>;
    placeholderStyle?: StyleProp<TextStyle>;
    selectedTextStyle?: StyleProp<TextStyle>;
    itemTextStyle?: StyleProp<TextStyle>;
    iconStyle?: StyleProp<ImageStyle>;
    placeholder?: string;
    defualtValue?: dropDownDataType | string;
    data: dropDownDataType[];
    onChange: (item: dropDownDataType) => void;
}

type dropDownDataType = {
    label: string | number;
    value: string | number;
};

const DropdownInput = ({
    data,
    style,
    placeholder,
    placeholderStyle,
    selectedTextStyle,
    itemTextStyle,
    iconStyle,
    containerStyle,
    onChange,
    defualtValue,
}: DropdownInputProps) => {
    const styles = StyleSheet.create({
        dropdown: {
            width: "100%",
            height: hp("6%"),
            paddingHorizontal: "5%",
            borderWidth: 1,
            marginBottom: "5%",
            borderRadius: 10,
            borderColor: colors.yellow,
            backgroundColor: colors.black,
            ...(style as object),
        },

        placeholder: {
            fontSize: hp("2%"),
            color: colors.yellow,
            ...(placeholderStyle as object),
        },

        selectedText: {
            fontSize: hp("2%"),
            fontWeight: "200",
            color: colors.yellow,
            ...(selectedTextStyle as object),
        },

        itemTextStyle: {
            color: colors.yellow,
            fontWeight: "200",
            ...(itemTextStyle as object),
        },

        iconStyle: {
            backgroundColor: colors.black,
            ...(iconStyle as object),
        },

        containerStyle: {
            backgroundColor: colors.black,
            ...(containerStyle as object),
        },
    });

    return (
        <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholder}
            selectedTextStyle={styles.selectedText}
            itemTextStyle={styles.itemTextStyle}
            containerStyle={styles.containerStyle}
            iconStyle={styles.iconStyle}
            data={data}
            activeColor={colors.black}
            labelField="label"
            valueField="value"
            value={defualtValue}
            placeholder={placeholder}
            onChange={onChange}
        />
    );
};

export function InputComponent(params: { type?: "text" } & textInputMethodType & textInputPropType): React.ReactNode;
export function InputComponent(params: { type?: "hidden" } & textInputMethodType & textInputPropType): React.ReactNode;
export function InputComponent(params: { type?: "radio" } & RadioButnProps): React.ReactNode;
export function InputComponent(params: { type?: "switch" } & CustSwitchProps): React.ReactNode;
export function InputComponent(params: { type?: "checkbox" } & CustCheckBoxProps): React.ReactNode;
export function InputComponent(params: { type?: "date" } & dateInputPropType): React.ReactNode;
export function InputComponent(params: { type?: "phone" } & phoneInputProps): React.ReactNode;
export function InputComponent(params: { type?: "dropdown" } & DropdownInputProps): React.ReactNode;

export function InputComponent({ type, ...props }: any) {
    switch (type) {
        case "dropdown":
            return <DropdownInput {...props} />;
        case "switch":
            return <CustSwitch {...props} />;
        case "checkbox":
            return <CustCheckBox {...props} />;
        case "radio":
            return <RadioButn {...props} />;
        case "date":
            return <DateComponent {...props} />;
        case "phone":
            return <CustPhoneInput {...props} />;
        case "hidden":
            return <HiddenInput {...props} />;
        default:
            return <CustTextInput {...props} />;
    }
}
