import { useEffect, useState } from 'react';

export interface ChefDish {
  id: number;
  chefId: string;
  chefName: string;
  name: string;
  price: string;
  ingredients: string;
  image: string;
  isVeg?: boolean;
  cuisine?: string;
}

const STORAGE_KEY = 'homfud_chef_dishes';
const EVENT = 'homfud_dishes_updated';

const read = (): ChefDish[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ChefDish[]) : [];
  } catch {
    return [];
  }
};

const write = (dishes: ChefDish[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dishes));
  window.dispatchEvent(new CustomEvent(EVENT));
};

export const addDish = (dish: ChefDish) => {
  write([...read(), dish]);
};

export const removeDish = (id: number) => {
  write(read().filter((d) => d.id !== id));
};

export const useDishes = () => {
  const [dishes, setDishes] = useState<ChefDish[]>(read);

  useEffect(() => {
    const refresh = () => setDishes(read());
    window.addEventListener(EVENT, refresh);
    window.addEventListener('storage', refresh);
    return () => {
      window.removeEventListener(EVENT, refresh);
      window.removeEventListener('storage', refresh);
    };
  }, []);

  return dishes;
};
