import { Component } from '@angular/core';
import { FoodItem } from '../shared/foodItem';
import { ImageService } from '../services/image.service';
import { Router } from '@angular/router';

interface ProfileDetails {
  name: string;
  surname?: string;
  email: string;
  phone: string;
  addresses: string[];
  activeIndex?: number;
}

interface FoodOrder {
  foodItems: FoodItem[];
  date: string;
  totalPrice: number;
  location: string;
}

@Component({
  selector: 'app-account',
  templateUrl: 'account.page.html',
  styleUrls: ['account.page.scss']
})
export class AccountPage {
  orderItems: any[] = [];
  isModalOpen = false;
  editProfile = false;
  profile: ProfileDetails = { name: '', email: '', phone: '', addresses: [] };
  name: string = '';
  surname: string = '';
  email: string = '';
  phone: string = '';
  newAddress: string = '';
  addresses: string[] = []; // Array to store addresses
  activeIndex: number = -1;
  isManageAddressesOpen = false;

  constructor(private router: Router) { }

  getFoodImage(imageName: string) {
    return ImageService.getImage(imageName);
  }

  ionViewWillEnter() {
    // Retrieve items from localStorage
    const cartItemsString = localStorage.getItem('order');
    const profileDetails = localStorage.getItem('profile');
    if (cartItemsString) {
      // Parse the JSON and assign it to cartItems
      this.orderItems = JSON.parse(cartItemsString);
    }
    else {
      // If no items are found, initialize the cartItems as an empty object of type FoodOrder
      this.orderItems = [];
    }

    if (profileDetails) {
      this.profile = JSON.parse(profileDetails);
      this.name = this.profile.name;
      this.surname = this.profile.surname ?? '';
      this.email = this.profile.email;
      this.phone = this.profile.phone;
      this.addresses = this.profile.addresses ?? [];
      this.activeIndex = this.profile.activeIndex ?? -1;
    }
  }

  buyItems(foodItem: FoodOrder) {
    // Retrieve existing array from localStorage
    const existingItemsString = localStorage.getItem('cart');
    let selectedFoodItems: FoodItem[] = [];

    // Parse existing array from JSON if it exists
    // if (existingItemsString) {
    //   selectedFoodItems = JSON.parse(existingItemsString);
    // }

    // Add the clicked food item to the array
    foodItem?.foodItems.forEach(element => { selectedFoodItems.push(element); });
    // Store the updated array back to localStorage
    localStorage.setItem('cart', JSON.stringify(selectedFoodItems));
    // window.location.href = '/cart';
    this.router.navigateByUrl('/cart');
  }

  resetStorage() {
    // Clear the localStorage
    localStorage.removeItem('order');
    this.orderItems = [];
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  openProfile() {
    this.editProfile = true;
    this.name = this.profile.name;
    this.surname = this.profile?.surname ?? '';
    this.email = this.profile.email;
    this.phone = this.profile.phone;
  }

  cancelEdit() {
    this.editProfile = false;
  }

  editProfileDetails() {
    this.profile = {
      name: this.name,
      surname: this.surname,
      email: this.email,
      phone: this.phone,
      addresses: this.addresses,
      activeIndex: this.activeIndex === -1 ? 0 : this.activeIndex
    }
    localStorage.setItem('profile', JSON.stringify(this.profile));
    this.editProfile = false;
  }

  addAddress() {
    if (this.newAddress.trim() !== '') {
      this.addresses.push(this.newAddress.trim());
      this.newAddress = ''; // Clear the input field after adding
    }
  }

  // Function to delete an address
  deleteAddress(index: number) {
    this.addresses.splice(index, 1);
  }

  // Function to set an address as active
  setActiveAddress(index: number) {
    // Implement logic to set the selected address as active
    this.activeIndex = index;
  }

  toggleManageAddresses() {
    this.isManageAddressesOpen = !this.isManageAddressesOpen;
  }

  groupFoodItems(item: any): any[] {
    const groupedItems: { [key: string]: any } = {}; // Add type annotation for groupedItems
    item.foodItems.forEach((subItem: { dishName: any; }) => {
      const key = subItem.dishName;
      if (groupedItems[key]) {
        groupedItems[key].count++;
      } else {
        groupedItems[key] = { ...subItem, count: 1 };
      }
    });
    return Object.values(groupedItems);
  }

}
