const Router = require("express");
const Transaction = require('../models/Transaction');
const authMiddleware = require("../middleware/auth.middleware");
const router = new Router();

router.post('/transactions', authMiddleware,
    async (req, res) => {
        try {
            const {name, value, category, date} = req.body;

            const transaction = new Transaction({user: req.user.id, name, value, category, date});

            await transaction.save();

            return res.json({message: "Transaction was added!"});

        } catch (e) {
            console.log(e);
            res.send({message: "Server error"});
        }
    }
)

router.get('/transactions', authMiddleware,
    async (req, res) => {
        try {
            const transactions = await Transaction.find({user: req.user.id});

            return res.json({transactions});

        } catch (e) {
            console.log(e);
            res.send({message: "Server error"});
        }
    }
)

router.put('/transactions/:_id', authMiddleware,
    async (req, res) => {
        try {
            const { _id } = req.params;
            const {name, value, category, date} = req.body;

            const updatedTransaction = await Transaction.findOneAndUpdate(
                { _id },
                {user: req.user.id, name, value, category, date},
                { new: true }
            );

            if (!updatedTransaction) {
                return res.status(404).json({ message: `Transaction with name ${name} not found` });
            }

            return res.json({ message: "Transaction was updated", transaction: updatedTransaction });
        } catch (e) {
            console.log(e);
            res.send({ message: "Server error" });
        }
});

router.delete('/transactions/:_id', authMiddleware,
    async (req, res) => {
        try {
            const { _id } = req.params;

            const updatedTransaction = await Transaction.findOneAndDelete({ _id });

            if (!updatedTransaction) {
                return res.status(404).json({ message: `Transaction with id ${_id} not found` });
            }

            return res.json({ message: "Transaction was deleted"});
        } catch (e) {
            console.log(e);
            res.send({ message: "Server error" });
        }
});


module.exports = router;