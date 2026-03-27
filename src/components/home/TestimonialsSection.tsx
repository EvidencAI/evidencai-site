import Card from '@/components/ui/Card';

export default function TestimonialsSection() {
  const testimonials = [
    {
      quote: 'La formation DecidIA nous a permis de passer d\'une curiosité pour l\'IA à une vraie compréhension stratégique. Deux jours intenses, concrets, et surtout adaptés à notre réalité de dirigeants.',
      author: 'Line T.',
      role: 'Présidente',
      company: 'ALIA Formation',
      context: 'Formation DecidIA — Mars 2026',
    },
    {
      quote: 'Stéphane a su comprendre nos contraintes métier et intégrer l\'IA là où elle apporte vraiment de la valeur. L\'équipe s\'est approprié les outils naturellement, sans résistance au changement.',
      author: 'Léa D.',
      role: 'Directrice',
      company: 'Nature d\'Eaux',
      context: 'Implémentation IA — 2026',
    },
    {
      quote: 'Le plugin pour le Tribunal de Commerce a transformé ma préparation des audiences. L\'analyse des dossiers est plus rigoureuse et le gain de temps est considérable.',
      author: 'Nicolas R.',
      role: 'Président',
      company: 'Cuisine AVIVA Valence',
      context: 'Plugin TC — 2026',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-bleu-nuit mb-4">
            Ils nous font confiance
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-gray-50 border border-gray-200 text-bleu-nuit flex flex-col h-full">
              <div className="mb-6">
                <svg className="w-10 h-10 text-ambre" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="text-gray-600 italic mb-4 leading-relaxed flex-grow">
                {testimonial.quote}
              </p>
              <p className="text-xs text-gray-400 mb-4">{testimonial.context}</p>
              <div className="border-t border-gray-200 pt-4 mt-auto">
                <p className="font-semibold text-bleu-nuit">{testimonial.author}</p>
                <p className="text-sm text-gray-600">{testimonial.role}</p>
                <p className="text-sm text-ambre">{testimonial.company}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
