import { IUrlRepository } from "../interfaces/IUrlRepository";
import { UrlRepository } from '../repositories/UrlRepository';

export class UrlService {
    constructor(private urlRepository: IUrlRepository) { }

    async shortenUrl(originalUrl: string): Promise<string> {
        try {
            return await this.urlRepository.create(originalUrl);
        } catch (error) {
            console.error("Error in UrlService.shortenUrl:", error);
            throw new Error("Could not shorten the URL");
        }
    }

    async getOriginalUrl(shortUrl: string): Promise<string | null> {
        try {
            return await this.urlRepository.findByShortUrl(shortUrl);
        } catch (error) {
            console.error("Error in UrlService.getOriginalUrl:", error);
            throw new Error("Could not retrieve the original URL");
        }
    }
}