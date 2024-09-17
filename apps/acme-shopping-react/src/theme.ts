import {createTheme} from "@mui/material";
import '@fontsource/montserrat/400.css'
import '@fontsource/montserrat/500.css'
import '@fontsource/montserrat/400.css'
import '@fontsource/montserrat/500.css'
export const theme = createTheme({
    typography: {
        allVariants: { color: "#c27baa" },
        fontFamily: [
            "Montserrat",
            "Helvetica",
            "Arial",
            'sans-serif',
        ].join(',')
    },
    palette: {
        mode: "light",
        text: {
            primary: "#212529"
        },
        primary: {
            contrastText: "#c27baa",
            main: "#fff",
        },
        secondary: {
            main: "#999",
            contrastText: "#212529"
        }
    }
})
