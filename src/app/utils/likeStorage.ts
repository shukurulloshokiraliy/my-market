// utils/likeStorage.ts - LocalStorage helper functions

export const LIKED_PRODUCTS_KEY = 'uzum_liked_products';

export interface LikedProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

// Get all liked products from localStorage
export const getLikedProducts = (): LikedProduct[] => {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(LIKED_PRODUCTS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading liked products:', error);
    return [];
  }
};

// Check if product is liked
export const isProductLiked = (productId: number): boolean => {
  const likedProducts = getLikedProducts();
  return likedProducts.some(p => p.id === productId);
};

// Add product to liked list
export const addToLiked = (product: LikedProduct): void => {
  try {
    const likedProducts = getLikedProducts();
    
    // Check if already liked
    if (likedProducts.some(p => p.id === product.id)) {
      return;
    }
    
    // Add to list
    const updated = [...likedProducts, product];
    localStorage.setItem(LIKED_PRODUCTS_KEY, JSON.stringify(updated));
    
    // Dispatch custom event for other components to listen
    window.dispatchEvent(new CustomEvent('likedProductsChanged'));
  } catch (error) {
    console.error('Error adding to liked:', error);
  }
};

// Remove product from liked list
export const removeFromLiked = (productId: number): void => {
  try {
    const likedProducts = getLikedProducts();
    const updated = likedProducts.filter(p => p.id !== productId);
    localStorage.setItem(LIKED_PRODUCTS_KEY, JSON.stringify(updated));
    
    // Dispatch custom event
    window.dispatchEvent(new CustomEvent('likedProductsChanged'));
  } catch (error) {
    console.error('Error removing from liked:', error);
  }
};

// Toggle liked status
export const toggleLiked = (product: LikedProduct): boolean => {
  const isLiked = isProductLiked(product.id);
  
  if (isLiked) {
    removeFromLiked(product.id);
    return false;
  } else {
    addToLiked(product);
    return true;
  }
};

// Get liked products count
export const getLikedCount = (): number => {
  return getLikedProducts().length;
};

// Clear all liked products
export const clearAllLiked = (): void => {
  try {
    localStorage.removeItem(LIKED_PRODUCTS_KEY);
    window.dispatchEvent(new CustomEvent('likedProductsChanged'));
  } catch (error) {
    console.error('Error clearing liked:', error);
  }
};