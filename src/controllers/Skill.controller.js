const handleError = require('../helpers/handleError');
const Skill = require('../models/Skill');

const createSkill = async (req, res) => {

    try {
        const {name} = req.body;

        const skillCreated = await Skill.create({name});

        res.json({status: true, message: "Habilidad creada", skill: skillCreated});
    } catch (error) {
        handleError(res, 500, error.message);
    }
}


module.exports  = {createSkill}