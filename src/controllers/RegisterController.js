const Register = require('../models/RegisterModel')

exports.index = (req, res) => {
    res.render('register')
}

exports.register = async (req, res) => {
    try{
        const registro = new Register(req.body)
        await registro.createUser()

        if(registro.errors.length > 0){
            req.flash('errors', registro.errors)
            req.session.save(function() {
                return res.redirect('/register/index')
        })
        return
    }

    req.flash('success', 'Usuário criado com sucesso.')
    req.session.save(function() {
        return res.redirect('/register/index') 
    })

    } catch(e) {
        console.log(e)
        return res.render('error404')
    }
}

