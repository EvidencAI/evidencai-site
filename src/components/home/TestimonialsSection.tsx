import Card from '@/components/ui/Card';
import type { getDictionary } from '@/i18n/dictionaries';

interface TestimonialsSectionProps {
  dict: Awaited<ReturnType<typeof getDictionary>>;
}

export default function TestimonialsSection({ dict }: TestimonialsSectionProps) {
  const testimonials = [
    {
      quote: dict.home.testimonials.items.line.quote,
      author: dict.home.testimonials.items.line.author,
      role: dict.home.testimonials.items.line.role,
      company: dict.home.testimonials.items.line.company,
      context: dict.home.testimonials.items.line.context,
    },
    {
      quote: dict.home.testimonials.items.lea.quote,
      author: dict.home.testimonials.items.lea.author,
      role: dict.home.testimonials.items.lea.role,
      company: dict.home.testimonials.items.lea.company,
      context: dict.home.testimonials.items.lea.context,
    },
    {
      quote: dict.home.testimonials.items.nicolas.quote,
      author: dict.home.testimonials.items.nicolas.author,
      role: dict.home.testimonials.items.nicolas.role,
      company: dict.home.testimonials.items.nicolas.company,
      context: dict.home.testimonials.items.nicolas.context,
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-bleu-nuit mb-4">
            {dict.home.testimonials.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-gray-50 border border-gray-200 text-bleu-nuit flex flex-col h-full">
              <div className="mb-6">
                <svg className="w-10 h-10 text-ambre-contrast" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="text-gray-600 italic mb-4 leading-relaxed flex-grow">
                {testimonial.quote}
              </p>
              <p className="text-xs text-gray-500 mb-4">{testimonial.context}</p>
              <div className="border-t border-gray-200 pt-4 mt-auto">
                <p className="font-semibold text-bleu-nuit">{testimonial.author}</p>
                <p className="text-sm text-gray-600">{testimonial.role}</p>
                <p className="text-sm text-ambre-contrast">{testimonial.company}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
