import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import ReserverAtelierButton from './ReserverAtelierButton';

interface AtelierSession {
  date: string;       // ex: "22 avril"
  time: string;       // ex: "9h - 11h"
  bookingUrl: string; // lien direct Calendly pour cette session
}

interface AtelierCardProps {
  module: {
    id: string;
    title: string;
    level: 'debutant' | 'intermediaire' | 'confirme';
    duration: string;
    price: string;
    description: string;
    topics: string[];
    calendlyUrl: string;
    sessions?: AtelierSession[];
  };
}

const levelLabels: Record<string, string> = {
  debutant: 'Tous niveaux',
  intermediaire: 'Intermédiaire',
  confirme: 'Avancé',
};

export default function AtelierCard({ module }: AtelierCardProps) {
  // Séparer titre principal et sous-titre au niveau du ":"
  const titleParts = module.title.split(' : ');
  const hasSubtitle = titleParts.length > 1;

  // Rendre les \n comme des <br /> dans la description
  const descriptionParts = module.description.split('\n');

  return (
    <Card hover className="flex flex-col h-full">
      <div className="flex items-start justify-between mb-4">
        <Badge variant={module.level}>
          {levelLabels[module.level] ?? module.level}
        </Badge>
        <div className="text-right">
          <p className="text-2xl font-bold text-ambre">{module.price}</p>
          <p className="text-sm text-gray-500">{module.duration}</p>
        </div>
      </div>

      <h3 className="font-playfair text-2xl font-bold text-bleu-nuit mb-4">
        {hasSubtitle ? (
          <>
            {titleParts[0]}&nbsp;:
            <br />
            <span className="text-xl">{titleParts[1]}</span>
          </>
        ) : (
          module.title
        )}
      </h3>

      <p className="text-gray-600 mb-6 leading-relaxed">
        {descriptionParts.length > 1
          ? descriptionParts.map((part, i) => (
              <span key={i}>
                {i > 0 && <br />}
                {part}
              </span>
            ))
          : module.description}
      </p>

      <div className="mb-6 flex-grow">
        <h4 className="font-semibold text-bleu-nuit mb-3">Au programme :</h4>
        <ul className="space-y-2">
          {module.topics.map((topic, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
              <svg className="w-5 h-5 text-ambre flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {topic}
            </li>
          ))}
        </ul>
      </div>

      {/* Prochaines sessions */}
      {module.sessions && module.sessions.length > 0 ? (
        <div className="mt-auto bg-ambre/5 border border-ambre/20 rounded-lg p-4">
          <h4 className="font-semibold text-bleu-nuit mb-3 text-sm flex items-center gap-2">
            <svg className="w-4 h-4 text-ambre" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Prochaines sessions
          </h4>
          <div className="space-y-2">
            {module.sessions.map((session, index) => (
              <ReserverAtelierButton
                key={index}
                href={session.bookingUrl}
                className="flex items-center justify-between text-sm p-2 rounded-md hover:bg-ambre/10 transition-colors group"
              >
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-medium text-bleu-nuit">{session.date}</span>
                  <span className="text-gray-500">{session.time}</span>
                </div>
                <span className="text-xs font-semibold text-ambre-contrast group-hover:text-ambre whitespace-nowrap ml-2 flex items-center gap-1 transition-colors">
                  Réserver
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </ReserverAtelierButton>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-auto">
          <ReserverAtelierButton
            href={module.calendlyUrl}
            className="block w-full text-center px-6 py-3 bg-bleu-nuit text-white font-semibold rounded-lg hover:bg-bleu-nuit-light transition-colors text-sm"
          >
            Voir les disponibilités
          </ReserverAtelierButton>
        </div>
      )}
    </Card>
  );
}
