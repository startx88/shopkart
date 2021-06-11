import { Injectable } from '@angular/core';
import { NavMenu } from '../models/nav-menu.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  name: string = 'Swiggy';
  year: number = new Date().getFullYear();
  login: string = 'Login';
  loginText: string = "If you don't have an account, please click on";
  register: string = 'Register';
  registerText: string = 'If you have an account, please click on';
  rememberMe: string = 'remember me';
  forgotPassword: string = 'Forgot Password';
  welcomeTitle: string = 'Welcome to Swiggy';
  welcomeText: string =
    'At Swiggy, we build products & solutions that redefine the food ordering & delivery space in India, every single day. The best part? Every bit of your work at Swiggy will help us change the way India eats!';
  footerText: string = 'All rights reserved, powerd by ';
  poweredBy: string = 'startx.com';
  singin: string = 'Sign In';
  signup: string = 'Sign Up';
  socialText: string = 'Sign in with google and facebook';
  googleText: string = 'Google';
  fbText: string = 'Facebook';
  registerdRestaurant: string = 'Register restaurant';
  totalRecipes: string = 'Total recipes';
  satisfyUser: string = 'Satisfy user';
  adminMenu: NavMenu[] = [
    { id: '1001', name: 'Dashbaord', icon: 'th', url: '/dashboard' },
    {
      id: '1002',
      name: 'Store',
      icon: 'long-arrow-right',
      url: '/stores',
    },
    {
      id: '1003',
      name: 'Brands',
      icon: 'long-arrow-right',
      url: '/brands',
    },
    {
      id: '1004',
      name: 'Categories',
      icon: 'long-arrow-right',
      url: '/categories',
    },
    {
      id: '1005',
      name: 'Sub categories',
      icon: 'long-arrow-right',
      url: '/sub-categories',
    },
    {
      id: '1006',
      name: 'Colors',
      icon: 'long-arrow-right',
      url: '/colors',
    },
    {
      id: '1007',
      name: 'Sizes',
      icon: 'long-arrow-right',
      url: '/sizes',
    },
    {
      id: '1008',
      name: 'Pages',
      icon: 'long-arrow-right',
      url: '/pages',
    },
    {
      id: '1009',
      name: 'Roles',
      icon: 'long-arrow-right',
      url: '/roles',
    },
    { id: '10010', name: 'Users', icon: 'long-arrow-right', url: '/users' },
  ];
  partnerMenu: NavMenu[] = [
    { id: '001', name: 'Dashbaord', icon: 'th', url: '/dashboard' },
    { id: '002', name: 'Outlet', icon: 'building ', url: '/outlet' },
    { id: '004', name: 'Product', icon: 'coffee', url: '/products' },
    { id: '005', name: 'Orders', icon: 'long-arrow-right', url: '/orders' },
    { id: '006', name: 'Users', icon: 'users', url: '/users' },
  ];
  constructor() {}
}
