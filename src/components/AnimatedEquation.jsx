import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AnimatedEquation = ({ 
  steps = [],
  currentStep = 0,
  onStepComplete = () => {},
  speed = 0.8,
}) => {
  const currentStepData = steps[currentStep];

  if (!currentStepData) return null;

  const renderEquationWithHighlight = (equation, highlight) => {
    if (!highlight || !equation) {
      return <span className="ae-equation-text">{equation}</span>;
    }

    try {
      const escapedHighlight = highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const parts = equation.split(new RegExp(`(${escapedHighlight})`, 'gi'));
      
      return parts.map((part, i) => {
        const isHighlighted = part.toLowerCase() === highlight.toLowerCase();
        return isHighlighted ? (
          <motion.span
            key={i}
            className="ae-highlighted"
            initial={{ backgroundColor: 'rgba(126, 87, 194, 0)' }}
            animate={{ 
              backgroundColor: ['rgba(126, 87, 194, 0)', 'rgba(126, 87, 194, 0.4)', 'rgba(126, 87, 194, 0.15)'],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: speed, repeat: 2, repeatType: 'reverse' }}
          >
            {part}
          </motion.span>
        ) : (
          <span key={i}>{part}</span>
        );
      });
    } catch {
      return <span className="ae-equation-text">{equation}</span>;
    }
  };

  return (
    <div className="ae-container">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          className="ae-step"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        >
          <motion.div
            className="ae-step-number"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          >
            {currentStep + 1}
          </motion.div>

          <div className="ae-equation">
            {currentStepData.from && (
              <motion.div
                className="ae-equation-from"
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: currentStepData.to ? 0.5 : 1, y: 0 }}
                transition={{ duration: speed }}
              >
                {renderEquationWithHighlight(currentStepData.from, currentStepData.highlight)}
              </motion.div>
            )}

            {currentStepData.to && currentStepData.to !== currentStepData.from && (
              <>
                <motion.div
                  className="ae-arrow"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.4, delay: speed * 0.5 }}
                >
                  <motion.span
                    animate={{ x: [0, 8, 0] }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    →
                  </motion.span>
                </motion.div>

                <motion.div
                  className="ae-equation-to"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15, delay: speed * 0.6 }}
                >
                  {renderEquationWithHighlight(currentStepData.to, currentStepData.newHighlight)}
                </motion.div>
              </>
            )}
          </div>

          <motion.p
            className="ae-explanation"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: speed * 0.8 }}
          >
            {currentStepData.explanation}
          </motion.p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AnimatedEquation;