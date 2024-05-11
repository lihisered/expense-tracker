import { useEffect, useState } from 'react'

import dayjs from 'dayjs'
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import {
    TextField, OutlinedInput, InputLabel, MenuItem, FormControl, ListItemText, Select, Checkbox, Stack
} from '@mui/material'

import { expenseService } from '../services/expense.service'


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

export function ExpenseFilter({ filterBy, onSetFilter }) {
    const [selectedCategories, setSelectedCategories] = useState([])
    const [selectedDate, setSelectedDate] = useState(null)
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    const categories = expenseService.getCategories()

    useEffect(() => {
        setFilterByToEdit(prev => ({
            ...prev,
            categories: selectedCategories,
            date: selectedDate
        }))
    }, [selectedCategories, selectedDate])

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])


    function handleChange(ev) {
        const { target: { value } } = ev
        setSelectedCategories(typeof value === 'string' ? value.split(',') : value)
    }

    function handleChangeDate(newDate) {
        if (newDate) {
            const unixTimestamp = convertToUnixTimestamp(newDate)
            setSelectedDate(unixTimestamp)
        } else {
            setSelectedDate(null)
        }
    }

    function convertToUnixTimestamp(dayjsDate) {
        return dayjsDate.unix()
    }

    return (
        <section className="expense-filter">
            <ThemeProvider theme={theme}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Stack direction="row" spacing={2} sx={{ width: '100%', bgcolor: theme.palette.background.default }}>
                        <FormControl sx={{ m: 1, width: '250px' }}>
                            <InputLabel id="demo-multiple-checkbox-label" sx={{ color: 'text.primary' }}>Categories</InputLabel>
                            <Select
                                labelId="demo-multiple-checkbox-label"
                                id="demo-multiple-checkbox"
                                multiple
                                value={selectedCategories}
                                onChange={handleChange}
                                input={<OutlinedInput label="Categories" />}
                                renderValue={(selected) => selected.join(', ')}>
                                {categories.map((category) => (
                                    <MenuItem key={category} value={category}>
                                        <Checkbox checked={selectedCategories.indexOf(category) > -1} />
                                        <ListItemText primary={category} sx={{ color: 'text.primary' }} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <DatePicker
                            label="Select Date"
                            value={selectedDate ? dayjs.unix(selectedDate) : null}
                            onChange={handleChangeDate}
                            renderInput={(params) => <TextField {...params} sx={{ flex: 1 }} />} />
                    </Stack>
                </LocalizationProvider>
            </ThemeProvider>
        </section>
    )
}