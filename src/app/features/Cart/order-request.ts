export interface OrderRequest {
    postIds: string[];
    shipInfo: {
        address: string | null;
        city: string | null;
    };
}
