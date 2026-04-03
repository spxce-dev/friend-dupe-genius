import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Instagram, Facebook, Twitter } from "lucide-react";
import footerLogo from "@/assets/footer-logo.png";

const FooterAccordion = ({ title, children }: { title: string; children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-primary-foreground/30">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 font-body text-sm font-semibold uppercase tracking-[0.2em] text-primary-foreground"
      >
        {title}
        <ChevronDown className={`w-5 h-5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="pb-4 flex flex-col gap-2">{children}</div>}
    </div>
  );
};

const FooterLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link to={to} className="font-body text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
    {children}
  </Link>
);

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-10 px-6">
      <div className="max-w-6xl mx-auto">
        <FooterAccordion title="About">
          <p className="font-body text-sm text-primary-foreground/80 leading-relaxed mb-2">
            Frienemies is a South African streetwear brand born from the tension between love and rivalry. 
            We craft premium urban fashion that speaks to individuality, confidence, and bold self-expression.
          </p>
          <FooterLink to="/">Our Story</FooterLink>
          <FooterLink to="/products">Shop Collection</FooterLink>
        </FooterAccordion>

        <FooterAccordion title="Help">
          <p className="font-body text-sm text-primary-foreground/80 leading-relaxed mb-1">
            Need help? We're here for you.
          </p>
          <span className="font-body text-sm text-primary-foreground/80">📧 support@frienemies.co.za</span>
          <span className="font-body text-sm text-primary-foreground/80">📞 +27 (0) 11 000 0000</span>
          <span className="font-body text-sm text-primary-foreground/80 mt-1 font-semibold">Shipping & Returns</span>
          <span className="font-body text-xs text-primary-foreground/70">Free shipping on orders over R1,000. Returns accepted within 14 days of delivery in original condition.</span>
          <span className="font-body text-sm text-primary-foreground/80 mt-1 font-semibold">Processing Time</span>
          <span className="font-body text-xs text-primary-foreground/70">Orders are processed within 2–4 business days. Delivery takes 3–7 working days nationwide.</span>
        </FooterAccordion>

        <FooterAccordion title="More">
          <span className="font-body text-sm text-primary-foreground/80 font-semibold">Size Guide</span>
          <span className="font-body text-xs text-primary-foreground/70">S (chest 96cm) · M (101cm) · L (106cm) · XL (112cm). When in doubt, size up for a relaxed fit.</span>
          <span className="font-body text-sm text-primary-foreground/80 mt-1 font-semibold">Care Instructions</span>
          <span className="font-body text-xs text-primary-foreground/70">Machine wash cold, inside out. Do not bleach or tumble dry. Hang dry to preserve prints and fabric quality.</span>
          <FooterLink to="/products?category=Accessories">Gift Ideas</FooterLink>
        </FooterAccordion>

        <div className="pt-6">
          <h4 className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-primary-foreground mb-4">
            Stay Connected
          </h4>
          <div className="flex gap-3 mb-6">
            <a href="https://instagram.com/frienemies" target="_blank" rel="noopener noreferrer" className="text-primary-foreground hover:text-primary-foreground/70 transition-colors">
              <Instagram className="w-6 h-6" />
            </a>
            <a href="https://facebook.com/frienemies" target="_blank" rel="noopener noreferrer" className="text-primary-foreground hover:text-primary-foreground/70 transition-colors">
              <Facebook className="w-6 h-6" />
            </a>
            <a href="https://twitter.com/frienemies" target="_blank" rel="noopener noreferrer" className="text-primary-foreground hover:text-primary-foreground/70 transition-colors">
              <Twitter className="w-6 h-6" />
            </a>
          </div>
          <div className="flex items-center border-b border-primary-foreground/50">
            <input
              type="email"
              placeholder="Enter Your E-mail"
              className="flex-1 bg-transparent font-body text-sm text-primary-foreground placeholder:text-primary-foreground/50 py-2 outline-none"
            />
            <button className="font-body text-sm font-semibold uppercase tracking-wider text-primary-foreground hover:text-primary-foreground/70 transition-colors py-2">
              Subscribe
            </button>
          </div>
        </div>

        <div className="pt-8 flex flex-col items-center gap-4">
          <img src={footerLogo} alt="Frienemies logo" className="h-16 object-contain" />
          <p className="font-body text-xs text-primary-foreground/70">
            © 2026 Frienemies. All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
