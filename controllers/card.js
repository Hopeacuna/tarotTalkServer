const { DataTypes } = require('sequelize');
const db = require('../db')
const Express = require('express');
const { CardModel } = require('../models');
const validateJWT = require('../middleware/validateSession');
const router = Express.Router();

// ! CREATE A TAROT CARD

router.post('/create',  validateJWT, async (req, res) => {
    const {name, keywords, deck, major, numeral} = req.body;
    const cardEntry = {
        name : name,
        keywords : keywords,
        deck : deck,
        major : false,
        numeral : numeral,
    }

    try {
        const card = await CardModel.create(cardEntry);
        res.status(200).json(card);
    }
    catch(err) {
        console.log(err)
        res.status(500).json({error: err})
    }
})

// ! DELETE A CARD BY THE CARDS ID

router.delete('/delete/:id', validateJWT, async (req, res) => {
    const cardId = req.params.id;

    try {
        const query = {
            where: {
                id: cardId,
            }
        };

        await CardModel.destroy(query);
        res.status(200).json({ msg: "Card has been removed from list"});
    } catch (err) {
        res.status(500).json({error: err})
    }
})

// ! GET ALL CARDS

 router.get('/', async (req, res) => {
        try {
            const cards = await CardModel.findAll();
            res.status(200).json(cards);
        } catch (err) {
            res.status(500).json({error: err})
        }
    })

//  ! GET CARD BY ID

router.get('/:id', async (req, res) => {
    const cardId = req.params.id;
    try {
        const card = await CardModel.findAll({
            where: {
            id: cardId
            // completed: false
        }
        });
        res.status(200).json(card);
    } catch (err) {
        res.status(500).json({error: err})
    }
})


// ! UPDATE A CARD

router.put('/update/:cardId', validateJWT, async (req, res) => {
    const {name, keywords, deck, major, numeral} = req.body;
    const cardId = req.params.cardId;

    const query = {
        where: {
            id: cardId
        }
    }

    const updateCard = {
        name: name,
        keywords: keywords,
        deck: deck,
        major: major,
        numeral: numeral
    };
    try {
        const update = await CardModel.update(updateCard, query);
        res.status(200).json(update);
    } catch (err) {
        console.log(err)
        res.status(500).json({error: err})
    }

})

module.exports = router;