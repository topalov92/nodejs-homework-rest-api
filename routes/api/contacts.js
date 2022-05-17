const express = require('express')
const {auth, ctrlWrapper , validation}=require('../../middlewares')
const {joiShema, favoriteJoiShema}=require('../../models/contact')

const {contacts: ctrl} = require('../../controllers')

const router = express.Router()

router.get('/', auth, ctrlWrapper(ctrl.listContact))

router.get('/:contactId', auth, ctrlWrapper(ctrl.getContactById))

router.post('/', auth, validation(joiShema), ctrlWrapper(ctrl.addContact))

router.put('/:contactId', auth, validation(joiShema), ctrlWrapper(ctrl.updateContact))

router.delete('/:contactId', auth, ctrlWrapper(ctrl.removeContact))

router.patch('/:contactId/favorite', auth,
    validation(favoriteJoiShema),
    ctrlWrapper(ctrl.updateContactStatus)
);

module.exports = router;