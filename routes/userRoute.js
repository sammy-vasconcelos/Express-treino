const fs = require('fs')
const { join } = require('path') //lidar com pasta de arquivos

const filePath = join(__dirname, 'users.json') // armazenar os dados no json ao inves do banco de dados

const getUsers = () => { //função que vai pegar os usuarios
    const data = fs.existsSync(filePath)
    ? fs.readFileSync(filePath)
    : []

    try {
        return JSON.parse(data)

    } catch (error) {
        return []
    }

}

const saveUser = (users) => fs.writeFileSync(filePath, JSON.stringify(users, null, '\t'))

const userRoute = (app) => {
    app.route('/users/:id?')
    .get((req, res) => {          // o get vai mostrar os usuarios 
        const users = getUsers()
        res.send({ users })
    })

    .post((req,res) => {          // o Post vai adicionar novos usuarios
        const users = getUsers()
        users.push(req.body) // vai levar o novo nome até o corpo da requisição 
        saveUser(users)
        res.status(201).send('OK')
    })
    
    .put((req,res) => {           // o put vai fazer a atualização dos usuarios
        const users = getUsers()
        saveUser(users.map(user => {
            if (user.id === req.params.id) {
                return {
                    ...user,
                    ...req.body
                }
            }

            return user
        }))  //a função map vai servir parar criar um novo objeto a partir desse user
    
        res.status(200).send('OK')
    })

    .delete((req,res) => {
        const users = getUsers()
        saveUser(users.filter(user => user.id !== req.params.id))

        res.status(200).send('OK')
    })
    
}

module.exports = userRoute