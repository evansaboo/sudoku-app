import type { Lang } from '../constants/i18n';
import { translations } from '../constants/i18n';

interface Props {
  lang: Lang;
  onClose: () => void;
}

const STEPS = [
  { icon: '✏️', titleKey: 'creatorGuideStep1Title', descKey: 'creatorGuideStep1Desc' },
  { icon: '🎲', titleKey: 'creatorGuideStep2Title', descKey: 'creatorGuideStep2Desc' },
  { icon: '✕',  titleKey: 'creatorGuideStep3Title', descKey: 'creatorGuideStep3Desc' },
  { icon: '✓',  titleKey: 'creatorGuideStep4Title', descKey: 'creatorGuideStep4Desc' },
  { icon: '🔗', titleKey: 'creatorGuideStep5Title', descKey: 'creatorGuideStep5Desc' },
] as const;

type StepKey = typeof STEPS[number]['titleKey'] | typeof STEPS[number]['descKey'];

export default function CreatorGuide({ lang, onClose }: Props) {
  const t = translations[lang];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal creator-guide-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">📖 {t.creatorGuideTitle}</h2>
          <button className="icon-btn modal-close" onClick={onClose}>✕</button>
        </div>

        <p className="creator-guide-intro">{t.creatorGuideIntro}</p>

        <ol className="creator-guide-steps">
          {STEPS.map((step, i) => (
            <li key={i} className="creator-guide-step">
              <div className="creator-guide-step-icon">{step.icon}</div>
              <div className="creator-guide-step-body">
                <strong>{t[step.titleKey as keyof typeof t]}</strong>
                <span>{t[step.descKey as keyof typeof t]}</span>
              </div>
            </li>
          ))}
        </ol>

        <button className="generate-btn" onClick={onClose}>
          {t.creatorGuideDone}
        </button>
      </div>
    </div>
  );
}
