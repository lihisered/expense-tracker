import { useState } from 'react'

import { Dialog, DialogTitle, DialogContent, Button, TextField, Box } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import { login, signup } from '../store/actions/user.actions.js'

export function LoginSignup({ open, handleClose }) {

    const [credentials, setCredentials] = useState(getEmptyCredentials())
    const [isSignupState, setIsSignupState] = useState(false)

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
            }
        }
    })

    function getEmptyCredentials() {
        return { fullname: '', username: '', password: '' }
    }


    function handleCredentialsChange({ target }) {
        const { name, value } = target
        setCredentials(credentials => ({ ...credentials, [name]: value }))
    }

    async function onSubmit(ev) {
        ev.preventDefault()
        try {
            if (isSignupState) await signup(credentials)
            else await login(credentials)
            handleClose()
        } catch (err) {
            console.error('Authentication error:', err)
        }
    }

    function onToggleSignupState() {
        setIsSignupState(!isSignupState)
        setCredentials(getEmptyCredentials())
    }

    return (
        <ThemeProvider theme={theme}>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{isSignupState ? 'Sign Up' : 'Log In'}</DialogTitle>
                <DialogContent>
                    <Box
                        component="form"
                        onSubmit={onSubmit}
                        noValidate
                        sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            value={credentials.username}
                            onChange={handleCredentialsChange} />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={credentials.password}
                            onChange={handleCredentialsChange} />
                        {isSignupState && (
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="fullname"
                                label="Full Name"
                                type="text"
                                id="fullname"
                                autoComplete="fullname"
                                value={credentials.fullname}
                                onChange={handleCredentialsChange} />
                        )}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}>
                            {isSignupState ? 'Sign Up' : 'Log In'}
                        </Button>
                        <Button
                            fullWidth
                            onClick={onToggleSignupState}
                            sx={{ mt: 1, mb: 2 }}>
                            {isSignupState ? 'Already a member? Log in' : 'New user? Sign up here'}
                        </Button>
                    </Box>
                </DialogContent>
            </Dialog>
        </ThemeProvider>
    )
}
