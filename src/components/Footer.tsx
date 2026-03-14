import { useState } from "react";
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

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-10 px-6">
      <div className="max-w-6xl mx-auto">
        <FooterAccordion title="About">
          <span className="font-body text-sm text-primary-foreground/80">Our Story</span>
          <span className="font-body text-sm text-primary-foreground/80">Careers</span>
          <span className="font-body text-sm text-primary-foreground/80">Press</span>
        </FooterAccordion>

        <FooterAccordion title="Help">
          <span className="font-body text-sm text-primary-foreground/80">FAQ</span>
          <span className="font-body text-sm text-primary-foreground/80">Shipping & Returns</span>
          <span className="font-body text-sm text-primary-foreground/80">Contact Us</span>
        </FooterAccordion>

        <FooterAccordion title="More">
          <span className="font-body text-sm text-primary-foreground/80">Size Guide</span>
          <span className="font-body text-sm text-primary-foreground/80">Gift Cards</span>
          <span className="font-body text-sm text-primary-foreground/80">Affiliates</span>
        </FooterAccordion>

        <div className="pt-6">
          <h4 className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-primary-foreground mb-4">
            Newsletter
          </h4>
          <div className="flex gap-3 mb-6">
            <a href="#" className="text-primary-foreground hover:text-primary-foreground/70 transition-colors">
              <Instagram className="w-6 h-6" />
            </a>
            <a href="#" className="text-primary-foreground hover:text-primary-foreground/70 transition-colors">
              <Facebook className="w-6 h-6" />
            </a>
            <a href="#" className="text-primary-foreground hover:text-primary-foreground/70 transition-colors">
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
          <img src={footerLogo} alt="Farbeyond logo" className="h-16 object-contain" />
          <p className="font-body text-xs text-primary-foreground/70">
            © 2026 FARBEYOND. All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
