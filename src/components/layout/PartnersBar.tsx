import Image from 'next/image';

export default function PartnersBar() {
  return (
    <section className="bg-bleu-nuit border-t border-white/10 py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-white/60 text-sm mb-8">
          Projet soutenu par
        </p>
        <div className="flex items-center justify-center gap-16 md:gap-24 flex-wrap">
          {/* Région Auvergne-Rhône-Alpes */}
          <a
            href="https://www.auvergnerhonealpes.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-70 hover:opacity-100 transition-opacity"
          >
            <Image
              src="/logos/region-aura.svg"
              alt="Région Auvergne-Rhône-Alpes"
              width={400}
              height={130}
              className="h-[100px] w-auto"
            />
          </a>
          {/* Minalogic */}
          <a
            href="https://www.minalogic.com"
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-80 hover:opacity-100 transition-opacity"
          >
            <Image
              src="/logos/minalogic.png"
              alt="Minalogic - Projet labellisé"
              width={350}
              height={110}
              className="h-[90px] w-auto"
            />
          </a>
          {/* Grenoble INP - Esisar */}
          <a
            href="https://esisar.grenoble-inp.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-70 hover:opacity-100 transition-opacity"
          >
            <Image
              src="/logos/esisar-blanc.png"
              alt="Grenoble INP - Esisar"
              width={348}
              height={125}
              className="h-[70px] w-auto"
            />
          </a>
          {/* Geneo Incubateur */}
          <a
            href="https://geneo-incubateur.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-80 hover:opacity-100 transition-opacity bg-white/90 rounded-lg px-4 py-2"
          >
            <Image
              src="/logos/geneo.png"
              alt="Geneo Incubateur"
              width={200}
              height={60}
              className="h-[50px] w-auto"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
