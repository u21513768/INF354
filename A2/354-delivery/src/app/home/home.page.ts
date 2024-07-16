import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FoodItem } from '../shared/foodItem';
import { FoodData } from '../shared/foodData';
import { ImageService } from '../services/image.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  foodItems: FoodItem[] = FoodData;

  constructor(public navCtrl: NavController, private toastController: ToastController) { }

  getFoodImage(imageName: string) {
    return ImageService.getImage(imageName);
  }

  // Function to handle click event on food item
  async handleClick(foodItem: any) {
    // Retrieve existing array from localStorage
    const existingItemsString = localStorage.getItem('cart');
    let selectedFoodItems = [];

    // Parse existing array from JSON if it exists
    if (existingItemsString) {
      selectedFoodItems = JSON.parse(existingItemsString);
    }

    // Add the clicked food item to the array
    selectedFoodItems.push(foodItem);
   
    // Store the updated array back to localStorage
    localStorage.setItem('cart', JSON.stringify(selectedFoodItems));
    // alert('Item added to cart');
    const toast = await this.toastController.create({
      message: 'Item added to cart',
      duration: 1000, // Duration in milliseconds
      position: 'top', // Position of the toast message
      cssClass: 'custom-toast' // Custom CSS class for the toast component
    });
    toast.present();
  }

  resetStorage() {
    // Clear the localStorage
    localStorage.removeItem('cart');
  }


}
