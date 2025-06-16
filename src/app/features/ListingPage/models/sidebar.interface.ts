export interface SidebarData {
  cities: string[];
  categories: Array<{
    id: string;
    categoryName: string;
    icon: string;
  }>;
  minPrice: number;
  maxPrice: number;
}

export interface FilterOptions {
  category: string;
  city: string;
  price: number;
  fromDate: Date;
  toDate: Date;
  conditions: string[];
  sortBy: string;
} 