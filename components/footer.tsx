import Link from "next/link";
import { FaTwitter, FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="border-t py-12">
      <div className="container grid grid-cols-1 gap-8 md:grid-cols-4">
        <div className="space-y-4">
          <h3 className="text-lg font-bold">ThinkFlowGPT</h3>
          <p className="text-sm text-muted-foreground">
            AI-powered SaaS for businesses and students, enhancing productivity
            through intelligent automation.
          </p>
        </div>
        <div className="space-y-4">
          <h3 className="text-sm font-bold">Product</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                href="/features"
                className="text-muted-foreground hover:text-foreground"
              >
                Features
              </Link>
            </li>
            <li>
              <Link
                href="/pricing"
                className="text-muted-foreground hover:text-foreground"
              >
                Pricing
              </Link>
            </li>
            <li>
              <Link
                href="/roadmap"
                className="text-muted-foreground hover:text-foreground"
              >
                Roadmap
              </Link>
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <h3 className="text-sm font-bold">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                href="/docs"
                className="text-muted-foreground hover:text-foreground"
              >
                Documentation
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className="text-muted-foreground hover:text-foreground"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="/support"
                className="text-muted-foreground hover:text-foreground"
              >
                Support
              </Link>
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <h3 className="text-sm font-bold">Company</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                href="/about"
                className="text-muted-foreground hover:text-foreground"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/careers"
                className="text-muted-foreground hover:text-foreground"
              >
                Careers
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-muted-foreground hover:text-foreground"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
        
      </div>

      {/* Social icons */}
      <div className="container mt-8 flex justify-center space-x-6">
        <a
          href="https://x.com/ThinkFlowGPT"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground transform transition-transform duration-300 hover:-translate-y-1"
        >
          <FaTwitter size={20} />
        </a>
        <a
          href="https://github.com/ThinkFlowGPT"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground transform transition-transform duration-300 hover:-translate-y-1"
        >
          <FaGithub size={20} />
        </a>
        <a
          href="https://www.linkedin.com/company/thinkflowgpt"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground transform transition-transform duration-300 hover:-translate-y-1"
        >
          <FaLinkedin size={20} />
        </a>
        <a
          href="https://www.instagram.com/thinkflowgpt"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground transform transition-transform duration-300 hover:-translate-y-1"
        >
          <FaInstagram size={20} />
        </a>
      </div>

      {/* Copyright */}
      <div className="container mt-8 border-t pt-8">
        <p className="text-center text-sm text-muted-foreground py-2">
          © {new Date().getFullYear()} ThinkFlowGPT. All rights reserved.
        </p>
        <p className="text-center text-sm text-muted-foreground">
          Developed by{" "}
          <a
            href="https://gauravupadhyay.vercel.app"
            className="underline hover:text-foreground"
            target="_blank"
          >
            Gaurav Upadhyay
          </a>
        </p>
      </div>
    </footer>
  );
}
