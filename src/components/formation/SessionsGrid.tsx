import { Calendar, MapPin } from 'lucide-react';

type Session = {
  dates: string;
  location: string;
};

interface SessionsGridProps {
  sessions: Session[];
  label?: string;
}

/**
 * Grille de sessions adaptative, utilisée dans les pages Décider et Bâtir.
 * Layout : flex-wrap centré, chaque card a une largeur min/max pour rester lisible
 * quel que soit le nombre de sessions (1, 2, 3, 5...).
 */
export default function SessionsGrid({ sessions, label = 'Session présentielle' }: SessionsGridProps) {
  if (sessions.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-4 justify-center mb-12">
      {sessions.map((session, i) => (
        <div
          key={i}
          className="flex-1 min-w-[240px] max-w-[320px] bg-fond-surface border border-bleu-subtil rounded-xl p-6 hover:border-ambre transition-colors"
        >
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-4 h-4 text-ambre" strokeWidth={2} />
            <span className="font-mono text-[11px] uppercase tracking-wider text-ambre">
              {label}
            </span>
          </div>
          <p className="font-playfair text-xl font-bold text-white leading-tight mb-3">
            {session.dates}
          </p>
          <div className="flex items-center gap-1.5 text-text-secondary text-sm">
            <MapPin className="w-3.5 h-3.5" strokeWidth={1.8} />
            <span>{session.location}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
