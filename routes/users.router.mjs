import * as UsersController from '../controllers/users.controller.mjs'
import * as AuthValidationMiddleware from '../middlewares/auth.validation.middleware.mjs'

export default app => {
    app.post('/users', [
        UsersController.createUser
    ])

    app.get('/users', [
        AuthValidationMiddleware.ensureAuthenticated,
        UsersController.getUsers
    ])
}