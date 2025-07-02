export interface Posts{
    id:string;
    assets:Asset[];
    title:string;
    description:string;
    price:string;
rating: string;
}

export interface Asset{
    id:string;
    url:string;
}
