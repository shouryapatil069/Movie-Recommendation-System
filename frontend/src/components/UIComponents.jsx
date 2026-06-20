import { motion } from 'framer-motion';

export const Loader = () => {
  return (
    <div className="flex justify-center items-center py-20">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-12 h-12 border-4 border-surface border-t-primary rounded-full"
      />
    </div>
  );
};

export const ErrorMessage = ({ message }) => {
  return (
    <div className="flex justify-center items-center py-20">
      <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-6 py-4 rounded-lg flex items-center gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="font-medium">{message}</span>
      </div>
    </div>
  );
};
