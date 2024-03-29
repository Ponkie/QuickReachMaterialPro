import { Injectable } from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}
export interface Saperator {
  name: string;
  type?: string;
}
export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
}

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  saperator?: Saperator[];
  children?: ChildrenItems[];
}

const MENUITEMS = [
  // {
  //   state: 'starter',
  //   name: 'Starter Page',
  //   type: 'link',
  //   icon: 'content_copy'
  // },
  {
    state: 'dashboard',
    name: 'Dashboard',
    type: 'link',
    icon: 'dashboard'
  },
  {
    state: 'products',
    name: 'Products',
    type: 'link',
    icon: 'shopping_cart'
  },
  {
    state: 'categories',
    name: 'Categories',
    type: 'link',
    icon: 'folder'
  },
  {
    state: 'users',
    name: 'User Management',
    type: 'sub',
    icon: 'people',
    children: [
      { state: 'administrators', name: 'Administrators' },
      { state: 'vendors', name: 'Vendors' }
    ]
  },
  // {
  //   state: 'material',
  //   name: 'Material Ui',
  //   type: 'sub',
  //   icon: 'bubble_chart',
  //   badge: [{ type: 'red', value: '17' }],
  //   children: [
  //     { state: 'button', name: 'Buttons' },
  //     { state: 'cards', name: 'Cards' },
  //     { state: 'grid', name: 'Grid List' },
  //     { state: 'lists', name: 'Lists' },
  //     { state: 'menu', name: 'Menu' },
  //     { state: 'tabs', name: 'Tabs' },
  //     { state: 'stepper', name: 'Stepper' },
  //     { state: 'expansion', name: 'Expansion Panel' },
  //     { state: 'chips', name: 'Chips' },
  //     { state: 'toolbar', name: 'Toolbar' },
  //     { state: 'progress-snipper', name: 'Progress snipper' },
  //     { state: 'progress', name: 'Progress Bar' },
  //     { state: 'dialog', name: 'Dialog' },
  //     { state: 'tooltip', name: 'Tooltip' },
  //     { state: 'snackbar', name: 'Snackbar' },
  //     { state: 'slider', name: 'Slider' },
  //     { state: 'slide-toggle', name: 'Slide Toggle' }
  //   ]
  // }
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
