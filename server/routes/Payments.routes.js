import { Router } from 'express';
import * as PaymentsController from '../controllers/Payments.controller';
import { catchErrors } from '../errors/handleErrors';

const router = new Router();

router
  .route('/payments/free')
  .post(catchErrors(PaymentsController.freeProcessor));

router
  .route('/payments/stripe')
  .post(catchErrors(PaymentsController.stripeProcessor));

export default router;
