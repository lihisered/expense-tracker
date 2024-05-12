import { createTheme, ThemeProvider } from '@mui/material/styles'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'

export function Navbar({ handleOpen }) {

    const theme = createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main: '#bb86fc',
            },
            background: {
                paper: '#333',
                default: '#121212'
            },
            text: {
                primary: '#e0e0e0',
                secondary: '#eeeeee'
            },
        },
    })

    return (
        <section className="navbar">
            <ThemeProvider theme={theme}>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={() => handleOpen(null)}>
                    Add Expense
                </Button>
            </ThemeProvider>
        </section>
    )
}