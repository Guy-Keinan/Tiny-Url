import { Router } from "express";
import { UrlController } from "../controllers/UrlController";
import { UrlRepository } from '../repositories/UrlRepository';
import { UrlService } from "../services/UrlService";
import Url from "../models/Url";

const router = Router();

const urlRepository = new UrlRepository();
const urlService = new UrlService(urlRepository);
const urlController = new UrlController(urlService);

router.post("/shorten", (req, res) => urlController.shortenUrl(req, res));
router.get("/:shortUrl", (req, res) => urlController.redirect(req, res));

export default router;
