// cart.page.ts
import { Component } from '@angular/core';
import { FoodItem } from '../shared/foodItem';
import { ImageService } from '../services/image.service';

interface FoodItemsWithDate {
  foodItems: FoodItem[];
  date: Date;
  totalPrice: number;
  location: string;
  paymentMethod?: string;
}

@Component({
  selector: 'app-cart',
  templateUrl: 'cart.page.html',
  styleUrls: ['cart.page.scss']
})

export class CartPage {
  cartItems: any[] = [];
  totalPrice: number = 0;
  deliveryFee: number = 25;
  isModalOpen = false;
  finalPrice: number = 0;
  addresses: string[] = []; // Array to store addresses
  activeIndex: number = -1;
  paymentMethod: string = '';
  deliveryInstructions: string = '';

  constructor() { }

  getFoodImage(imageName: string) {
    return ImageService.getImage(imageName);
  }

  ionViewWillEnter() {
    // Retrieve items from localStorage
    this.deliveryInstructions = '';
    const cartItemsString = localStorage.getItem('cart');
    const profileDetails = localStorage.getItem('profile');
    if (cartItemsString) {
      // Parse the JSON and assign it to cartItems
      this.cartItems = JSON.parse(cartItemsString);
      if (this.cartItems.length === 0) {
        this.totalPrice = 0;
      }
      else {
        // Calculate the total price of the items
        this.totalPrice = this.cartItems.reduce((acc, item) => acc + item.price, 0);
        // this.deliveryFee = this.totalPrice * 0.15;
        this.deliveryFee = 25;
      }
    }
    else {
      // If no items are found, initialize the cartItems array
      this.cartItems = [];
    }

    if (profileDetails) {
      const profile = JSON.parse(profileDetails);
      this.addresses = profile.addresses ?? [];
      this.activeIndex = profile.activeIndex ?? -1;
    }
  }

  orderItems(isOpen: boolean) {
    // Retrieve existing array from localStorage
    if (this.cartItems.length === 0) {
      return;
    }

    if (this.activeIndex === -1) {
      alert('Please select an address to deliver the order');
      return;
    }

    if (this.addresses.length === 0) {
      alert('Please add an address to deliver the order');
      return;
    }
    const existingItemsString = localStorage.getItem('order');
    let selectedFoodItems = [];

    const foodItemsWithDate: FoodItemsWithDate = {
      foodItems: this.cartItems,
      date: new Date(),
      totalPrice: this.totalPrice + this.deliveryFee, // You can set the date to the current date or any other date as needed
      location: this.addresses[this.activeIndex],
      paymentMethod: this.paymentMethod === '' ? 'Cash on delivery' : this.paymentMethod
    };
    // Parse existing array from JSON if it exists
    if (existingItemsString) {
      selectedFoodItems = JSON.parse(existingItemsString);
    }

    // Add the clicked food item to the array
    selectedFoodItems.push(foodItemsWithDate);
    // Store the updated array back to localStorage
    localStorage.setItem('order', JSON.stringify(selectedFoodItems));
    this.cartItems = [];
    this.finalPrice = this.totalPrice + this.deliveryFee;
    // this.deliveryFee = 0;
    this.totalPrice = 0;
    this.resetStorage();
    this.setOpen(isOpen);
  }

  removeItem(item: FoodItem): void {
    const index = this.cartItems.findIndex(cartItem =>
      cartItem.restaurantName === item.restaurantName && cartItem.dishName === item.dishName
    );
    if (index !== -1) {
      this.cartItems.splice(index, 1);
      this.totalPrice -= item.price;
      // this.deliveryFee = this.totalPrice * 0.15;
      if (this.cartItems.length === 0) {
        this.totalPrice = 0;
      }
      localStorage.setItem('cart', JSON.stringify(this.cartItems));
    }
  }


  resetStorage() {
    // Clear the localStorage
    localStorage.removeItem('cart');
    this.cartItems = [];
    this.totalPrice = 0;
    this.deliveryFee = 0;
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  groupCartItems(): any[] {
    const groupedItems: { [key: string]: any } = {}; // Add index signature to allow indexing with a string key
    this.cartItems.forEach(item => {
      const key = `${item.restaurantName}_${item.dishName}`;
      if (groupedItems[key]) {
        groupedItems[key].count++;
      } else {
        groupedItems[key] = { ...item, count: 1 };
      }
    });
    return Object.values(groupedItems);
  }


}
