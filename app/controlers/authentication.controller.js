import bcryptjs from "bcryptjs";

const usuarios = [
    {
        user: "ab",
        email: "ab@ab.com",
        password: "$2a$15$YsgmUS6tqpTmCG6GmUV.Q.M0zMO9duyEYgrd.SGNgZ6XO.5j5LNtu",
    },
    {
        user: 'ac',
        email: 'ac@ac.com',
        password: '$2a$15$pp/uHF9oAf9fIF7I01C7PuVzEhM12kMFK1dGmV1GbuygutoJrpPmW'
    },
]

const login = async (req, res) => {

}

const register = async (req, res) => {

    console.log(req.body)

    const user = req.body.user;
    const email = req.body.email;
    const password = req.body.password;

    if(!user || !email || !password) {
        res.status(400).send({status: "Error", message: "Por favor, rellena todo los campos"})
    }

    const emailARevisar = usuarios.find(e => e.email === email);

    if(emailARevisar) {
        res.status(400).send({status: "Error", message: "Este email ya ha sido utilizado"})
    }

    const salt = await bcryptjs.genSalt(15);
    const hashPassword = await bcryptjs.hash(password, salt)
    const nuevoUsuario = {
        user, email, password: hashPassword
    };
    console.log(nuevoUsuario);
    usuarios.push(nuevoUsuario);
    res.status(201).send({status: "ok", message: `Usuario ${nuevoUsuario.user} creado`, redirect: "/"})

}

export const  methods = {
    login,
    register
}