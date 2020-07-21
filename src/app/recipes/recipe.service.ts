import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class RecipeService {

  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'Tasty Schnitzel',
      'A super-tasty Schnitzel - just awesome!',
      'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20)
      ]),
    new Recipe('Pakoras',
      'Indian fritters made of chickpea flour with added vegetables like potato, bell peppers, cabbage, and spices',
      'https://myfoodstory.com/wp-content/uploads/2018/10/Vegetable-Pakoras-4.jpg',
      [
        new Ingredient('Potatoes', 2),
        new Ingredient('Flour', 1),
        new Ingredient('Mint Chutney', 1),
      ]),
    new Recipe('Chicken Tikka Masala',
      "Aromatic spices and tangy yogurt chicken curry",
      'https://cdn-image.myrecipes.com/sites/default/files/styles/4_3_horizontal_-_1200x900/public/slow-cooker-chicken-tikka-masala-ck.jpg?itok=iQg1qs0B',
      [
        new Ingredient('Chicken', 1),
        new Ingredient('Tomato sause', 1),
        new Ingredient('Ginger & Garlic', 2),
      ]),
    new Recipe('Palak Paneer',
      "Cottage Cheese in smooth delicious spinach gravy",
      'https://www.rasoirani.com/wp-content/uploads/2020/04/palak-paneer.jpg',
      [
        new Ingredient('Paneer', 1),
        new Ingredient('Spinach', 1),
        new Ingredient('Onions', 1),
      ])
  ];

  constructor(private slService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number){
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe){
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number){
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
