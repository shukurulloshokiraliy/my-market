// utils/cartStorage.ts - Cart management with localStorage

export const CART_KEY = 'uzum_cart_items';

export interface CartItem {
  id: number;
  title: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  quantity: number;
}

// Get all cart items
export const getCartItems = (): CartItem[] => {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(CART_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading cart:', error);
    return [];
  }
};

// Get cart item count
export const getCartCount = (): number => {
  const items = getCartItems();
  return items.reduce((total, item) => total + item.quantity, 0);
};

// Check if product is in cart
export const isInCart = (productId: number): boolean => {
  const items = getCartItems();
  return items.some(item => item.id === productId);
};

// Get product quantity in cart
export const getProductQuantity = (productId: number): number => {
  const items = getCartItems();
  const item = items.find(item => item.id === productId);
  return item ? item.quantity : 0;
};

// Add item to cart
export const addToCart = (product: Omit<CartItem, 'quantity'>, quantity: number = 1): void => {
  try {
    const items = getCartItems();
    const existingIndex = items.findIndex(item => item.id === product.id);
    
    if (existingIndex >= 0) {
      // Update quantity
      items[existingIndex].quantity += quantity;
    } else {
      // Add new item
      items.push({ ...product, quantity });
    }
    
    localStorage.setItem(CART_KEY, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent('cartChanged'));
  } catch (error) {
    console.error('Error adding to cart:', error);
  }
};

// Update item quantity
export const updateQuantity = (productId: number, quantity: number): void => {
  try {
    const items = getCartItems();
    const index = items.findIndex(item => item.id === productId);
    
    if (index >= 0) {
      if (quantity <= 0) {
        items.splice(index, 1);
      } else {
        items[index].quantity = quantity;
      }
      
      localStorage.setItem(CART_KEY, JSON.stringify(items));
      window.dispatchEvent(new CustomEvent('cartChanged'));
    }
  } catch (error) {
    console.error('Error updating quantity:', error);
  }
};

// Remove item from cart
export const removeFromCart = (productId: number): void => {
  try {
    const items = getCartItems();
    const filtered = items.filter(item => item.id !== productId);
    
    localStorage.setItem(CART_KEY, JSON.stringify(filtered));
    window.dispatchEvent(new CustomEvent('cartChanged'));
  } catch (error) {
    console.error('Error removing from cart:', error);
  }
};

// Clear all cart items
export const clearCart = (): void => {
  try {
    localStorage.removeItem(CART_KEY);
    window.dispatchEvent(new CustomEvent('cartChanged'));
  } catch (error) {
    console.error('Error clearing cart:', error);
  }
};

// Get cart total
export const getCartTotal = (): number => {
  const items = getCartItems();
  return items.reduce((total, item) => total + (item.price * item.quantity), 0);
};

// Get cart original total (before discount)
export const getCartOriginalTotal = (): number => {
  const items = getCartItems();
  return items.reduce((total, item) => {
    const originalPrice = item.price / (1 - item.discountPercentage / 100);
    return total + (originalPrice * item.quantity);
  }, 0);
};

// Get total savings
export const getCartSavings = (): number => {
  return getCartOriginalTotal() - getCartTotal();
};