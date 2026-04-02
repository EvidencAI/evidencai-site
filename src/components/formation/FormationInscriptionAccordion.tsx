'use client';

import { AccordionItem } from '@/components/ui/Accordion';
import FormationInscriptionForm from './FormationInscriptionForm';

export default function FormationInscriptionAccordion() {
  return (
    <div className="border-t border-gray-200">
      <AccordionItem title="Pré-inscription et demande d'information">
        <FormationInscriptionForm />
      </AccordionItem>
    </div>
  );
}
