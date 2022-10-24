// GOAL : IS TO SHOW HOW TYPICAL INJECTOR WORKS IN ANGULAR

// Here we are mocking UserService as it is fetching the user details from backend.
export class UserService {
  getUserDetails() {
    return { id: 1, name: 'Hemanth' };
  }
}

// Here we have just mocked a Angular Component. As we know Components do not create dependencies (implies class invokations) instead it's done by the Angular DI Mechanism. A typical class asks for the dependency and we are doing the same.
export class AppComponent {
  constructor(public userService: UserService) {}
}

// Here we are mocking the Injector. Usually Injector will be invoked by the Angular framework and whenever we have services and include them in root module (NgModule) or used providedIn: 'root' in services, All these will be passed as paramter to the Injector class invokation.
// Now Injector will initiate all the invokations of the providers/services and store them in an Map Object.
// Whenever component asks for a dependency, Injector will check whether that provider is available as key in the map object. If available it will return that service to the componenet constructor function. If not available it will throw error stating that "No Provider Found".

class Injector {
  private container = new Map();
  constructor(public providers: any[] = []) {
    providers.forEach((service) => {
      this.container.set(service, eval(`new ${service}()`));
    });
  }

  get(service) {
    const serviceInstance = this.container.get(service);
    console.log(serviceInstance);
    if (!serviceInstance) {
      throw Error('No provider found !');
    }
    return serviceInstance;
  }
}

const injector = new Injector(['UserService']);
const component = new AppComponent(injector.get('UserService')); // Here Angular is passing the UserService instance to the AppComponent constructor function by getting from the injector.
const userDetails = component.userService.getUserDetails();
console.log(userDetails);
