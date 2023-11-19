// src/infrastructure/webapp/controllers/emails/cms/RenderEmailRouter.ts
import {Router} from 'express';
import {ReactEmailRenderer} from '../../../../../infrastructure/emailProviders/cms/ReactEmailRenderer';
import {RenderReactEmail} from '../../../../../application/use_cases/cms/RenderReactEmail';

const router = Router();
const emailRenderer = new ReactEmailRenderer();
const renderReactEmailUseCase = new RenderReactEmail(emailRenderer);

router.post('/react', async (req, res) => {
    try {
        const emailJson = req.body;
        const renderedEmail = await renderReactEmailUseCase.execute(emailJson);
        res.json({renderedEmail});
    } catch (error) {
        let message: string | unknown = 'unknown error';
        if (error instanceof Error) {
            message = error.message || error;
        }
        res.status(500).json({error: message});
    }
});

export default router;
