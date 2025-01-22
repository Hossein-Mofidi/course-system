import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createTheme, ThemeProvider} from "@mui/material"
import createCache from "@emotion/cache"
import rtlPlugin from "stylis-plugin-rtl"
import {CacheProvider} from "@emotion/react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const theme = createTheme({
    direction: "rtl",
    typography: {
        fontFamily: 'yekan',
    },
});

const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [rtlPlugin],
});

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <CacheProvider value={cacheRtl}>
                <ThemeProvider theme={theme}>
                    <App/>
                </ThemeProvider>
            </CacheProvider>
        </QueryClientProvider>
    </StrictMode>
)
