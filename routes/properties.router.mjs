import * as PropertiesController from '../controllers/properties.controller.mjs'
import { ensureAuthenticated } from '../middlewares/auth.validation.middleware.mjs'
import { fileUpload } from '../middlewares/upload.middleware.mjs'


export default app => {
    app.post('/properties', [
        ensureAuthenticated,
        // fileUpload,
        PropertiesController.addProperty
    ])
    
    app.get('/properties', [
        PropertiesController.getAllProperties
    ])
   
    app.get('/properties/:propertyId', [
        PropertiesController.getById
    ])

    app.patch('/properties/:propertyId', [
        ensureAuthenticated,
        PropertiesController.patchById
    ])
    
    app.delete('/properties/:propertyId', [
        ensureAuthenticated,
        PropertiesController.removeProperty
    ])
} 