import { HttpClient } from '../../core/http-client';

export interface Recipe {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  summary?: string;
  ingredients?: string[];
  instructions?: string;
  diets: string[];
  sourceUrl: string;
}

export interface RecipeSearchResult {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
}

interface SpoonacularSearchResponse {
  results: Array<{
    id: number;
    title: string;
    image: string;
    readyInMinutes: number;
    servings: number;
  }>;
}

interface SpoonacularRecipeResponse {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  summary: string;
  extendedIngredients: Array<{ original: string }>;
  instructions: string;
  diets: string[];
  sourceUrl: string;
}

interface SpoonacularRandomResponse {
  recipes: SpoonacularRecipeResponse[];
}

/**
 * Spoonacular Food API — https://spoonacular.com/food-api
 * Free tier: 150 requests/day
 * Get your key at: https://spoonacular.com/food-api/console#Dashboard
 */
export class FoodAPI extends HttpClient {
  constructor(apiKey: string) {
    super({
      baseURL: 'https://api.spoonacular.com',
      apiKeyParam: 'apiKey',
      apiKey,
    });
  }

  async searchRecipes(options: {
    query: string;
    diet?: 'vegetarian' | 'vegan' | 'glutenFree' | 'ketogenic' | 'paleo';
    cuisine?: string;
    maxReadyTime?: number;
    number?: number;
  }): Promise<RecipeSearchResult[]> {
    const data = await this.get<SpoonacularSearchResponse>('/recipes/complexSearch', {
      query: options.query,
      diet: options.diet,
      cuisine: options.cuisine,
      maxReadyTime: options.maxReadyTime,
      number: options.number ?? 10,
    });
    return data.results;
  }

  async getRecipeDetails(recipeId: number): Promise<Recipe> {
    const data = await this.get<SpoonacularRecipeResponse>(`/recipes/${recipeId}/information`);
    return {
      id: data.id,
      title: data.title,
      image: data.image,
      readyInMinutes: data.readyInMinutes,
      servings: data.servings,
      summary: data.summary.replace(/<[^>]*>/g, ''),
      ingredients: data.extendedIngredients.map((i) => i.original),
      instructions: data.instructions?.replace(/<[^>]*>/g, ''),
      diets: data.diets,
      sourceUrl: data.sourceUrl,
    };
  }

  async getRandomRecipes(options: {
    number?: number;
    tags?: string;
  } = {}): Promise<Recipe[]> {
    const data = await this.get<SpoonacularRandomResponse>('/recipes/random', {
      number: options.number ?? 3,
      tags: options.tags,
    });
    return data.recipes.map((r) => ({
      id: r.id,
      title: r.title,
      image: r.image,
      readyInMinutes: r.readyInMinutes,
      servings: r.servings,
      summary: r.summary?.replace(/<[^>]*>/g, ''),
      ingredients: r.extendedIngredients.map((i) => i.original),
      instructions: r.instructions?.replace(/<[^>]*>/g, ''),
      diets: r.diets,
      sourceUrl: r.sourceUrl,
    }));
  }
}
