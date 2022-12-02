const User = require('../models/User');
const Education = require('../models/Education');
const Experience = require('../models/Experience');
const Language = require('../models/Language');
const Skill = require('../models/Skill');
const Role = require('../models/Role');
const OtherSkill = require('../models/OtherSkill');
const OtherRole = require('../models/OtherRole');
const Curriculum = require('../models/Curriculum');
const handleError = require('../helpers/handleError');
const formatCv = require('../helpers/formatCv');

const createCV = async (req, res) => {
	try {
		const { userId } = req.params;
		const {
			fullName,
			phone,
			email,
			portfolio,
			linkedin,
			github,
			address,
			aboutMe,
			experiences,
			skills,
			educations,
			role,
			languages
		} = req.body;

		const userFound = await User.findByPk(userId);

		if (!userFound) {
			return handleError(res, 400, "Usuario no encontrado");
		}

		const curriculumCreated = await Curriculum.create({
			fullName,
			phone,
			email,
			portfolio,
			linkedin,
			github,
			address,
			aboutMe,
			userId
		});

		// CREATE AND JOIN EDUCATIONS TO CV

		if (educations) {
			for (const education of educations) {
				await Education.create({
					title: education.title,
					school: education.school,
					description: education.description,
					startYear: education.startYear,
					endYear: education.endYear,
					cvId: curriculumCreated.id
				})
			}
		}

		// CREATE AND JOIN SKILLS TO CV

		if (skills) {
			for (const skill of skills) {
				const skillFound = await Skill.findOne({ where: { name: skill.name } });
				if (skillFound) {
					await curriculumCreated.addSkill(skillFound);
				} else {
					await OtherSkill.create({
						name: skill.name,
						cvId: curriculumCreated.id
					})
				}
			}
		}

		// CREATE AND JOIN ROLE TO CV
		if (role) {
			const roleFound = await Role.findOne({ where: { name: role } });
			if (roleFound) {
				await curriculumCreated.addRole(roleFound);
			} else {
				await OtherRole.create({
					name: role,
					cvId: curriculumCreated.id
				})
			}
		}

		// CREATE AND JOIN EXPERIENCES TO CV

		if (experiences) {
			for (const experience of experiences) {
				await Experience.create({
					name: experience.name,
					role: experience.role,
					description: experience.description,
					startYear: experience.startYear,
					endYear: experience.endYear,
					cvId: curriculumCreated.id
				})
			}
		}

		// CREATE AND JOIN Language TO CV

		if (languages) {
			for (const language of languages) {
				await Language.create({
					language: language.language,
					skill: language.skill,
					cvId: curriculumCreated.id
				})
			}
		}

		const cv = await Curriculum.findByPk(curriculumCreated.id, {
			include: [
				"languages",
				"projects",
				"otherRoles",
				"roles",
				"otherSkills",
				"skills",
				"educations",
				"experiences"
			]
		});


		res.status(200).json({ status: true, message: "CV creado satisfactoriamente!", cv });
	} catch (error) {
		handleError(res, 500, error.message)
	}

}

const getCV = async (req, res) => {
	try {
		const { userId, cvId } = req.params;
		const curriculumFound = await Curriculum.findOne({
			where: { userId, id: cvId },
			include: [
				"languages",
				"projects",
				"otherRoles",
				"roles",
				"otherSkills",
				"skills",
				"educations",
				"experiences"
			]
		})

		if (!curriculumFound) {
			return handleError(res, 400, "CV no encontrado");
		}
		
		if (curriculumFound.id !== Number(cvId)) {
			return handleError(res, 403, "El CV al que intentas acceder no pertenece al usuario");
		}

		res.status(200).json({ status: true, data: formatCv(curriculumFound) });
	} catch (error) {
		handleError(res, 500, error.message)
	}
}

const getCVs = async (req, res) => {
	try {
		const { userId } = req.params;
		const curriculumFound = await Curriculum.findAll({
			where: { userId },
			include: [
				"languages",
				"projects",
				"otherRoles",
				"roles",
				"otherSkills",
				"skills",
				"educations",
				"experiences"
			]
		});

		if (!curriculumFound || curriculumFound.length === 0) {
			return handleError(res, 400, "CV no encontrado");
		}

		const cv = [];
		for (let i = 0; i < curriculumFound.length; i++) {
			cv.push(formatCv(curriculumFound[i]));
		}

		return res.status(200).json({ status: true, data: cv });
	} catch (error) {
		handleError(res, 500, error.message)
	}
}

const deleteCV = async (req, res) => {
	try {
		const { userId, cvId } = req.params;

		const curriculumFound = await Curriculum.findOne({ where: { userId, id: cvId } })

		if (!curriculumFound) {
			return handleError(res, 400, "CV no encontrado");
		}
		if (curriculumFound.id !== Number(cvId)) {
			return handleError(res, 403, "El CV que intentas eliminar no pertenece al usuario");
		}

		await Curriculum.destroy({ where: { userId, id: cvId } });

		res.status(200).json({ status: true, message: 'CV eliminado' });

	} catch (error) {
		handleError(res, 500, error.message)
	}
}

const editCv = async (req, res) => {
	try {
		const {
			fullName,
			phone,
			email,
			portfolio,
			linkedin,
			github,
			address,
			aboutMe,
			experiences,
			skills,
			educations,
			role,
			languages
		} = req.body;

		const { userId, cvId } = req.params;

		// check if the user want to edit a cv that it's yours

		const cvFound = await Curriculum.findOne({ where: { id: cvId, userId } });

		if (!cvFound) {
			return handleError(res, 400, "Id de cv o usuario inválido");
		}

		// update simple data of table cv

		await Curriculum.update({
			fullName,
			phone,
			email,
			portfolio,
			linkedin,
			github,
			address,
			aboutMe
		}, {
			where: {
				id: cvId
			}
		});

		// update experiences of table experience related with cv

		if (experiences) {
			for (const experience of experiences) {
				await Experience.update({
					name: experience.name,
					role: experience.role,
					description: experience.description,
					startYear: experience.startYear,
					endYear: experience.endYear
				}, {
					where: { id: experience.id, cvId }
				})
			}
		}

		// update languages of table experience related with cv

		if (languages) {
			for (const language of languages) {
				await Language.update({
					language: language.language,
					skill: language.skill,
				}, {
					where: { id: language.id, cvId }
				})
			}
		}

		// update educations of table experience related with cv

		if (educations) {
			for (const education of educations) {
				await Education.update({
					title: education.title,
					school: education.school,
					description: education.description,
					startYear: education.startYear,
					endYear: education.endYear,
				}, {
					where: { id: education.id, cvId }
				})
			}
		}

		// update skills of table experience related with cv

		if (skills) {
			for (const skill of skills) {
				const skillFound = await Skill.findOne({ where: { id: skill.id, name: skill.nameToEdit } });
				if (skillFound) {
					await Skill.update({
						name: skill.nameForEdit
					}, {
						where: {
							id: skill.id,
							name: skill.nameToEdit
						}
					})
				} else {
					const otherSkillFound = await OtherSkill.findOne({ where: { id: skill.id, name: skill.nameToEdit } });
					if (otherSkillFound) {
						await OtherSkill.update({
							name: skill.nameForEdit
						}, {
							where: {
								id: skill.id,
								name: skill.nameToEdit
							}
						})
					}
				}

			}
		}

		// update role of table experience related with cv

		if (role) {
			const roleFound = await Role.findOne({ where: { id: role.id, name: role.nameToEdit } });
			if (roleFound) {
				await Role.update({
					name: role.nameForEdit
				}, {
					where: {
						id: role.id,
						name: role.nameToEdit
					}
				})
			} else {
				const otherRoleFound = await OtherRole.findOne({ where: { id: role.id, name: role.nameToEdit } });
				if (otherRoleFound) {
					await OtherSkill.update({
						name: role.nameForEdit
					}, {
						where: {
							id: role.id,
							name: role.nameToEdit
						}
					})
				}
			}
		}



		res.status(200).json({ status: true, message: "CV editado correctamente" });

	} catch (error) {
		handleError(res, 500, error.message);
	}
}

module.exports = {
	createCV,
	getCV,
	getCVs,
	deleteCV,
	editCv
};
