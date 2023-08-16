const Router = require("express");
const Category = require('../models/Category');
const authMiddleware = require("../middleware/auth.middleware");
const router = new Router();

router.post('/categories', authMiddleware,
    async (req, res) => {
        try {
            const {label, limit, type} = req.body;

            const checkedCategoryName = await Category.findOne({user: req.user.id, label});
            if (checkedCategoryName){
                return res.status(400).json({message: `Category with name ${label} already exist`})
            };

            const category = new Category({user: req.user.id, label, limit, type});

            await category.save();
            return res.json({message: "Category was added"});

        } catch (e) {
            console.log(e);
            res.send({message: "Server error"});
        }
    }
)

router.get('/categories', authMiddleware,
    async (req, res) => {
        try {
            const categories = await Category.find({user: req.user.id});

            return res.json({categories});

        } catch (e) {
            console.log(e);
            res.send({message: "Server error"});
        }
    }
)

router.put('/categories/:_id', authMiddleware,
    async (req, res) => {
        try {
            const { _id } = req.params;
            const { label, limit, type } = req.body;

            const updatedCategory = await Category.findOneAndUpdate(
                { _id },
                {user: req.user.id, label, limit, type },
                { new: true }
            );

            if (!updatedCategory) {
                return res.status(404).json({ message: `Category with label ${label} not found` });
            }

            return res.json({ message: "Category was updated", category: updatedCategory });
        } catch (e) {
            console.log(e);
            res.send({ message: "Server error" });
        }
});

router.delete('/categories/:_id', authMiddleware,
    async (req, res) => {
        try {
            const { _id } = req.params;

            const updatedCategory = await Category.findOneAndDelete({ _id });

            if (!updatedCategory) {
                return res.status(404).json({ message: `Category with id ${_id} not found` });
            }

            return res.json({ message: "Category was deleted"});
        } catch (e) {
            console.log(e);
            res.send({ message: "Server error" });
        }
});


module.exports = router;