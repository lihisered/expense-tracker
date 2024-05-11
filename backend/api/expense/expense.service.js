import { dbService } from '../../services/db.service.js'
import { logger } from '../../services/logger.service.js'
import mongodb from 'mongodb'
const { ObjectId } = mongodb

async function query() {
    try {
        const collection = await dbService.getCollection('expense')
        const expenses = await collection.find({}).toArray()
        return expenses
    } catch (err) {
        logger.error('Cannot find expenses', err)
        throw err
    }
}

async function getById(expenseId) {
    try {
        const collection = await dbService.getCollection('expense')
        const expense = await collection.findOne({ _id: ObjectId(expenseId) })
        expense.createdAt = ObjectId(expense._id).getTimestamp()

        return expense
    } catch (err) {
        logger.error(`While finding expense ${expenseId}`, err)
        throw err
    }
}

async function remove(expenseId) {
    try {
        const collection = await dbService.getCollection('expense')
        await collection.deleteOne({ _id: ObjectId(expenseId) })
        return expenseId
    } catch (err) {
        logger.error(`Cannot remove expense ${expenseId}`, err)
        throw err
    }
}

async function add(expense) {
    try {
        const collection = await dbService.getCollection('expense')
        await collection.insertOne(expense)
        return expense
    } catch (err) {
        logger.error('Cannot insert expense', err)
        throw err
    }
}

export const expenseService = {
    remove,
    query,
    getById,
    add,
}
