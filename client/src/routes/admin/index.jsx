import { redirect, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/")({
  // Redirect to products by default when visiting /admin/
  beforeLoad: ({ context, location }) => {
    const { auth } = context;
    
    // If auth is still loading (checking localStorage), don't redirect yet
    if (auth.loading) return;

    // If user is not logged in → redirect to login with ?redirect
    if (!auth.userData) {
      throw redirect({
        to: "/login",
        search: { redirect: location.href },
      });
    }
    
    // If user is logged in but not admin → redirect to home
    if (auth.userData.user.role !== "admin") {
      throw redirect({ to: "/", replace: true });
    }
    
    // If authenticated admin, redirect to products page
    throw redirect({ to: "/admin/products", replace: true });
  },
});
