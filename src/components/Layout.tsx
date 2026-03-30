import Header from "./Header";
import Footer from "./Footer";
import AdPlacement from "./AdPlacement";

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="flex min-h-screen flex-col">
    <Header />
    <AdPlacement position="banner" />
    <main className="flex-1">{children}</main>
    <Footer />
    <div className="sticky bottom-0 z-40">
      <AdPlacement position="footer" />
    </div>
  </div>
);

export default Layout;
