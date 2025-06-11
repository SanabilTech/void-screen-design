import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Session, User } from "@supabase/supabase-js";
import { toast } from "@/hooks/use-toast";

type AdminAuthContextType = {
  isLoading: boolean;
  session: Session | null;
  user: User | null;
  isAdmin: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state changed:", event, session?.user?.email);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          setTimeout(() => {
            checkAdminStatus(session.user.id, session.user.email);
          }, 0);
        } else {
          setIsAdmin(false);
          setIsLoading(false);
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Initial session check:", session?.user?.email);
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        checkAdminStatus(session.user.id, session.user.email);
      } else {
        setIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAdminStatus = async (userId: string, email: string | undefined) => {
    if (!email) {
      setIsAdmin(false);
      setIsLoading(false);
      return;
    }

    try {
      console.log("Checking admin status for:", email);
      
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .or(`email.eq.${email},user_id.eq.${userId}`)
        .maybeSingle();

      console.log("Admin check result:", { data, error });
      
      if (error && error.code !== 'PGRST116') {
        console.error('Error checking admin status:', error);
        toast({
          title: "Error",
          description: `Failed to verify admin status: ${error.message}`,
          variant: "destructive",
        });
      }
      
      const adminStatus = !!data;
      console.log("Setting admin status to:", adminStatus);
      setIsAdmin(adminStatus);
    } catch (error: any) {
      console.error('Error checking admin status:', error);
      toast({
        title: "Error",
        description: `Failed to verify admin status: ${error.message}`,
        variant: "destructive",
      });
      setIsAdmin(false);
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      console.log("Signing in with:", email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      console.log("Sign in successful for:", email);
      
      toast({
        title: "Success",
        description: "Signed in successfully",
      });
      
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      
    } catch (error: any) {
      console.error("Sign in error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to sign in",
        variant: "destructive",
      });
      setIsLoading(false);
      throw error;
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      const { count, error: countError } = await supabase
        .from('admin_users')
        .select('*', { count: 'exact', head: true });

      if (countError) {
        throw countError;
      }

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { 
            full_name: fullName,
          },
        },
      });

      if (error) {
        throw error;
      }

      if (count === 0 && data.user) {
        const { error: insertError } = await supabase
          .from('admin_users')
          .insert({ 
            email,
            user_id: data.user.id 
          });

        if (insertError) {
          await supabase.auth.signOut();
          throw new Error(`You were signed up, but couldn't be made an admin: ${insertError.message}`);
        }
        
        setIsAdmin(true);
        toast({
          title: "Success",
          description: "You've been registered as the first admin!",
        });
      } else {
        await supabase.auth.signOut();
        throw new Error("Admin account created. Please ask an existing admin to grant you admin privileges.");
      }

    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to sign up",
        variant: "destructive",
      });
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setIsAdmin(false);
      toast({
        title: "Success",
        description: "Signed out successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to sign out",
        variant: "destructive",
      });
    }
  };

  return (
    <AdminAuthContext.Provider
      value={{
        isLoading,
        session,
        user,
        isAdmin,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
};
