function authController(){
    return{
        login(re,res){
            res.render('auth/login')
        },
        register(re,res){
            res.render('auth/register')
        }
    }
}
module.exports= authController