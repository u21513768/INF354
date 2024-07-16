export class ImageService {
    static getImage(dishName: string): string {
      if (this.imageExists(`assets/img/${dishName}.jpg`)) {
        return `assets/img/${dishName}.png`;
      } else if (this.imageExists(`assets/img/${dishName}.png`)) {
        return `assets/img/${dishName}.jpg`;
      } else {
        return 'assets/img/placeholder.png';
      }
    }
  
    static imageExists(url: string): boolean {
      const http = new XMLHttpRequest();
      http.open('HEAD', url, false);
      http.send();
      return http.status !== 404;
    }
  }
  