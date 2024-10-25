// src/types.ts
export interface Vitamins {
    vitamin_C: string;
    vitamin_A?: string; // optional
    vitamin_B6?: string;
  }
  
  export interface Minerals {
    calcium: string;
    iron: string;
  }
  
  export interface FoodItem {
    name: string;
    image_url: string;
    calories: number;
    protein: number;
    vitamins: Vitamins;
    minerals: Minerals;
    description: string;
  }
  