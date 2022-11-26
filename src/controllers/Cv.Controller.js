const User = require('../models/User');
const Education = require('../models/Education');
const Experience = require('../models/Experience');
const Skill = require('../models/Skill');
const Curriculum = require('../models/Curriculum');
const handleError = require('../helpers/handleError');

const createCV = async (req, res) => {
	try {
		const { userId } = req.params;
		const {
			fullName,
			rol,
			phone,
			email,
			portfolio,
			linkedin,
			github,
			address,
			aboutMe,
			experiences,
			skills,
			educations
		} = req.body;

		const userFound = await User.findByPk(userId);

		if (!userFound) {
			return handleError(res, 400, "Usuario no encontrado");
		}

		const curriculumCreated = await Curriculum.create({
			fullName,
			rol,
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
				await Skill.create({
					name: skill.name,
					cvId: curriculumCreated.id
				})
			}
		}

		// CREATE AND JOIN EXPERIENCES TO CV

		if (experiences) {
			for (const experience of experiences) {
				await Experience.create({
					title: experience.title,
					description: experience.description,
					startYear: experience.startYear,
					endYear: experience.endYear,
					cvId: curriculumCreated.id
				})
			}
		}


		res.status(200).json({ status: true, message: "CV creado satisfactoriamente!" });
	} catch (error) {
		handleError(res, 500, error.message)
	}

}

const getCv = async (req, res) => {
	try {
		const { userId } = req.body;

		const curriculumFound = await Curriculum.findOne({
			where: {
				userId
			}
		});

		if (!curriculumFound) {
			return handleError(res, 400, "Curriculum no encontrado");
		}

		res.status(200).json({ status: true, message: curriculumFound });

	} catch (error) {
		handleError(res, 500, error.message)
	}
}

module.exports = {
	createCV,
	getCv
};
