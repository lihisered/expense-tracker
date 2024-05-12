import { Grid, Paper, Typography, Box } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import HouseIcon from '@mui/icons-material/House'
import UtilitiesIcon from '@mui/icons-material/ElectricBolt'
import TransportationIcon from '@mui/icons-material/DirectionsCar'
import FoodIcon from '@mui/icons-material/Fastfood'
import HealthcareIcon from '@mui/icons-material/LocalHospital'
import EntertainmentIcon from '@mui/icons-material/Theaters'
import EducationIcon from '@mui/icons-material/School'
import PersonalCareIcon from '@mui/icons-material/Face'

export function Categories() {

    const categories = [
        { name: 'Housing', icon: HouseIcon, color: '#f44336' },
        { name: 'Utilities', icon: UtilitiesIcon, color: '#ff9800' },
        { name: 'Transportation', icon: TransportationIcon, color: '#2196f3' },
        { name: 'Food', icon: FoodIcon, color: '#4caf50' },
        { name: 'Healthcare', icon: HealthcareIcon, color: '#e91e63' },
        { name: 'Entertainment', icon: EntertainmentIcon, color: '#9c27b0' },
        { name: 'Education', icon: EducationIcon, color: '#ffc107' },
        { name: 'Personal Care', icon: PersonalCareIcon, color: '#00bcd4' }
    ]

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
            <Grid className="categories-container" container spacing={1} sx={{ backgroundColor: theme.palette.background.default, width: 'auto' }}>
                {categories.map((category) => (
                    <Grid item key={category.name}>
                        <Paper elevation={4} sx={{
                            padding: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'transparent',
                            width: 100,
                            height: 100,
                        }}>
                            <Box sx={{
                                width: 36,
                                height: 36,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: category.color,
                                borderRadius: '50%',
                                mt: 0.5
                            }}>
                                <category.icon style={{ color: '#ffffff' }} />
                            </Box>
                            <Typography variant="caption" component="p" sx={{ mt: 0.5 }}>
                                {category.name}
                            </Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </ThemeProvider>
    )
}
