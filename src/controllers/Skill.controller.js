const handleError = require('../helpers/handleError');
const Skill = require('../models/Skill');
const OtherSkills = require('../models/OtherSkill');
const { formatSkillsRoles } = require('../helpers/formatCv');

const createSkill = async (req, res) => {

	try {
		const { name } = req.body;

		const skillCreated = await Skill.create({ name });

		res.json({ status: true, message: "Habilidad creada", skill: skillCreated });
	} catch (error) {
		handleError(res, 500, error.message);
	}
}

const editSkill = async (req, res) => {
	try {
		const { skillId } = req.params;

		const { name } = req.body;

		const skillFound = await Skill.findByPk(skillId);

		if (!skillFound) {
			return handleError(res, 500, "Habilidad no encontrada");
		}

		await Skill.update(
			{
				name
			}, {
			where: {
				id: skillFound.id
			},
		})

		res.status(200).json({ status: true, message: "Habilidad editada" });

	} catch (error) {
		handleError(res, 500, error.message);
	}
}

const getSkills = async (req, res) => {
	try {
		const skills = await Skill.findAll();
		const otherskills = await OtherSkills.findAll();

		if (skills.length === 0 && otherskills.length === 0) {
			return handleError(res, 500, 'No hay skills cargados aun')
		}

		res.json(formatSkillsRoles(skills, otherskills));
	} catch (error) {
		handleError(res, 500, error.message);
	}
}


module.exports = { createSkill, editSkill, getSkills }
