import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [userProfile, setUserProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [profileLoading, setProfileLoading] = useState(false)

  const signIn = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error signing in:', error.message);
      return { data: null, error };
    }
  };

  const signUp = async (email, password, metadata = {}) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata
        }
      });
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error signing up:', error.message);
      return { data: null, error };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      profileOperations.clear();
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  }

  // Isolated async operations - never called from auth callbacks
  const profileOperations = {
    async load(userId) {
      if (!userId) return
      setProfileLoading(true)
      try {
        const { data, error } = await supabase?.from('user_profiles')?.select('*')?.eq('id', userId)?.single()
        if (!error) setUserProfile(data)
      } catch (error) {
        console.error('Profile load error:', error)
      } finally {
        setProfileLoading(false)
      }
    },

    clear() {
      setUserProfile(null)
      setProfileLoading(false)
    }
  }

  // Auth state handlers - PROTECTED from async modification
  const authStateHandlers = {
    // This handler MUST remain synchronous - Supabase requirement
    onChange: (event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
      
      if (session?.user) {
        profileOperations?.load(session?.user?.id) // Fire-and-forget
      } else {
        profileOperations?.clear()
      }
    }
  }

  useEffect(() => {
    // Initial session check
    supabase?.auth?.getSession()?.then(({ data: { session } }) => {
      authStateHandlers?.onChange(null, session)
    })

    // CRITICAL: This must remain synchronous
    const { data: { subscription } } = supabase?.auth?.onAuthStateChange(
      authStateHandlers?.onChange
    )

    return () => subscription?.unsubscribe()
  }, [])

  const updateProfile = async (updates) => {
    if (!user) return { error: { message: 'No user logged in' } }
    
    try {
      const { data, error } = await supabase?.from('user_profiles')?.update(updates)?.eq('id', user?.id)?.select()?.single()
      if (!error) setUserProfile(data)
      return { data, error }
    } catch (error) {
      return { error: { message: 'Network error. Please try again.' } }
    }
  }

  return (
    <AuthContext.Provider value={{
      user,
      userProfile,
      loading,
      profileLoading,
      signIn,
      signUp,
      signOut,
      updateProfile,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
}
