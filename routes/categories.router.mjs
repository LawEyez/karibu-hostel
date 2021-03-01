import * as CategoriesController from '../controllers/categories.controller.mjs'
import { ensureAuthenticated } from '../middlewares/auth.validation.middleware.mjs'

export default app => {
    app.post('/categories', [
        ensureAuthenticated,
        CategoriesController.addCategory
    ])

    app.get('/categories', [
        CategoriesController.getAllCategories
    ])

    app.delete('/categories/:categoryId', [
        ensureAuthenticated,
        CategoriesController.removeCategory
    ])
}