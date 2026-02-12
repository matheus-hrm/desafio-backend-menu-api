import { DayOfWeek, Promotion } from '../entities/index.js';

export interface PromotionEligibilityService {
  isPromotionActive(params: {
    promotion: Promotion;
    day: DayOfWeek;
    time: string;
  }): boolean;
}