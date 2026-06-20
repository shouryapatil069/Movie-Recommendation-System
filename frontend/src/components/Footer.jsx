import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t border-white/10 mt-20 pt-10 pb-6 bg-surface/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h2 className="text-xl font-bold text-primary mb-2">Cinematica</h2>
          <p className="text-sm text-textMuted max-w-xs">
            Your premium destination for the finest digital storytelling. Explore the world of cinema like never before.
          </p>
        </div>
        <div className="flex gap-8 text-sm">
          <div className="flex flex-col gap-2">
            <span className="font-semibold mb-1 text-white">Platform</span>
            <Link to="/" className="text-textMuted hover:text-white transition-colors">Home</Link>
            <Link to="/trending" className="text-textMuted hover:text-white transition-colors">Trending</Link>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-semibold mb-1 text-white">Legal</span>
            <a href="#" className="text-textMuted hover:text-white transition-colors">Terms of Use</a>
            <a href="#" className="text-textMuted hover:text-white transition-colors">Privacy</a>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 pt-6 border-t border-white/5 text-xs text-textMuted text-center md:text-left flex justify-between items-center">
        <span>© 2026 Cinematica. All rights reserved.</span>
        <span>Built for GitHub Portfolio</span>
      </div>
    </footer>
  );
};

export default Footer;
