import { create } from "zustand";
import { authClient } from "../lib/auth-client";

interface AuthState {
  user: { id: string; email: string; name?: string } | null;
  isLoading: boolean;
  error: string | null;

  fetchSession: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  error: null,

  fetchSession: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data: session, error } = await authClient.getSession();
      if (error) {
        set({ user: null, error: error.message });
      } else if (session?.user) {
        set({
          user: {
            id: session.user.id,
            email: session.user.email,
            name: session.user.name || undefined,
          },
          error: null,
        });
      } else {
        set({ user: null, error: null });
      }
    } catch (err: any) {
      console.error("Failed to fetch session:", err);
      set({
        user: null,
        error:
          err.message || "An unexpected error occurred during session fetch.",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      const { error } = await authClient.signOut();
      if (error) {
        set({ error: error.message });
      } else {
        set({ user: null, error: null });
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

useAuthStore.getState().fetchSession();
