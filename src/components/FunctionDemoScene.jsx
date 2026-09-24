import React from 'react';
import AnimatedGraph from './AnimatedGraph';

/**
 * FunctionDemoScene
 * Renders the graph of the demo question, so the student can see what Neo is talking about.
 */
const FunctionDemoScene = ({ config = {} }) => {
  return (
    <div className="neo-demo-scene">
      <AnimatedGraph
        functionType={config.functionType || 'exponential'}
        equation={config.equation || 'f(x) = 2^x - 8'}
        a={config.a ?? 1}
        b={config.b ?? 2}
        c={config.c ?? -8}
        showAsymptote={config.showAsymptote ?? true}
        asymptote={config.asymptote ?? -8}
        showXIntercept={config.showXIntercept ?? true}
        showYIntercept={config.showYIntercept ?? true}
        xIntercepts={config.xIntercepts || [3]}
      />
    </div>
  );
};

export default FunctionDemoScene;