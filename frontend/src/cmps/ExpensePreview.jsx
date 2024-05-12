import { ListItem, ListItemText, ListItemAvatar, IconButton, Avatar, Typography } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import HouseIcon from '@mui/icons-material/House'
import UtilitiesIcon from '@mui/icons-material/ElectricBolt'
import TransportationIcon from '@mui/icons-material/DirectionsCar'
import FoodIcon from '@mui/icons-material/Fastfood'
import HealthcareIcon from '@mui/icons-material/LocalHospital'
import EntertainmentIcon from '@mui/icons-material/Theaters'
import EducationIcon from '@mui/icons-material/School'
import PersonalCareIcon from '@mui/icons-material/Face'
import DeleteIcon from '@mui/icons-material/Delete'
import dayjs from 'dayjs'

export function ExpensePreview({ expense, onClick, onRemove }) {

    const categoryIcons = {
        'Housing': { icon: HouseIcon, color: '#f44336' },
        'Utilities': { icon: UtilitiesIcon, color: '#ff9800' },
        'Transportation': { icon: TransportationIcon, color: '#2196f3' },
        'Food': { icon: FoodIcon, color: '#4caf50' },
        'Healthcare': { icon: HealthcareIcon, color: '#e91e63' },
        'Entertainment': { icon: EntertainmentIcon, color: '#9c27b0' },
        'Education': { icon: EducationIcon, color: '#ffc107' },
        'Personal Care': { icon: PersonalCareIcon, color: '#00bcd4' }
    }

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

    const { icon: Icon, color } = categoryIcons[expense.category]

    return (
        <ThemeProvider theme={theme}>
            <ListItem className="expense-preview" onClick={onClick} sx={{
                minWidth: 250, maxWidth: 350, bgcolor: theme.palette.background.paper, borderRadius: '8px', mb: 2,
                '&:hover .delete-icon': {
                    visibility: 'visible'
                }
            }}>
                <ListItemAvatar>
                    <Avatar sx={{ bgcolor: color }}>
                        <Icon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={`$${expense.amount} - ${expense.category}`}
                    secondary={
                        <>
                            <Typography component="span" variant="body2" color="textPrimary">
                                {dayjs.unix(expense.date).format('MMMM D, YYYY')} - {expense.notes || 'No notes'}
                            </Typography>
                        </>
                    } />
                <IconButton
                    className="delete-icon"
                    sx={{ visibility: 'hidden' }}
                    onClick={(event) => {
                        event.stopPropagation()
                        onRemove(expense._id)
                    }}>
                    <DeleteIcon />
                </IconButton>
            </ListItem>
        </ThemeProvider>
    )
}