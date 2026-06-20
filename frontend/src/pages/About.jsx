import { motion } from 'framer-motion';
import { Code2, Code, Database, Layout } from 'lucide-react';

const About = () => {
  return (
    <div className="pt-24 min-h-screen pb-20 max-w-4xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold mb-4">About the Project</h1>
        <p className="text-xl text-textMuted max-w-2xl mx-auto">
          A machine learning-based personalized movie suggestion platform built for movie enthusiasts.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-effect p-8 rounded-2xl border border-white/5"
        >
          <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-6">
            <Layout className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-xl font-bold mb-3">Frontend Architecture</h3>
          <ul className="space-y-2 text-textMuted">
            <li className="flex items-center gap-2"><span>•</span> React + Vite</li>
            <li className="flex items-center gap-2"><span>•</span> Tailwind CSS</li>
            <li className="flex items-center gap-2"><span>•</span> Framer Motion</li>
            <li className="flex items-center gap-2"><span>•</span> Responsive Design</li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-effect p-8 rounded-2xl border border-white/5"
        >
          <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-6">
            <Database className="w-6 h-6 text-blue-400" />
          </div>
          <h3 className="text-xl font-bold mb-3">Backend & ML</h3>
          <ul className="space-y-2 text-textMuted">
            <li className="flex items-center gap-2"><span>•</span> Python Flask API</li>
            <li className="flex items-center gap-2"><span>•</span> Scikit-learn (Content-based filtering)</li>
            <li className="flex items-center gap-2"><span>•</span> Cosine Similarity</li>
            <li className="flex items-center gap-2"><span>•</span> Pandas Data Processing</li>
          </ul>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-surface/50 border border-white/10 rounded-2xl p-8 text-center"
      >
        <h3 className="text-2xl font-bold mb-4">Resume Ready</h3>
        <p className="text-textMuted mb-6 max-w-xl mx-auto">
          This project demonstrates the practical use of recommendation algorithms and modern full-stack web development principles.
        </p>
        <a 
          href="https://github.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
        >
          <Code2 className="w-5 h-5" /> View on GitHub
        </a>
      </motion.div>
    </div>
  );
};

export default About;
