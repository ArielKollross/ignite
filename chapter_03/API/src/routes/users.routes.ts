import { Router } from 'express'
import { CreateUserCaseController } from '../modules/accounts/useCases/CreateUser/CreateUserController'

const userRoutes = Router()

const createUserController = new CreateUserCaseController()

userRoutes.post("/", createUserController.handle)

export { userRoutes }