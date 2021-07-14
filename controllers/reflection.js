const { DataTypes } = require('sequelize');
const db = require('../db')
const Express = require('express');
const { ReflectionModel } = require('../models');
const validateJWT = require('../middleware/validateSession');
const router = Express.Router();


// ! CREATE A REFLECTION

router.post('/create',  validateJWT, async (req, res) => {
    const {drawnCard, title, reflection, date, user} = req.body;
    const reflectionEntry = {
        drawnCard : drawnCard,
        title: title,
        reflection: reflection,
        date : date,
        user: user
    }
    try {
        const newReflection = await ReflectionModel.create(reflectionEntry);
        res.status(200).json(newReflection);
    }
    catch(err) {
        console.log(err)
        res.status(500).json({error: err})
    }
})


//  ! VIEW BY USER

router.get('/:id', validateJWT, async (req, res) => {
    let { id } = req.user;
    try {
        const userReflection = await ReflectionModel.findAll({
            where: {
            owner_id: id
            // completed: false
        }
        });
        res.status(200).json(userReflection);
    } catch (err) {
        res.status(500).json({error: err})
    }
})


// ! UPDATE THE REFLECTION

router.put('/update/:reflectionId', validateJWT, async (req, res) => {
    const {drawnCard, title, reflection, date} = req.body;
    const reflectionId = req.params.reflectionId;
    const userId = req.user.id;

    const query = {
        where: {
            id: reflectionId,
            owner_id: userId
        }
    }

    const updateReflection = {
        drawnCard: drawnCard,
        date: date,
        title: title,
        reflection: reflection
    };
    try {
        const update = await ReflectionModel.update(updateReflection, query);
        res.status(200).json(update);
    } catch (err) {
        console.log(err)
        res.status(500).json({error: err})
    }

})

// ! DELETE AN ENTRY

router.delete('/delete/:id', validateJWT, async (req, res) => {
    const ownerId = req.user.id;
    const reflectionId = req.params.id;

    try {
        const query = {
            where: {
                id: reflectionId,
                owner_id: ownerId,
            }
        };

        await ReflectionModel.destroy(query);
        res.status(200).json({ msg: "This entry has been removed"});
    } catch (err) {
        res.status(500).json({error: err})
    }
})

module.exports = router;