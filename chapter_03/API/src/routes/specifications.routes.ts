import { Router } from 'express';

import { ensureAuthenticated } from '../middleware/ensureAuthenticate';
import { CreateSpecificationController } from '../modules/cars/useCases/createSpecification/CreateSpecificaionController';

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.use(ensureAuthenticated);
specificationsRoutes.post('/', createSpecificationController.handle);

export { specificationsRoutes };
