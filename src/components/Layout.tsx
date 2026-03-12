import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FloatingWhatsApp from "./FloatingWhatsApp";
import TopBanner from "./TopBanner";

const Layout = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen gradient-bg flex flex-col">
    <TopBanner />
    <Navbar />
    <main className="flex-1">{children}</main>
    <Footer />
    <FloatingWhatsApp />
  </div>
);

export default Layout;
