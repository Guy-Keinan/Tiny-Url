import { Request, Response } from "express";
import { UrlService } from "../services/UrlService";

export class UrlController {
    constructor(private urlService: UrlService) { }

    async shortenUrl(req: Request, res: Response): Promise<void> {
        try {
            const { originalUrl } = req.body;
            if (!originalUrl) {
                res.status(400).json({ error: "Original URL is required" });
                return;
            }
            
            const shortUrl = await this.urlService.shortenUrl(originalUrl);
            res.status(201).json({ shortUrl });
        } catch (error) {
            console.error("Error in shortenUrl:", error);
            res.status(500).json({ error: "Failed to shorten the URL" });
        }
    }

    async redirect(req: Request, res: Response): Promise<void> {
        try {
            const { shortUrl } = req.params;
            if (!shortUrl) {
                res.status(400).json({ error: "Short URL is required" });
                return;
            }
            const originalUrl = await this.urlService.getOriginalUrl(shortUrl);
            if (originalUrl) {
                res.redirect(originalUrl);
            } else {
                res.status(404).json({ error: "URL not found" });
            }
        } catch (error) {
            console.error("Error in redirect:", error);
            res.status(500).json({ error: "Failed to redirect" });
        }
    }
}
