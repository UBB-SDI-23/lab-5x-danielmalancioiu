const USER_KEY = 'auth-user';
export class StorageService {
    static USER_KEY = 'auth-user';
  
    static clean() {
      window.sessionStorage.clear();
      console.log(sessionStorage.getItem(StorageService.USER_KEY));
    }
  
    static saveUser(user:any) {
      window.sessionStorage.removeItem(StorageService.USER_KEY);
      window.sessionStorage.setItem(
        StorageService.USER_KEY,
        JSON.stringify(user)
      );
    }

    static updateUserField(rowsPerPage: string, value: any) {
      const userString = window.sessionStorage.getItem(StorageService.USER_KEY);
      if (!userString) {
        return;
      }
    
      const user = JSON.parse(userString);
      const updatedUser = {
        ...user,
        [rowsPerPage]: value
      };
    
      window.sessionStorage.setItem(
        StorageService.USER_KEY,
        JSON.stringify(updatedUser)
      );
    }
    
  
    static getUser() {
      const user = window.sessionStorage.getItem(StorageService.USER_KEY);
      return user ? JSON.parse(user) : {};
    }
  
    static getToken() {
      const user = window.sessionStorage.getItem(StorageService.USER_KEY);
      return user ? JSON.parse(user).jwtToken : {};
    }

    static getRowsPerPage() {
      const user = window.sessionStorage.getItem(StorageService.USER_KEY);
      return user ? JSON.parse(user).rowsPerPage : {};
    }
  
    static isLoggedIn() {
      return !!window.sessionStorage.getItem(StorageService.USER_KEY);
    }
  }
  