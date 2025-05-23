import Link from "next/link";
import { FaTwitter, FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="relative border-t border-purple-500/10 py-8 sm:py-12 bg-gradient-to-b from-transparent to-purple-950/10">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      
      <div className="container grid grid-cols-2 gap-8 sm:grid-cols-2 md:grid-cols-4 px-4 sm:px-6 relative">
        {/* Brand section */}        <div className="space-y-3 sm:space-y-4">
          <h3 className="text-base sm:text-lg font-bold relative group">
            <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent group-hover:opacity-0 transition-opacity duration-300 absolute inset-0">ThinkFlowGPT</span>
            <span className="bg-gradient-to-r from-purple-300 via-purple-400 to-purple-500 bg-clip-text text-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">ThinkFlowGPT</span>
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground/90 hover:text-muted-foreground transition-colors">
            AI-powered SaaS for businesses and students, enhancing productivity
            through intelligent automation.
          </p>
        </div>

        {/* Product links */}
        <div className="space-y-3 sm:space-y-4">          <h3 className="text-sm sm:text-base font-bold text-white/90">Product</h3>
          <ul className="space-y-2 text-xs sm:text-sm">
            {['Features', 'Pricing', 'Roadmap'].map((item) => (
              <li key={item.toLowerCase()}>
                <Link
                  href={`/${item.toLowerCase()}`}
                  className="inline-block text-muted-foreground/80 hover:text-purple-400 transition-all duration-300 group py-0.5"
                >
                  <span className="relative inline-block">
                    {item}
                    <span className="absolute left-0 right-0 -bottom-px h-px bg-gradient-to-r from-purple-400/0 via-purple-400/70 to-purple-400/0 transition-transform duration-300 scale-x-0 group-hover:scale-x-100" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources links */}
        <div className="space-y-3 sm:space-y-4">          <h3 className="text-sm sm:text-base font-bold text-white/90">Resources</h3>
          <ul className="space-y-2 text-xs sm:text-sm">
            {['Documentation', 'Blog', 'Support'].map((item) => (
              <li key={item.toLowerCase()}>
                <Link
                  href={`/${item.toLowerCase()}`}
                  className="inline-block text-muted-foreground/80 hover:text-purple-400 transition-all duration-300 group py-0.5"
                >
                  <span className="relative inline-block">
                    {item}
                    <span className="absolute left-0 right-0 -bottom-px h-px bg-gradient-to-r from-purple-400/0 via-purple-400/70 to-purple-400/0 transition-transform duration-300 scale-x-0 group-hover:scale-x-100" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company links */}
        <div className="space-y-3 sm:space-y-4">          <h3 className="text-sm sm:text-base font-bold text-white/90">Company</h3>
          <ul className="space-y-2 text-xs sm:text-sm">
            {['About', 'Careers', 'Contact'].map((item) => (
              <li key={item.toLowerCase()}>
                <Link
                  href={`/${item.toLowerCase()}`}
                  className="inline-block text-muted-foreground/80 hover:text-purple-400 transition-all duration-300 group py-0.5"
                >
                  <span className="relative inline-block">
                    {item}
                    <span className="absolute left-0 right-0 -bottom-px h-px bg-gradient-to-r from-purple-400/0 via-purple-400/70 to-purple-400/0 transition-transform duration-300 scale-x-0 group-hover:scale-x-100" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>      {/* Social icons */}
      <div className="container mt-8 sm:mt-12 relative">
        <div className="absolute inset-x-0 h-px  bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
        <div className="flex justify-center space-x-6 sm:space-x-8 mt-8">
          {[
            { href: 'https://x.com/ThinkFlowGPT', Icon: FaTwitter, gradientFrom: 'from-blue-400', gradientTo: 'to-blue-600' },
            { href: 'https://github.com/ThinkFlowGPT', Icon: FaGithub, gradientFrom: 'from-gray-400', gradientTo: 'to-gray-600' },
            { href: 'https://www.linkedin.com/company/thinkflowgpt', Icon: FaLinkedin, gradientFrom: 'from-blue-500', gradientTo: 'to-blue-700' },
            { href: 'https://www.instagram.com/thinkflowgpt', Icon: FaInstagram, gradientFrom: 'from-pink-500', gradientTo: 'to-purple-600' }
          ].map(({ href, Icon, gradientFrom, gradientTo }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-500/0 to-purple-500/0 group-hover:from-purple-500/10 group-hover:to-purple-600/20 transition-all duration-300 scale-150 blur-xl" />              <div className="relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gray-950/50 backdrop-blur-sm border border-white/5 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-purple-500/20 group-hover:shadow-[0_0_15px_rgba(168,85,247,0.15)] overflow-hidden">
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r ${gradientFrom} ${gradientTo} transition-opacity duration-300`} />
                <Icon className={`w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 text-muted-foreground/70 group-hover:text-white group-hover:drop-shadow-[0_0_3px_rgba(255,255,255,0.3)] group-hover:scale-110 relative z-10`} />
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Copyright */}
      <div className="container mt-8 sm:mt-12 relative">
        <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
        <div className="pt-8 px-4 sm:px-6">
          <p className="text-center text-xs sm:text-sm text-muted-foreground/80 pb-2">
            © {new Date().getFullYear()} ThinkFlowGPT. All rights reserved.
          </p>
          <p className="text-center text-xs sm:text-sm text-muted-foreground/80">
            Developed with ❤️ by{" "}
            <a
              href="https://gauravupadhyay.vercel.app"
              className="relative inline-block group"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="relative text-purple-400/90 hover:text-purple-400 transition-colors">
                Gaurav Upadhyay
                <span className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-purple-400/0 via-purple-400/70 to-purple-400/0 transition-transform duration-300 scale-x-0 group-hover:scale-x-100" />
              </span>
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
