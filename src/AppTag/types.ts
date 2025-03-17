import { DefaultNDSThemeType } from "../theme/theme.type";

export type AppTagType = "active" | "inactive" | "interactive";
export type ColorName = keyof DefaultNDSThemeType["colors"];
