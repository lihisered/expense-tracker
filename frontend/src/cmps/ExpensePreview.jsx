import { ListItem, ListItemText } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'

export function ExpensePreview({ expense, onClick }) {

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

    return (
        <ThemeProvider theme={theme}>
            <ListItem className="expense-preview" onClick={onClick} sx={{ maxWidth: 300, bgcolor: theme.palette.background.paper, borderRadius: '8px' }}>
                <ListItemText primary={`$${expense.amount}`} secondary={expense.category} />
            </ListItem>
        </ThemeProvider>
    )
}