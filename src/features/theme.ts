import { ColorValue } from "react-native";

enum AppThemeMode {
    light = "light",
    dark = "dark"
}

interface AppThemeColorState {
    text: ColorValue;
    background: ColorValue;
}

interface AppThemeModeState {
    surface: AppThemeColorState;
    softSurface: AppThemeColorState;
    container: AppThemeColorState;
}

type AppThemeModeStates = {
    [M in AppThemeMode]: AppThemeModeState;
}

class AppTheme {
    private _mode: AppThemeMode;
    private _states: AppThemeModeStates;

    constructor(mode: AppThemeMode, states: AppThemeModeStates) {
        this._mode = mode;
        this._states = states;
    }
}

export default new AppTheme(AppThemeMode.dark, {
    [AppThemeMode.dark]: {
        container: {
            background: "#3C3C3C",
            text: "#FFFFFF",
        },
        softSurface: {
            background: "#1E1E1E",
            text: "#FFFFFF"
        },
        surface: {
            background: "#0F0F0F",
            text: "#FFFFFF",
        },
    },
    [AppThemeMode.light]: {
        container: {
            background: "#E1E1E1",
            text: "#1E1E1E",
        },
        softSurface: {
            background: "#E8E8E8",
            text: "#1E1E1E"
        },
        surface: {
            background: "#FFFFFF",
            text: "#3B3B3B",
        },
    },
});

interface AppThemeChange {
    mode: AppThemeMode;
}