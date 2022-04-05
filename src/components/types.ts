export type GetImageUrl = () => Promise<string>;

export type UploadImage = (file: File) => Promise<string>;

export type GetLinkUrl = (prevUrl?: string | null) => Promise<string | null>;
