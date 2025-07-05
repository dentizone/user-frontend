export interface Asset {
  id: string;
  url: string;
}

export interface Seller {
  id: string;
  username: string;
  academicYear: number;
  universityName: string;
}

export interface Post {
  id: string;
  title: string;
  description: string;
  price: number;
  expireDate: string;
  condition: string;
  category: string;
  subCatgory: string;
  status: string;
  seller: Seller;
  assets: Asset[];
  createdAt: string;
  updatedAt: string;
}

export interface PostsResponse {
  items: Post[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}
