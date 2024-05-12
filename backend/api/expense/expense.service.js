import { dbService } from '../../services/db.service.js'
import { logger } from '../../services/logger.service.js'
import mongodb from 'mongodb'
const { ObjectId } = mongodb

async function query(filterBy = {}) {
    try {
        const criteria = _buildCriteria(filterBy)
        const collection = await dbService.getCollection('expense')

        const expenses = await collection.aggregate([
            {
                $match: criteria
            },
            {
                $lookup: {
                    from: 'user',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'userDetails'
                }
            },
            {
                $unwind: {
                    path: '$userDetails',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    _id: 1,
                    amount: 1,
                    category: 1,
                    date: 1,
                    notes: 1,
                    username: "$userDetails.username",
                    fullname: "$userDetails.fullname"
                }
            }
        ]).toArray()
        return expenses
    } catch (err) {
        logger.error('cannot find expenses', err)
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

async function update(expense) {
    try {
        const expenseToSave = {
            userId: expense.userId,
            amount: expense.amount,
            category: expense.category,
            date: expense.date,
            notes: expense.notes
        }
        const collection = await dbService.getCollection('expense')
        await collection.updateOne({ _id: ObjectId(expense._id) }, { $set: expenseToSave })
        return expense
    } catch (err) {
        logger.error(`Cannot update expense ${expense._id}`, err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}

    if (filterBy.userId) {
        criteria.userId = ObjectId(filterBy.userId)
    }

    if (filterBy.categories && filterBy.categories.length > 0) {
        criteria.category = { $in: filterBy.categories }
    }

    if (filterBy.date) {
        const date = new Date(filterBy.date * 1000)
        criteria.date = { $gte: date }
    }

    return criteria
}


export const expenseService = {
    remove,
    query,
    getById,
    add,
    update
}
