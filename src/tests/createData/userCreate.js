const User = require('../../models/User')

const userCreate = async () =>{

    await User.create(
    {
        firstName: 'Jose',
        lastName: 'Barragan',
        email: 'jose@gmail.com',
        password: 'jose1234',
        phone: '+573506864396'

    }
    )


}


module.exports = userCreate