export interface IUrlRepository {
    create(originalUrl: string): Promise<string>;
    findByShortUrl(shortUrl: string): Promise<string | null>;
}
