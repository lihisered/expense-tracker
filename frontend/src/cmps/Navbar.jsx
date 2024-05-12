import { createTheme, ThemeProvider } from '@mui/material/styles'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Typography from '@mui/material/Typography'

export function Navbar({ user, handleOpen, handleOpenLoginSignup, handleLogout }) {

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
                    disabled={!user}
                    onClick={() => handleOpen(null)}>
                    Add Expense
                </Button>

                {user ? (
                    <div style={{ display: 'flex', alignItems: 'center', margin: '0 8px' }}>
                        <AccountCircleIcon color="primary" sx={{ marginRight: 1 }} />
                        <Typography variant="h6" color="text.primary">
                            {user.fullname}
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleLogout}
                            sx={{ marginLeft: 2 }}>
                            Logout
                        </Button>
                    </div>
                ) : (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleOpenLoginSignup(true)}>
                        Login / Signup
                    </Button>
                )}
            </ThemeProvider>
        </section>
    )
}
