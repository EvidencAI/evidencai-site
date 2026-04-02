'use client';

import { AccordionItem } from '@/components/ui/Accordion';
import FormationInscriptionForm from './FormationInscriptionForm';

const AmbreCheck = () => (
  <svg className="w-5 h-5 text-ambre flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
  </svg>
);

const programmeJ1 = {
  matin: [
    { id: 'S1', titre: 'Ouverture et positionnement' },
    { id: 'S2', titre: 'Les 4 piliers pour une utilisation lucide de l\'IA' },
    { id: 'S3', titre: 'Comprendre l\'IA générative' },
    { id: 'S4', titre: 'Le paysage des LLM' },
    { id: 'S5', titre: 'Les risques en action' },
  ],
  apresmidi: [
    { id: 'S6', titre: 'Anatomie d\'un prompt efficace' },
    { id: 'S7', titre: 'Mécaniques IA en profondeur' },
    { id: 'S8', titre: 'Transformer un mauvais prompt' },
    { id: 'S9', titre: 'Prompter pour décider' },
    { id: 'S10', titre: 'Sensibilisation sécurité' },
    { id: 'S11', titre: 'Clôture J1' },
  ],
};

const programmeJ2 = {
  matin: [
    { id: 'S12', titre: 'Réactivation J2 : Quiz des 4 piliers' },
    { id: 'S13', titre: 'Comprendre les agents IA' },
    { id: 'S14', titre: 'Conception de son agent' },
    { id: 'S15', titre: 'Atelier : Création de son assistant' },
    { id: 'S16', titre: 'Tests croisés en binômes' },
    { id: 'S17', titre: 'Les limites de l\'IA : Biais' },
  ],
  apresmidi: [
    { id: 'S18', titre: 'Réflexion éthique : Débat' },
    { id: 'S19', titre: 'L\'univers fermé vs ouvert' },
    { id: 'S20', titre: 'RAG : Le mythe du document lu' },
    { id: 'S21', titre: 'NotebookLM : Docs en assistant' },
    { id: 'S22', titre: 'Perplexity : L\'IA qui cite ses sources' },
    { id: 'S23', titre: 'EvidencAI : Comité de direction virtuel' },
    { id: 'S24', titre: 'Sécurité IA en entreprise' },
    { id: 'S25', titre: 'Clôture de formation' },
  ],
};

function SequenceList({ sequences }: { sequences: { id: string; titre: string }[] }) {
  return (
    <ul className="space-y-2">
      {sequences.map((seq) => (
        <li key={seq.id} className="flex items-start gap-2 text-sm text-gray-600">
          <AmbreCheck />
          <span><span className="text-gray-400 font-mono text-xs">{seq.id}</span> {seq.titre}</span>
        </li>
      ))}
    </ul>
  );
}

export default function FormationCatalogueDetails() {
  return (
    <div className="border-t border-gray-200">
      <AccordionItem title="Programme détaillé (25 séquences)">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="font-bold text-bleu-nuit text-lg mb-1">Jour 1</h4>
            <p className="text-ambre font-medium mb-4">De l&apos;usage à la maîtrise</p>
            <div className="mb-4">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Matin</p>
              <SequenceList sequences={programmeJ1.matin} />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Après-midi</p>
              <SequenceList sequences={programmeJ1.apresmidi} />
            </div>
          </div>
          <div>
            <h4 className="font-bold text-bleu-nuit text-lg mb-1">Jour 2</h4>
            <p className="text-ambre font-medium mb-4">De la maîtrise à la stratégie</p>
            <div className="mb-4">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Matin</p>
              <SequenceList sequences={programmeJ2.matin} />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Après-midi</p>
              <SequenceList sequences={programmeJ2.apresmidi} />
            </div>
          </div>
        </div>
      </AccordionItem>

      <AccordionItem title="Méthodes pédagogiques">
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex items-start gap-2"><AmbreCheck />Démonstrations en direct sur les plateformes d&apos;IA (ChatGPT, Claude, Gemini)</li>
          <li className="flex items-start gap-2"><AmbreCheck />Exercices individuels et en binôme sur des cas métiers réels</li>
          <li className="flex items-start gap-2"><AmbreCheck />Co-animation pédagogique avec une IA</li>
          <li className="flex items-start gap-2"><AmbreCheck />Fiches pratiques remises aux participants</li>
          <li className="flex items-start gap-2"><AmbreCheck />Plan d&apos;action individuel à 30 jours</li>
        </ul>
      </AccordionItem>

      <AccordionItem title="Évaluation des acquis">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600">
          <div><span className="font-medium text-bleu-nuit">Avant :</span> Questionnaire de pré-formation (auto-positionnement)</div>
          <div><span className="font-medium text-bleu-nuit">Pendant :</span> Exercices pratiques évalués</div>
          <div><span className="font-medium text-bleu-nuit">Fin de formation :</span> Grille d&apos;évaluation à chaud</div>
          <div><span className="font-medium text-bleu-nuit">J+30 :</span> Grille d&apos;évaluation à froid</div>
        </div>
        <p className="text-xs text-gray-500 mt-3">Une attestation de fin de formation est remise à chaque participant.</p>
      </AccordionItem>

      <AccordionItem title="Prérequis">
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex items-start gap-2"><AmbreCheck />Ordinateur portable</li>
          <li className="flex items-start gap-2"><AmbreCheck />Pouvoir créer un assistant personnalisé sur au moins une plateforme (Custom GPT, Projet Claude ou Gem Gemini)</li>
          <li className="flex items-start gap-2"><AmbreCheck />Répondre au questionnaire de pré-formation transmis en amont</li>
        </ul>
      </AccordionItem>

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
