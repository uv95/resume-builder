import { TextFormat } from "./types/settingsTypes";

export const getDivider = (textFormat:TextFormat) => {
    if (textFormat === TextFormat.BULLET) return '  ● ';
    if (textFormat === TextFormat.PIPE) return '  | ';
    if (textFormat === TextFormat.WRAP) return ',';
};