export type UUID = string;

export type DayOfWeek =
  | 'Mon'
  | 'Tue'
  | 'Wed'
  | 'Thu'
  | 'Fri'
  | 'Sat'
  | 'Sun';

export type Category = {
  id: UUID;
  name: Categories
  createdAt: Date;
  updatedAt: Date;
};

export type Categories = 'starter' |'main' | 'dessert' | 'beverage'

export type Promotion = {
  id: UUID;
  productId: UUID;
  description: string;
  promotionalPrice: number;
  activeDays: DayOfWeek[];
  startTime: string;
  endTime: string;
  createdAt: Date;
  updatedAt: Date;
};

export type MenuItem = {
  productId: UUID;
  productName: string;
  categoryId: UUID | null;
  categoryName: Categories | null;
  basePrice: number;
  finalPrice: number;
  promotionId: UUID | null;
  promotionDescription: string | null;
};

export * from './product.js';