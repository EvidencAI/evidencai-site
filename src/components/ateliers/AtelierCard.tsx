import Link from 'next/link';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

interface AtelierCardProps {
  module: {
    id: string;
    title: string;
    level: 'debutant' | 'intermediaire' | 'confirme';
    duration: string;
    price: string;
    description: string;
    topics: string[];
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

      <div className="mt-auto">
        <Link
          href={`/ateliers/inscription?module=${module.id}`}
          className="block w-full text-center px-6 py-3 bg-bleu-nuit text-white font-semibold rounded-lg hover:bg-bleu-nuit-light transition-colors text-sm"
        >
          Voir les dates et s&apos;inscrire
        </Link>
      </div>
    </Card>
  );
}
