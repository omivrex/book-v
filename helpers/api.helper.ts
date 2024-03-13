import colors from "../constants/colors.constant";
import Toast from "react-native-root-toast";
import { ImagePickerAsset } from "expo-image-picker";
import { DocumentPickerSuccessResult } from "expo-document-picker";

export const message = (msg: string, status?: "success" | "failure" | undefined, duration?: "LONG" | "SHORT" | number) => {
    Toast.show(msg, {
        duration: typeof duration === "number" ? duration : duration && (Toast.durations[duration] || Toast.durations.LONG),
        position: Toast.positions.CENTER,
        shadow: true,
        backgroundColor: status === "success" ? "green" : status === "failure" ? colors.red : undefined,
        textColor: status === "success" ? colors.white : status === "failure" ? colors.white : undefined,
        animation: true,
        hideOnPress: true,
        delay: 0,
    });
    return msg;
};

export function prepFileForUpload(file: ImagePickerAsset, type: "image"): { localUri: string; filename: string; type: string };
export function prepFileForUpload(file: DocumentPickerSuccessResult, type: "document"): { localUri: string; filename: string; type: string };
export function prepFileForUpload(file: any, type: "document" | "image") {
    if (type === "document") {
        let localUri = file.assets[0].uri;
        let filename = localUri.split("/").pop() as string;
        let type = file.assets[0].mimeType;
        return { localUri, filename, type };
    } else {
        let localUri = (file as ImagePickerAsset).uri;
        let filename = localUri.split("/").pop() as string;
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : "image";
        return { localUri, filename, type };
    }
}
