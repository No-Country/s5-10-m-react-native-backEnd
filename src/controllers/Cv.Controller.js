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
				const skillFound = await Skill.findOne({where: {name: skill.name}});
				if(skillFound){
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
				const roleFound = await Role.findOne({where: {name: role}});
				if(roleFound){
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
		const { userId } = req.params;

		const curriculumFound = await Curriculum.findAll({ where: { userId } });

		if (!curriculumFound || curriculumFound.length === 0) {
			return handleError(res, 400, "CV no encontrado");
		}

		const cv = [];

		for (let i = 0; i < curriculumFound.length; i++) {
			const { fullName, phone, email, portfolio, linkedin, github, address, aboutMe, id, userId } = curriculumFound[i];
			const education = await Education.findAll({ where: { cvId: curriculumFound[i].id } });
			const experience = await Experience.findAll({ where: { cvId: curriculumFound[i].id } });
			const language = await Language.findAll({ where: { cvId: curriculumFound[i].id } });
			const skill = await Skill.findAll({ where: { cvId: curriculumFound[i].id } });
			const role = await Role.findAll({ where: { cvId: curriculumFound[i].id } });
			const otherskill = await OtherSkill.findAll({ where: { cvId: curriculumFound[i].id } });
			const otherrole = await OtherRole.findAll({ where: { cvId: curriculumFound[i].id } });
			cv.push({
				id,
				userId,
				fullName,
				phone,
				email,
				portfolio,
				linkedin,
				github,
				address, 
				aboutMe,
				education,
				experience,
				language,
				skill: [...skill.map(i => i.name), ...otherskill.map(i => i.name)],
				role: [...role.map(i => i.name), ...otherrole.map(i => i.name)]
			});
		}

		res.status(200).json({ status: true, data: cv });

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

module.exports = {
	createCV,
	getCV,
	deleteCV
};
