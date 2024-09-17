export type ErrorWithMessage = {
    status: number;
    data: {
        details: string;
        username?: string[];
    }
}