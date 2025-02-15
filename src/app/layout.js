import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata = {
  title: "Morphika",
  description: "AI-powered image generation for eCommerce",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-bgPrimary text-textPrimary">
        <Header />
        <main className="pt-24">{children}</main>
        <Footer />
      </body>
    </html>
  );
}