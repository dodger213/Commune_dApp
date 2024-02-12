"use client";
import { useContext, createContext, useState, useCallback } from "react";

type ThemeProviderProps = {
    children: React.ReactNode | React.ReactNode[];
};

const ToggleThemeContext = createContext<() => void>(() => { });
const ThemeContext = createContext<string>('light');

export { ToggleThemeContext, ThemeContext };

export default function ThemeProvider({
    children,
}: ThemeProviderProps) {
    const [theme, setTheme] = useState('light');

    const toggleTheme = useCallback(
        () => setTheme(
            state => state === 'light'
                ? 'dark'
                : 'light'
        ),
        []
    );

    return (
        <ToggleThemeContext.Provider value={toggleTheme}>
            <ThemeContext.Provider value={theme}>
                <div data-theme={theme}>
                    {children}
                </div>
            </ThemeContext.Provider>
        </ToggleThemeContext.Provider>
    );
}