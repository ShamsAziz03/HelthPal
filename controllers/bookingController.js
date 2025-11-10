const bookRequests = require('../models/bookingModel')

const bookingController = {
    add: async (req, res) => {
        const result = await bookRequests.add(req.body)
        if (result.error) return res.status(400).json(result)
        res.json(result)
    },
}

module.exports = bookingController