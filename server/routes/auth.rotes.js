const Router = require("express");
const User = require("../models/User");
const bcrypt = require('bcrypt');
const config = require('config');
const jwt = require('jsonwebtoken');
const {check, validationResult} = require("express-validator");
const router = new Router();
const authMiddleware = require('../middleware/auth.middleware')

router.post('/registration',
    [
        check('email', 'Uncorrect email').isEmail(),
        check('password', 'Password must be longer than 3 and shorter than 12').isLength({min: 3, max: 12}),
    ], 
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()){
                return res.status(400).json({message: 'Невірний запит', errors})
            }

            const {email, password} = req.body;

            const candidate = await User.findOne({email});
            if (candidate){
                return res.status(400).json({message: `Користувач з поштою ${email} вже існує`})
            };

            const hashPassword = await bcrypt.hash(password, 8);

            const user = new User({email, password: hashPassword});

            await user.save();
            return res.json({message: "Користувача було створено"});

        } catch (e) {
            console.log(e);
            res.send({message: "Помилка сервера"});
        }
    }
)

router.post('/login',
    async (req, res) => {
        try {
            const {email, password} = req.body;
            const user = await User.findOne({email})
            if (!user){
                return res.status(404).json({message: "Користувача не знайдено"})
            }

            const isPassValid = bcrypt.compareSync(password, user.password)
            if (!isPassValid){
                return res.status(400).json({message: "Невірний пароль"})
            }

            const token = jwt.sign({id: user.id}, config.get("secretKey"), {expiresIn: "1h"});

            return res.json({
                message: "Ви успішно увійшли в аккаунт!",
                token,
                user: {
                    id: user.id,
                    email: user.email
                }
            })

        } catch (e) {
            console.log(e);
            res.send({message: "Помилка сервера"});
        }
    }
)

router.get('/auth', authMiddleware,
    async (req, res) => {
        try {
            const user = await User.findOne({_id: req.user.id})

            const token = jwt.sign({id: user.id}, config.get("secretKey"), {expiresIn: "1h"});

            return res.json({
                token,
                user: {
                    id: user.id,
                    email: user.email
                }
            })

        } catch (e) {
            console.log(e);
            res.send({message: "Помилка сервера"});
        }
    }
)

module.exports = router;