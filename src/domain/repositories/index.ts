import {
	Category,
	DayOfWeek,
	MenuItem,
	Product,
	Promotion,
	UUID,
} from '../entities/index.js';

export interface CategoryRepository {
	create(input: { id: UUID; name: string }): Promise<Category>;
	findById(id: UUID): Promise<Category | null>;
	findAll(): Promise<Category[]>;
	updateName(id: UUID, name: string): Promise<Category | null>;
	deleteById(id: UUID): Promise<boolean>;
}

export interface ProductRepository {
	create(input: {
		id: UUID;
		name: string;
		price: number;
		hidden?: boolean;
		categoryId?: UUID | null;
	}): Promise<Product>;
	findById(id: UUID): Promise<Product | null>;
	findAll(filters?: { includeHidden?: boolean }): Promise<Product[]>;
	update(input: {
		id: UUID;
		name?: string;
		price?: number;
		hidden?: boolean;
		categoryId?: UUID | null;
	}): Promise<Product | null>;
	deleteById(id: UUID): Promise<void | undefined>;
}

export interface PromotionRepository {
	create(input: {
		id: UUID;
		productId: UUID;
		description: string;
		promotionalPrice: number;
		activeDays: DayOfWeek[];
		startTime: string;
		endTime: string;
	}): Promise<Promotion>;
	findById(id: UUID): Promise<Promotion | null>;
	findByProductId(productId: UUID): Promise<Promotion[]>;
	findActiveAt(params: {
		productId: UUID;
		day: DayOfWeek;
		time: string;
	}): Promise<Promotion | null>;
	update(input: {
		id: UUID;
		description?: string;
		promotionalPrice?: number;
		activeDays?: DayOfWeek[];
		startTime?: string;
		endTime?: string;
	}): Promise<Promotion | null>;
	deleteById(id: UUID): Promise<boolean>;
}

export interface MenuReadRepository {
	findMenu(filters?: {
		day?: DayOfWeek;
		time?: string;
		includeHidden?: boolean;
	}): Promise<MenuItem[]>;
}

