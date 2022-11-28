const handleError = require('../helpers/handleError');
const Role = require('../models/Role');

const createRole = async (req, res) => {

    try {
        const {name} = req.body;

        const roleCreated = await Role.create({name});

        res.json({status: true, message: "Rol creado", role: roleCreated});
    } catch (error) {
        handleError(res, 500, error.message);
    }
}

const editRole = async (req, res) => {
    try {
        const {roleId} = req.params;

        const {name} = req.body; 

        const roleFound = await Role.findByPk(roleId);

        if(!roleFound){
            return handleError(res, 500, "Rol no encontrado");
        }

        await Role.update(
            {
                name
            }, {
                where: {
                    id: roleFound.id
                },
        })

        res.status(200).json({status: true, message: "Habilidad editada"});

    } catch (error) {
        handleError(res, 500, error.message);
    }
}



module.exports  = {createRole, editRole}