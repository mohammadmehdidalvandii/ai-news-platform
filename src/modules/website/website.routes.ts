import {Router} from 'express';
import {getArticleBySlug} from './website.controller';

const router =  Router();

router.get('/:slug', getArticleBySlug);

export default router
