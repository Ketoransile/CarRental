import { create } from "zustand";
import { authClient } from "../lib/auth-client"; // Import your authClient

// Define the shape of your authentication state
interface AuthState {
  user: { id: string; email: string; name?: string } | null;
  isLoading: boolean;
  error: string | null;
  // Actions
  fetchSession: () => Promise<void>;
  logout: () => Promise<void>;
  // You might add login/signup actions here if they directly update the store
}

export const useAuthStore = create<AuthState>((set) => ({
  // Corrected line here
  user: null,
  isLoading: true, // Start as true to indicate initial session check
  error: null,

  fetchSession: async () => {
    set({ isLoading: true, error: null }); // Set loading state
    try {
      const { data: session, error } = await authClient.getSession();
      if (error) {
        set({ user: null, error: error.message });
      } else if (session?.user) {
        set({
          user: {
            id: session.user.id,
            email: session.user.email,
            name: session.user.name || undefined, // Ensure 'name' is optional or exists
          },
          error: null,
        });
      } else {
        set({ user: null, error: null }); // No user logged in
      }
    } catch (err: any) {
      console.error("Failed to fetch session:", err);
      set({
        user: null,
        error:
          err.message || "An unexpected error occurred during session fetch.",
      });
    } finally {
      set({ isLoading: false }); // Always set loading to false when done
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      const { error } = await authClient.signOut();
      if (error) {
        set({ error: error.message });
      } else {
        set({ user: null, error: null }); // Clear user on successful logout
      }
    } catch (err: any) {
      console.error("Failed to log out:", err);
      set({
        error: err.message || "An unexpected error occurred during logout.",
      });
    } finally {
      set({ isLoading: false });
    }
  },
}));

// Optional: Initial fetch when the store is created
// This ensures that when your app loads, it immediately tries to get the session
useAuthStore.getState().fetchSession();
