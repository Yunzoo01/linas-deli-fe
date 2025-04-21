// src/types.ts
export interface Product {
  id: number;
  name: string;
  description: string;
  allergy: string[];
  price: number;
  glutenFree: boolean;
  servingSuggestion: string;
  pasteurized: boolean;
  imageUrl?: string;
  ingredientImageUrl?: string;
}

export interface Country {
  id: number;
  name: string;
}

export interface Animal {
  id: number;
  name: string;
}

export interface MenuItem {
  productDetailId: number;
  product: Product;
  country: Country;
  animal: Animal;
}
// src/types.ts
export interface Promotion {
  promotionId: number;
  promotionTitle: string;
  promotionImageName: string;
  promotionImageUrl: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
  status?: string;
}

export interface User {
  sessionId: string;
}

export interface Order {
  oid: number;
  status: string;
  date: string;
  time: string;
  platterName: string;
  customerName?: string;  // 주문자 이름
  phone?: string;         // 전화번호
  email?: string;         // 이메일
  allergy?: string;       // 알레르기 정보
  message?: string;       // 메시지
}
