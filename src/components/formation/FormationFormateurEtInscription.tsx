'use client';

import { AccordionItem } from '@/components/ui/Accordion';
import FormationInscriptionForm from './FormationInscriptionForm';

export default function FormationFormateurEtInscription() {
  return (
    <div className="border-t border-gray-200 mt-8">
      <AccordionItem title="Formateur et organisme de formation">
        <div className="text-sm text-gray-600 space-y-3">
          <p>
            <span className="font-semibold text-bleu-nuit">Formateur :</span> Stéphane Commenge.
            <br />
            Consultant en transformation numérique et intelligence artificielle.
            <br />
            Accompagne les dirigeants de PME et ETI et leurs collaborateurs
            dans l&apos;intégration opérationnelle de l&apos;IA générative.
          </p>
          <p className="text-xs text-gray-500">
            Formation portée par <span className="font-semibold">ALIA Formation</span>, organisme certifié Qualiopi.
          </p>
        </div>
      </AccordionItem>

      <AccordionItem title="Pré-inscription et demande d'information" titleClassName="text-ambre">
        <FormationInscriptionForm />
      </AccordionItem>
    </div>
  );
}
