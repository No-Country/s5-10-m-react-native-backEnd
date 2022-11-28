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



module.exports  = {createRole}