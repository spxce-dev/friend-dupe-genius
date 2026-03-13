import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-display text-xl mb-4">
              <span className="text-primary">F</span>rienemies
            </h3>
            <p className="font-body text-sm text-background/70">
              Where love, tension, and style collide.
            </p>
          </div>

          <div>
            <h4 className="font-body text-sm font-semibold uppercase tracking-wider text-primary mb-4">
              Shop
            </h4>
            <div className="flex flex-col gap-2">
              {["Jackets", "Hoodies", "Bags", "T-Shirts", "Watches"].map((cat) => (
                <Link
                  key={cat}
                  to={`/products?category=${cat}`}
                  className="font-body text-sm text-background/70 hover:text-primary transition-colors"
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-body text-sm font-semibold uppercase tracking-wider text-primary mb-4">
              Follow Us
            </h4>
            <div className="flex flex-col gap-2">
              {["Instagram", "Twitter", "TikTok"].map((social) => (
                <span
                  key={social}
                  className="font-body text-sm text-background/70 hover:text-primary transition-colors cursor-pointer"
                >
                  {social}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 pt-6 text-center">
          <p className="font-body text-xs text-background/50">
            © 2025 Frienemies. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
