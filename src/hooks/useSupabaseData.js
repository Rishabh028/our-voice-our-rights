import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  hotelsService, 
  bookingsService, 
  wishlistService, 
  notificationsService,
  realtimeService 
} from '../utils/supabaseServices';

// Hook for hotels data
export const useHotels = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHotels = async () => {
    setLoading(true);
    setError(null);
    
    const { data, error: hotelsError } = await hotelsService?.getAll();
    
    if (hotelsError) {
      setError(hotelsError?.message || 'Failed to load hotels');
    } else {
      setHotels(data || []);
    }
    
    setLoading(false);
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  return { hotels, loading, error, refetch: fetchHotels };
};

// Hook for user bookings
export const useUserBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBookings = async () => {
    if (!user?.id) return;
    
    setLoading(true);
    setError(null);
    
    const { data, error: bookingsError } = await bookingsService?.getUserBookings(user?.id);
    
    if (bookingsError) {
      setError(bookingsError?.message || 'Failed to load bookings');
    } else {
      setBookings(data || []);
    }
    
    setLoading(false);
  };

  useEffect(() => {
    if (user?.id) {
      fetchBookings();
      
      // Subscribe to real-time updates
      const subscription = realtimeService?.subscribeToBookings(user?.id, (payload) => {
        fetchBookings(); // Refresh bookings on any change
      });

      return () => {
        realtimeService?.unsubscribe(subscription);
      };
    }
  }, [user?.id]);

  return { bookings, loading, error, refetch: fetchBookings };
};

// Hook for user wishlist
export const useUserWishlist = () => {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWishlist = async () => {
    if (!user?.id) return;
    
    setLoading(true);
    setError(null);
    
    const { data, error: wishlistError } = await wishlistService?.getUserWishlist(user?.id);
    
    if (wishlistError) {
      setError(wishlistError?.message || 'Failed to load wishlist');
    } else {
      setWishlist(data || []);
    }
    
    setLoading(false);
  };

  const addToWishlist = async (hotelId) => {
    if (!user?.id) return { error: { message: 'Please sign in to add to wishlist' } };
    
    const { data, error } = await wishlistService?.add(user?.id, hotelId);
    if (!error) {
      fetchWishlist(); // Refresh wishlist
    }
    return { data, error };
  };

  const removeFromWishlist = async (hotelId) => {
    if (!user?.id) return { error: { message: 'Please sign in' } };
    
    const { data, error } = await wishlistService?.remove(user?.id, hotelId);
    if (!error) {
      fetchWishlist(); // Refresh wishlist
    }
    return { data, error };
  };

  const isInWishlist = (hotelId) => {
    return wishlist?.some(item => item?.hotel_id === hotelId) || false;
  };

  useEffect(() => {
    if (user?.id) {
      fetchWishlist();
    } else {
      setWishlist([]);
    }
  }, [user?.id]);

  return { 
    wishlist, 
    loading, 
    error, 
    addToWishlist, 
    removeFromWishlist, 
    isInWishlist,
    refetch: fetchWishlist 
  };
};

// Hook for user notifications
export const useUserNotifications = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchNotifications = async () => {
    if (!user?.id) return;
    
    setLoading(true);
    setError(null);
    
    const { data, error: notificationsError } = await notificationsService?.getUserNotifications(user?.id);
    const { data: count } = await notificationsService?.getUnreadCount(user?.id);
    
    if (notificationsError) {
      setError(notificationsError?.message || 'Failed to load notifications');
    } else {
      setNotifications(data || []);
      setUnreadCount(count || 0);
    }
    
    setLoading(false);
  };

  const markAsRead = async (notificationId) => {
    if (!user?.id) return;
    
    const { error } = await notificationsService?.markAsRead(notificationId, user?.id);
    if (!error) {
      fetchNotifications(); // Refresh notifications
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchNotifications();
      
      // Subscribe to real-time updates
      const subscription = realtimeService?.subscribeToNotifications(user?.id, (payload) => {
        fetchNotifications(); // Refresh notifications on any change
      });

      return () => {
        realtimeService?.unsubscribe(subscription);
      };
    } else {
      setNotifications([]);
      setUnreadCount(0);
    }
  }, [user?.id]);

  return { 
    notifications, 
    unreadCount, 
    loading, 
    error, 
    markAsRead,
    refetch: fetchNotifications 
  };
};

// Hook for hotel search
export const useHotelSearch = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchHotels = async (location) => {
    if (!location?.trim()) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    setError(null);
    
    const { data, error: searchError } = await hotelsService?.searchByLocation(location);
    
    if (searchError) {
      setError(searchError?.message || 'Search failed');
      setSearchResults([]);
    } else {
      setSearchResults(data || []);
    }
    
    setLoading(false);
  };

  const clearSearch = () => {
    setSearchResults([]);
    setError(null);
  };

  return { 
    searchResults, 
    loading, 
    error, 
    searchHotels, 
    clearSearch 
  };
};