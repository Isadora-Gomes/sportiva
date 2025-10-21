import { ColorValue, ImageStyle, TextStyle, ViewStyle } from "react-native";

export enum AppThemeMode {
    light = "light",
    dark = "dark"
}

interface AppThemeColorState {
    text: ColorValue;
    background: ColorValue;
}

interface AppThemeModeState {
    surface: AppThemeColorState;
    softContainer: AppThemeColorState;
    container: AppThemeColorState;
}

type AppThemeModeStates = {
    [M in AppThemeMode]: AppThemeModeState;
}

type ThemeListener = (mode: AppThemeMode) => void;

export class AppTheme {
    private _mode: AppThemeMode;
    private _states: AppThemeModeStates;

    private _listeners: Set<ThemeListener> = new Set();

    get mode(): AppThemeMode { return this._mode; }
    
    get light(): AppThemeModeState { return this._states.light; }
    get dark(): AppThemeModeState { return this._states.dark; }
    get current(): AppThemeModeState { return this._states[this._mode]; }

    text(area: keyof AppThemeModeState = "surface"): ColorValue {
        return this.current[area].text;
    }

    background(area: keyof AppThemeModeState = "surface"): ColorValue {
        return this.current[area].background;
    }

    apply(
        style: ViewStyle | TextStyle | ImageStyle,
        area: keyof AppThemeModeState = "surface"
    ): ViewStyle | TextStyle | ImageStyle {
        const state = this.current[area];
        return {
            ...style,
            backgroundColor: state.background,
            color: state.text,
        };
    }

    change(mode: AppThemeMode, callback?: ThemeListener) {
        this._mode = mode;
        if (callback) {
            callback(mode);
            for (const listener of this._listeners) {
                listener(mode);
            }
        }
    }

    toggle(callback?: ThemeListener) {
        this.change(
            this._mode == AppThemeMode.dark ? AppThemeMode.light : AppThemeMode.dark,
            callback
        );
    }

    constructor(mode: AppThemeMode, states: AppThemeModeStates) {
        this._mode = mode;
        this._states = states;
    }

    addListener(listener: ThemeListener): void {
        this._listeners.add(listener);
    }

    removeListener(listener: ThemeListener): void {
        this._listeners.delete(listener);
    }
}

export const globalTheme = new AppTheme(AppThemeMode.dark, {
    [AppThemeMode.dark]: {
        container: {
            background: "#3C3C3C",
            text: "#FFFFFF",
        },
        softContainer: {
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
        softContainer: {
            background: "#E8E8E8",
            text: "#1E1E1E"
        },
        surface: {
            background: "#FFFFFF",
            text: "#3B3B3B",
        },
    },
} as const);