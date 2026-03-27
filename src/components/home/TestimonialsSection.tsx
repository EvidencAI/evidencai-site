import Card from '@/components/ui/Card';

export default function TestimonialsSection() {
  const testimonials = [
    {
      quote: '[PLACEHOLDER - À remplacer par un vrai témoignage client]',
      author: '[Nom du client]',
      role: '[Fonction]',
      company: '[Entreprise]',
    },
    {
      quote: '[PLACEHOLDER - À remplacer par un vrai témoignage client]',
      author: '[Nom du client]',
      role: '[Fonction]',
      company: '[Entreprise]',
    },
    {
      quote: '[PLACEHOLDER - À remplacer par un vrai témoignage client]',
      author: '[Nom du client]',
      role: '[Fonction]',
      company: '[Entreprise]',
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
            <Card key={index} className="bg-gray-50 border border-gray-200 text-bleu-nuit">
              <div className="mb-6">
                <svg className="w-10 h-10 text-ambre" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="text-gray-600 italic mb-6 leading-relaxed">
                {testimonial.quote}
              </p>
              <div className="border-t border-gray-200 pt-4">
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
