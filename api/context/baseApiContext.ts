export type ApiContext = {
    baseURL: string;
};

export const createApiContext = async (baseURL: string): Promise<ApiContext> => {
    if (!baseURL) {
        throw new Error('API URL not provided');
    }
    return {
        baseURL,
    };
};
