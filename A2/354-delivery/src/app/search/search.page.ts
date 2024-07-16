import { Component } from '@angular/core';
import { FoodItem } from '../shared/foodItem';
import { FoodData } from '../shared/foodData';
import { ImageService } from '../services/image.service';

@Component({
  selector: 'app-search',
  templateUrl: 'search.page.html',
  styleUrls: ['search.page.scss']
})
export class SearchPage {
  searchText: string = ''; // Input text for search
  restaurants: FoodItem[] = FoodData; // Array to hold all restaurants
  filteredRestaurants: FoodItem[] = []; // Array to hold filtered results
  type: string = ''; // Type of restaurant for search
  maxDistance: number = 0; // Maximum distance for search
  minRating: number = 0; // Minimum rating for search
  maxPrice: number = 0; // Maximum price for search
  showFilters: boolean = false; // Flag to show/hide filters
  typeArray!: string[];

  constructor() { }

  getFoodImage(imageName: string) {
    return ImageService.getImage(imageName);
  }


  ngOnInit() {
    this.typeArray = this.restaurants.map(restaurant => restaurant.type);
    this.typeArray = this.typeArray.filter((value, index, self) => self.indexOf(value) === index);
  }

  filterRestaurants() {
    // If showFilters is true and any filter input has been modified, apply filters
    if (this.searchText.toLowerCase() === '') {
      this.filteredRestaurants = [];
    }
    else {
      if (this.showFilters && (this.type || this.maxDistance || this.minRating || this.maxPrice)) {
        this.applyFilters();
      } else {
        // Otherwise, only apply search text filter
        if (this.searchText.toLowerCase() === 'all') {
          this.filteredRestaurants = this.restaurants;
        } else {
          this.filteredRestaurants = this.restaurants.filter(restaurant =>
            restaurant.restaurantName.toLowerCase().includes(this.searchText.toLowerCase())
            || restaurant.dishName.toLowerCase().includes(this.searchText.toLowerCase())
          );
        }
      }
    }
  }

  private applyFilters() {
    this.filteredRestaurants = this.restaurants.filter(restaurant => {
      // Apply individual filters
      return (!this.type || restaurant.type.toLowerCase().includes(this.type.toLowerCase())) &&
        (!this.maxDistance || restaurant.distance <= this.maxDistance) &&
        (!this.minRating || restaurant.ratings >= this.minRating) &&
        (!this.maxPrice || restaurant.price <= this.maxPrice) &&
        (this.searchText.toLowerCase() === 'all' || (restaurant.restaurantName.toLowerCase().includes(this.searchText.toLowerCase()) || restaurant.dishName.toLowerCase().includes(this.searchText.toLowerCase())));
    });
  }

  orderItems(foodItem: FoodItem) {
    // Retrieve existing array from localStorage
    const existingItemsString = localStorage.getItem('cart');
    if (existingItemsString) {
    }
    let selectedFoodItems = [];

    // Parse existing array from JSON if it exists
    if (existingItemsString) {
      selectedFoodItems = JSON.parse(existingItemsString);
    }

    // Add the clicked food item to the array
    selectedFoodItems.push(foodItem);
    // Store the updated array back to localStorage
    localStorage.setItem('cart', JSON.stringify(selectedFoodItems));
  }

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

  handleClearSearch() {
    // Add your logic here for when the search bar is cleared
    this.searchText = '';
    this.filterRestaurants();
  }
}
