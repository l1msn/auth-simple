class authController{
    async registration(request,response){
        try {

        } catch (error) {
           console.log("Error of registration");
           console.log(error);
        }
    }
    async login(request,response){
        try {

        } catch (error) {
            console.log("Error of login");
            console.log(error);
        }
    }
    async getUsers(request,response){
        try {

        } catch (error) {
            console.log("Error of get users");
            console.log(error);
        }
    }
}

module.exports = new authController();