import { useState, useEffect } from 'react'

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, FormControl, InputLabel, Select } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import dayjs from 'dayjs'

import { expenseService } from '../services/expense.service'

export function ExpenseAdd({ open, handleClose, expense, onSave }) {

    const [currExpense, setCurrExpense] = useState({ amount: '', category: '', date: dayjs(), notes: '' })

    const categories = expenseService.getCategories()

    useEffect(() => {
        if (expense) setCurrExpense({ _id: expense._id, amount: expense.amount || '', category: expense.category || '', date: dayjs.unix(expense.date), notes: expense.notes || '' })
        else setCurrExpense({ amount: '', category: '', date: dayjs(), notes: '' })
    }, [expense])

    function handleChange({ target }) {
        let { name, value, type } = target;
        value = (type === 'number') ? (+value || '') : value
        setCurrExpense(prev => ({ ...prev, [name]: value }))
    }

    function handleDateChange(newDate) {
        setCurrExpense(prev => ({ ...prev, date: newDate }))
    }

    function handleSubmit() {
        onSave({ ...currExpense, date: currExpense.date.unix() })
        handleClose()
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

    return (
        <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>{expense ? 'Edit Expense' : 'Add New Expense'}</DialogTitle>
                    <DialogContent>
                        <TextField
                            margin="dense"
                            label="Amount"
                            type="number"
                            fullWidth
                            variant="outlined"
                            name="amount"
                            value={currExpense.amount}
                            onChange={handleChange} />
                        <FormControl fullWidth margin="dense" variant="outlined" sx={{ mb: 2 }}>
                            <InputLabel>Category</InputLabel>
                            <Select
                                name="category"
                                value={currExpense.category}
                                label="Category"
                                onChange={handleChange}>
                                {categories.map(category => (
                                    <MenuItem key={category} value={category}>{category}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <DatePicker
                            label="Select Date"
                            value={currExpense.date}
                            onChange={handleDateChange}
                            renderInput={(params) => <TextField {...params} fullWidth />} />
                        <TextField
                            margin="dense"
                            label="Notes"
                            type="text"
                            fullWidth
                            variant="outlined"
                            name="notes"
                            value={currExpense.notes}
                            onChange={handleChange}
                            sx={{ mt: 2 }} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleSubmit}>Save</Button>
                    </DialogActions>
                </Dialog>
            </LocalizationProvider>
        </ThemeProvider>
    )
}