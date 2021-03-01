import * as AuthController from '../controllers/auth.controller.mjs'

export default app => {
    app.post('/auth/login', [
        AuthController.login
    ])
}