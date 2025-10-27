import { supabase } from '../lib/supabase';

// User Profile Service
export const userProfileService = {
  async createProfile(userId, data) {
    try {
      const { error } = await supabase
        .from('user_profiles')
        .insert([{ id: userId, ...data }]);
      
      if (error) throw error;
      return { error: null };
    } catch (error) {
      return { error: { message: 'Error creating profile. Please try again.' } };
    }
  },

  async updateProfile(userId, data) {
    try {
      const { error } = await supabase
        .from('user_profiles')
        .update(data)
        .eq('id', userId);
      
      if (error) throw error;
      return { error: null };
    } catch (error) {
      return { error: { message: 'Error updating profile. Please try again.' } };
    }
  },

  async getProfile(userId) {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error: { message: 'Error fetching profile. Please try again.' } };
    }
  }
};

// Hotels Service
export const hotelsService = {
  // Get all available hotels
  async getAll() {
    try {
      const { data, error } = await supabase?.from('hotels')?.select('*')?.eq('is_available', true)?.order('name');
      
      if (error) {
        return { data: null, error };
      }
      return { data, error: null };
    } catch (error) {
      return { data: null, error: { message: 'Network error. Please try again.' } };
    }
  },

  // Get hotel by ID
  async getById(id) {
    try {
      const { data, error } = await supabase?.from('hotels')?.select('*')?.eq('id', id)?.single();
      
      return { data, error };
    } catch (error) {
      return { data: null, error: { message: 'Network error. Please try again.' } };
    }
  },

  // Search hotels by location
  async searchByLocation(location) {
    try {
      const { data, error } = await supabase?.from('hotels')?.select('*')?.ilike('location', `%${location}%`)?.eq('is_available', true)?.order('rating', { ascending: false });
      
      return { data, error };
    } catch (error) {
      return { data: null, error: { message: 'Network error. Please try again.' } };
    }
  }
};

// Bookings Service
export const bookingsService = {
  // Create new booking
  async create(bookingData) {
    try {
      const { data, error } = await supabase?.from('bookings')?.insert([{
          hotel_id: bookingData?.hotel_id,
          user_id: bookingData?.user_id,
          check_in_date: bookingData?.check_in_date,
          check_out_date: bookingData?.check_out_date,
          number_of_guests: bookingData?.number_of_guests,
          total_price: bookingData?.total_price,
          status: 'confirmed'
        }])?.select('*')?.single();
      
      return { data, error };
    } catch (error) {
      return { data: null, error: { message: 'Network error. Please try again.' } };
    }
  },

  // Get user bookings
  async getUserBookings(userId) {
    try {
      const { data, error } = await supabase?.from('bookings')?.select(`
          *,
          hotels (
            id,
            name,
            image_url,
            location,
            rating
          )
        `)?.eq('user_id', userId)?.order('created_at', { ascending: false });
      
      return { data, error };
    } catch (error) {
      return { data: null, error: { message: 'Network error. Please try again.' } };
    }
  },

  // Update booking status
  async updateStatus(bookingId, userId, status) {
    try {
      const { data, error } = await supabase?.from('bookings')?.update({ status })?.eq('id', bookingId)?.eq('user_id', userId)?.select('*')?.single();
      
      return { data, error };
    } catch (error) {
      return { data: null, error: { message: 'Network error. Please try again.' } };
    }
  }
};

// Wishlist Service
export const wishlistService = {
  // Add hotel to wishlist
  async add(userId, hotelId) {
    try {
      const { data, error } = await supabase?.from('wishlists')?.insert([{
          user_id: userId,
          hotel_id: hotelId
        }])?.select('*')?.single();
      
      return { data, error };
    } catch (error) {
      return { data: null, error: { message: 'Network error. Please try again.' } };
    }
  },

  // Remove hotel from wishlist
  async remove(userId, hotelId) {
    try {
      const { data, error } = await supabase?.from('wishlists')?.delete()?.eq('user_id', userId)?.eq('hotel_id', hotelId);
      
      return { data, error };
    } catch (error) {
      return { data: null, error: { message: 'Network error. Please try again.' } };
    }
  },

  // Get user wishlist
  async getUserWishlist(userId) {
    try {
      const { data, error } = await supabase?.from('wishlists')?.select(`
          *,
          hotels (
            id,
            name,
            image_url,
            location,
            rating,
            price_per_night
          )
        `)?.eq('user_id', userId)?.order('created_at', { ascending: false });
      
      return { data, error };
    } catch (error) {
      return { data: null, error: { message: 'Network error. Please try again.' } };
    }
  },

  // Check if hotel is in wishlist
  async isInWishlist(userId, hotelId) {
    try {
      const { data, error } = await supabase?.from('wishlists')?.select('id')?.eq('user_id', userId)?.eq('hotel_id', hotelId)?.single();
      
      return { data: !!data, error };
    } catch (error) {
      return { data: false, error: null };
    }
  }
};

// Notifications Service
export const notificationsService = {
  // Get user notifications
  async getUserNotifications(userId) {
    try {
      const { data, error } = await supabase?.from('notifications')?.select('*')?.eq('user_id', userId)?.order('created_at', { ascending: false });
      
      return { data, error };
    } catch (error) {
      return { data: null, error: { message: 'Network error. Please try again.' } };
    }
  },

  // Mark notification as read
  async markAsRead(notificationId, userId) {
    try {
      const { data, error } = await supabase?.from('notifications')?.update({ read: true })?.eq('id', notificationId)?.eq('user_id', userId)?.select('*')?.single();
      
      return { data, error };
    } catch (error) {
      return { data: null, error: { message: 'Network error. Please try again.' } };
    }
  },

  // Get unread count
  async getUnreadCount(userId) {
    try {
      const { data, error } = await supabase?.from('notifications')?.select('id', { count: 'exact' })?.eq('user_id', userId)?.eq('read', false);
      
      return { data: data?.length || 0, error };
    } catch (error) {
      return { data: 0, error: { message: 'Network error. Please try again.' } };
    }
  }
};


// Real-time subscriptions
export const realtimeService = {
  // Subscribe to booking updates
  subscribeToBookings(userId, callback) {
    return supabase?.channel('bookings')?.on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'bookings',
          filter: `user_id=eq.${userId}`
        },
        callback
      )?.subscribe();
  },

  // Subscribe to notifications
  subscribeToNotifications(userId, callback) {
    return supabase?.channel('notifications')?.on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${userId}`
        },
        callback
      )?.subscribe();
  },

  // Unsubscribe from channel
  unsubscribe(subscription) {
    return supabase?.removeChannel(subscription);
  }
};