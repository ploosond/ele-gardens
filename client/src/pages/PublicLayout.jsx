import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router";

const PublicLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default PublicLayout;
