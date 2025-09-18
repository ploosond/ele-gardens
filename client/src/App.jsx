import { RouterProvider, createRouter } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/auth/AuthProvider";

import { routeTree } from "./routeTree.gen";
import { useContext } from "react";
import { AuthContext } from "./context/auth/AuthContext";
import "./i18next";
const router = createRouter({
  routeTree,
  context: { auth: undefined },
  scrollRestoration: true,
});

function InnerApp() {
  const auth = useContext(AuthContext);

  return <RouterProvider router={router} context={{ auth }} />;
}

const queryClient = new QueryClient();

const App = () => {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <InnerApp />
      </QueryClientProvider>
    </AuthProvider>
  );
};

export default App;
