import UrlModel from "../models/Url";
import { IUrlRepository } from "../interfaces/IUrlRepository";

export class UrlRepository implements IUrlRepository {
    private baseUrl: string;

    constructor() {
        this.baseUrl = process.env.BASE_URL || "http://localhost:4000";
    }

    async create(originalUrl: string): Promise<string> {
        const shortUrl = `${this.generateShortUrl()}`;
        await UrlModel.create({ shortUrl, originalUrl });
        return `${this.baseUrl}/${shortUrl}`;
    }

    async findByShortUrl(shortUrl: string): Promise<string | null> {
        const url = await UrlModel.findOne({ shortUrl });
        return url?.originalUrl || null;
    }

    private generateShortUrl(): string {
        return Math.random().toString(36).substr(2, 6); // Example generator
    }
}
