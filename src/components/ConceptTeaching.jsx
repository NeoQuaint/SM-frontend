import React from 'react';
import NeoTeacher from './NeoTeacher';
import NeoVoiceIndicator from './NeoVoiceIndicator';
import { GEO_TEACHING_SCRIPTS } from '../data/GeographyContent';
import { ECON_TEACHING_SCRIPTS } from '../data/EconomicsContent';
import { MATHSLIT_TEACHING_SCRIPTS } from '../data/MathsLitContent';
import { PHYSICS_TEACHING_SCRIPTS } from '../data/PhysicalSciencesContent';
import { LIFESCIENCES_TEACHING_SCRIPTS } from "../data/LifeSciencesContent";
import { ACCOUNTING_TEACHING_SCRIPTS } from '../data/AccountingContent';
import { HISTORY_TEACHING_SCRIPTS } from '../data/HistoryContent';
import { ENGLISH_TEACHING_SCRIPTS } from '../data/EnglishContent';
import { BUSINESS_TEACHING_SCRIPTS } from '../data/BusinessContent';
import { MATHS_TEACHING_SCRIPTS } from '../data/MathsContent';

/**
 * ConceptTeaching
 * Renders a short teaching session for a concept before its first question.
 * Picks the right script map based on `scriptsModule`.
 */
const ConceptTeaching = ({
  topic,
  onSpeak,
  onComplete,
  autoMode = false,
  onToggleAuto,
  scriptsModule = 'business',
}) => {
  const SCRIPTS =
    scriptsModule === 'geo' ? GEO_TEACHING_SCRIPTS
    : scriptsModule === 'econ' ? ECON_TEACHING_SCRIPTS
    : scriptsModule === 'mathslit' ? MATHSLIT_TEACHING_SCRIPTS
    : scriptsModule === 'physics' ? PHYSICS_TEACHING_SCRIPTS
    : scriptsModule === 'lifesciences' ? LIFESCIENCES_TEACHING_SCRIPTS
    : scriptsModule === 'accounting' ? ACCOUNTING_TEACHING_SCRIPTS
    : scriptsModule === 'history' ? HISTORY_TEACHING_SCRIPTS
    : scriptsModule === 'english' ? ENGLISH_TEACHING_SCRIPTS
    : scriptsModule === 'maths' ? MATHS_TEACHING_SCRIPTS
    : scriptsModule === 'business' ? BUSINESS_TEACHING_SCRIPTS
    : BUSINESS_TEACHING_SCRIPTS;

  const content = SCRIPTS[topic];

  if (!content) {
    // No script for this concept — skip straight through
    onComplete();
    return null;
  }

  return (
    <div className="tl-app">
      <header className="tl-header">
        <div className="tl-progress-mini">
          <div className="tl-progress-bar-mini">
            <div className="tl-progress-fill-mini" style={{ width: '10%' }}></div>
          </div>
          <span className="tl-progress-text-mini">Learning</span>
        </div>
        {onToggleAuto && (
          <NeoVoiceIndicator
            isSpeaking={false}
            autoMode={autoMode}
            onToggleAuto={onToggleAuto}
          />
        )}
      </header>

      <NeoTeacher
        content={content}
        onSpeak={onSpeak}
        onComplete={onComplete}
      />
    </div>
  );
};

export default ConceptTeaching;