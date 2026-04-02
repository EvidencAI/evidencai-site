"use client";

import { useState } from "react";

export default function BetaForm() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(
    "Bonjour,\nJe souhaite obtenir un code pour un accès gratuit d'un mois (plan CodirAI300) comme bêta-testeur.\nMerci de m'indiquer la procédure à suivre.\nCordialement"
  );
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/beta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      if (res.ok) {
        setStatus("sent");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="flex items-center gap-2 px-4 py-2.5 bg-green-50 border border-green-200 rounded-lg">
        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        <span className="text-sm text-green-800 font-semibold">Candidature envoyée !</span>
      </div>
    );
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-ambre text-bleu-nuit text-sm font-semibold rounded-lg hover:bg-ambre-light transition-colors whitespace-nowrap cursor-pointer"
      >
        Postuler
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 mt-2 p-4 bg-gray-50 border border-gray-200 rounded-lg max-w-lg">
      <div className="flex flex-wrap gap-3">
        <div className="flex-1 min-w-[140px]">
          <label htmlFor="beta-name" className="block text-xs text-gray-500 mb-1">Nom</label>
          <input
            id="beta-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Votre nom"
            className="w-full px-3 py-1.5 text-sm text-gray-800 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ambre"
          />
        </div>
        <div className="flex-1 min-w-[180px]">
          <label htmlFor="beta-email" className="block text-xs text-gray-500 mb-1">Email</label>
          <input
            id="beta-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="votre@email.com"
            className="w-full px-3 py-1.5 text-sm text-gray-800 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ambre"
          />
        </div>
      </div>
      <div>
        <label htmlFor="beta-message" className="block text-xs text-gray-500 mb-1">Message</label>
        <textarea
          id="beta-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          className="w-full px-3 py-1.5 text-sm text-gray-800 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ambre resize-y"
        />
      </div>
      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-ambre text-bleu-nuit text-sm font-semibold rounded-lg hover:bg-ambre-light transition-colors whitespace-nowrap cursor-pointer disabled:opacity-50"
        >
          {status === "sending" ? "Envoi..." : "Envoyer ma candidature"}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
        >
          Annuler
        </button>
        {status === "error" && (
          <span className="text-xs text-red-600">Erreur, réessayez.</span>
        )}
      </div>
    </form>
  );
}
