const Register = require('../models/RegisterModel')

exports.index = (req, res) => {
    res.render('login')
};

exports.login = async (req, res) => {
    try{
        const registro = new Register(req.body)
        await registro.login()

        if(registro.errors.length > 0){
            req.flash('errors', registro.errors)
            req.session.save(function() {
                return res.redirect('/login/index')
            })
        return
        }   

        req.flash('success', 'Login efetuado com sucesso.')
        req.session.user = registro.user
        req.session.save(function() {
            return res.redirect('/login/index') 
        })

    } catch(e) {
        console.log(e)
        return res.render('error404')
    }

    
}

exports.logout = (req, res) => {
    req.session.destroy()
    res.redirect('/login/index')
}