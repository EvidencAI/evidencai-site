"""
Genere le PDF Qualiopi programme "Decider avec l'IA" - meme style que Batir.
Sortie : public/downloads/programme-qualiopi-decider-avec-ia.pdf
"""
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import cm
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT, TA_JUSTIFY
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, PageBreak,
    Table, TableStyle, KeepTogether,
)
import os

OUTPUT = "/Users/stephanecommenge/Claude-Dev/EvidencIA-site/public/downloads/programme-qualiopi-decider-avec-ia.pdf"

AMBRE = colors.HexColor("#D97706")
BLEU = colors.HexColor("#1E3A5F")
GRIS = colors.HexColor("#4B5563")
GRIS_CLAIR = colors.HexColor("#E5E7EB")
FOND_BOX = colors.HexColor("#FFF7ED")

styles = getSampleStyleSheet()

title_main = ParagraphStyle("TitleMain", parent=styles["Title"],
    fontName="Helvetica-Bold", fontSize=28, textColor=BLEU,
    alignment=TA_LEFT, leading=32, spaceAfter=2)
subtitle_main = ParagraphStyle("SubTitleMain", parent=styles["Normal"],
    fontName="Helvetica-Oblique", fontSize=13, textColor=GRIS,
    alignment=TA_LEFT, leading=16, spaceAfter=20)
h1_ambre = ParagraphStyle("H1Ambre", parent=styles["Heading1"],
    fontName="Helvetica-Bold", fontSize=16, textColor=AMBRE,
    leading=20, spaceBefore=14, spaceAfter=8)
body = ParagraphStyle("Body", parent=styles["Normal"],
    fontName="Helvetica", fontSize=10.5, textColor=colors.black,
    leading=14, spaceAfter=4, alignment=TA_LEFT)
body_just = ParagraphStyle("BodyJust", parent=body, alignment=TA_JUSTIFY)
module_title_st = ParagraphStyle("ModuleTitle", parent=body,
    fontName="Helvetica-Bold", fontSize=12, textColor=BLEU, leading=15)
module_code_st = ParagraphStyle("ModuleCode", parent=body,
    fontName="Helvetica-Bold", fontSize=10, textColor=colors.white, alignment=1)
module_duree_st = ParagraphStyle("ModuleDuree", parent=body,
    fontName="Helvetica-Bold", fontSize=10, textColor=AMBRE, alignment=2)
methode_title = ParagraphStyle("MethodeTitle", parent=body,
    fontName="Helvetica-Bold", fontSize=9.5, textColor=BLEU)
methode_body = ParagraphStyle("MethodeBody", parent=body,
    fontSize=9.5, leading=12, textColor=GRIS)
demi_title = ParagraphStyle("DemiTitle", parent=body,
    fontName="Helvetica-Bold", fontSize=14, textColor=BLEU, leading=17, spaceBefore=6)
demi_horaire = ParagraphStyle("DemiHoraire", parent=body,
    fontName="Helvetica-Oblique", fontSize=10.5, textColor=AMBRE, alignment=2)


def draw_page(canv, doc):
    width, height = A4
    canv.setFillColor(GRIS_CLAIR)
    canv.rect(0, height - 1.3*cm, width, 1.3*cm, stroke=0, fill=1)
    canv.setFillColor(GRIS)
    canv.setFont("Helvetica-Oblique", 9)
    canv.drawRightString(width - 1.6*cm, height - 0.85*cm,
        "EvidencAI - Programme pedagogique - Decider avec l'IA")
    canv.setFillColor(GRIS)
    canv.setFont("Helvetica", 8.5)
    canv.drawCentredString(width/2, 1.0*cm,
        "ALIA formation, 31 Avenue Jean Monnet - 26000 Valence - Page %d" % doc.page)
    canv.setStrokeColor(AMBRE)
    canv.setLineWidth(0.6)
    canv.line(1.6*cm, 1.45*cm, width - 1.6*cm, 1.45*cm)


def info_row(label, value):
    return Table(
        [[Paragraph("<b>%s :</b>" % label, body), Paragraph(value, body)]],
        colWidths=[3.4*cm, 12.5*cm],
        style=TableStyle([
            ("VALIGN", (0,0), (-1,-1), "TOP"),
            ("LEFTPADDING", (0,0), (-1,-1), 0),
            ("RIGHTPADDING", (0,0), (-1,-1), 0),
            ("TOPPADDING", (0,0), (-1,-1), 1),
            ("BOTTOMPADDING", (0,0), (-1,-1), 1),
        ])
    )


def objectif_row(num, texte):
    return Table(
        [[Paragraph("<font color='#D97706'><b>%d.</b></font>" % num, body),
          Paragraph(texte, body)]],
        colWidths=[0.7*cm, 15.2*cm],
        style=TableStyle([
            ("VALIGN", (0,0), (-1,-1), "TOP"),
            ("LEFTPADDING", (0,0), (-1,-1), 0),
            ("RIGHTPADDING", (0,0), (-1,-1), 0),
            ("TOPPADDING", (0,0), (-1,-1), 2),
            ("BOTTOMPADDING", (0,0), (-1,-1), 2),
        ])
    )


def module_block(code, titre, duree, puces, methodes, exos):
    code_cell = Table([[Paragraph(code, module_code_st)]], colWidths=[1.6*cm], rowHeights=[0.6*cm])
    code_cell.setStyle(TableStyle([
        ("BACKGROUND", (0,0), (-1,-1), AMBRE),
        ("ALIGN", (0,0), (-1,-1), "CENTER"),
        ("VALIGN", (0,0), (-1,-1), "MIDDLE"),
        ("LEFTPADDING", (0,0), (-1,-1), 0),
        ("RIGHTPADDING", (0,0), (-1,-1), 0),
    ]))

    header = Table(
        [[code_cell, Paragraph(titre, module_title_st), Paragraph(duree, module_duree_st)]],
        colWidths=[1.8*cm, 11.4*cm, 2.4*cm],
        style=TableStyle([
            ("VALIGN", (0,0), (-1,-1), "MIDDLE"),
            ("LEFTPADDING", (0,0), (-1,-1), 0),
            ("RIGHTPADDING", (0,0), (-1,-1), 0),
            ("ALIGN", (2,0), (2,0), "RIGHT"),
            ("LINEBELOW", (0,0), (-1,-1), 0.5, AMBRE),
            ("BOTTOMPADDING", (0,0), (-1,-1), 3),
            ("TOPPADDING", (0,0), (-1,-1), 1),
        ])
    )

    left = []
    for p in puces:
        left.append(Paragraph("<font color='#D97706'>&bull;</font> " + p, body))
        left.append(Spacer(1, 2))

    right = [Paragraph("<b>Methodes :</b>", methode_title)]
    for m in methodes:
        right.append(Paragraph(m, methode_body))
    if exos:
        right.append(Spacer(1, 4))
        right.append(Paragraph("<b>Exercices pratiques :</b>", methode_title))
        for e in exos:
            right.append(Paragraph("&bull; " + e, methode_body))

    corps = Table(
        [[left, right]],
        colWidths=[10.8*cm, 4.8*cm],
        style=TableStyle([
            ("VALIGN", (0,0), (-1,-1), "TOP"),
            ("LEFTPADDING", (0,0), (-1,-1), 4),
            ("RIGHTPADDING", (0,0), (-1,-1), 4),
            ("TOPPADDING", (0,0), (-1,-1), 6),
            ("BOTTOMPADDING", (0,0), (-1,-1), 8),
            ("BACKGROUND", (1,0), (1,0), FOND_BOX),
            ("BOX", (0,0), (-1,-1), 0.3, GRIS_CLAIR),
        ])
    )

    return KeepTogether([header, corps, Spacer(1, 10)])


def demi_journee_header(label, horaire):
    return Table([[
        Paragraph("<b>" + label + "</b>", demi_title),
        Paragraph(horaire, demi_horaire),
    ]], colWidths=[12*cm, 4*cm], style=TableStyle([
        ("LEFTPADDING", (0,0), (-1,-1), 0),
        ("RIGHTPADDING", (0,0), (-1,-1), 0),
        ("VALIGN", (0,0), (-1,-1), "MIDDLE"),
    ]))


doc = SimpleDocTemplate(
    OUTPUT, pagesize=A4,
    leftMargin=1.8*cm, rightMargin=1.8*cm,
    topMargin=1.9*cm, bottomMargin=1.9*cm,
    title="Programme Qualiopi - Decider avec l'IA",
    author="EvidencAI - ALIA Formation",
    subject="Programme pedagogique detaille",
)

story = []


# ============ PAGE 1 ============
story.append(Paragraph("Programme pedagogique detaille", subtitle_main))
story.append(Paragraph("D\u00e9cider avec l'IA", title_main))
story.append(Paragraph("De l'usage \u00e0 la ma\u00eetrise strat\u00e9gique", subtitle_main))

story.append(Paragraph("Informations g\u00e9n\u00e9rales", h1_ambre))
story.append(info_row("Dur\u00e9e", "2 jours (14 heures) - J1 + J2 espac\u00e9s d'une semaine"))
story.append(info_row("Public vis\u00e9", "Dirigeants de PME, cadres d\u00e9cisionnaires, managers"))
story.append(info_row("Pr\u00e9requis", "Aucun pr\u00e9requis technique. Disposer d'un ordinateur portable avec acc\u00e8s internet."))
story.append(info_row("Lieu", "En pr\u00e9sentiel (Valence, 26)"))
story.append(info_row("Effectif", "4 \u00e0 10 participants maximum"))
story.append(info_row("Formateur", "St\u00e9phane Commenge"))
story.append(info_row("Tarif", "960 \u20ac HT par participant"))
story.append(info_row("Certification", "Formation certifi\u00e9e Qualiopi via ALIA Formation"))

story.append(Spacer(1, 14))
story.append(Paragraph("Objectifs p\u00e9dagogiques", h1_ambre))
story.append(Paragraph("\u00c0 l'issue de la formation, le participant sera capable de :", body))
story.append(Spacer(1, 4))

objectifs = [
    "Comprendre les m\u00e9canismes des LLM et distinguer ce que l'IA sait de ce qu'elle g\u00e9n\u00e8re.",
    "Appliquer la m\u00e9thode C.R.T.F. pour formuler des prompts structur\u00e9s et efficaces.",
    "D\u00e9tecter les hallucinations et v\u00e9rifier syst\u00e9matiquement les r\u00e9ponses de l'IA.",
    "Cr\u00e9er et configurer un Mentor IA adapt\u00e9 \u00e0 son m\u00e9tier.",
    "Identifier les risques li\u00e9s \u00e0 l'IA et mettre en place une politique de s\u00e9curit\u00e9.",
    "Construire sa feuille de route personnelle d'int\u00e9gration de l'IA.",
]
for i, o in enumerate(objectifs, 1):
    story.append(objectif_row(i, o))

story.append(PageBreak())


# ============ PAGE 2 ============
story.append(Paragraph("Dispositif p\u00e9dagogique innovant", h1_ambre))
story.append(Paragraph(
    "Cette formation repose sur une p\u00e9dagogie immersive articul\u00e9e autour de trois acteurs compl\u00e9mentaires :",
    body_just))
story.append(Spacer(1, 6))
story.append(Paragraph(
    "<b>Le formateur (St\u00e9phane)</b> : apporte le cadre, les concepts, l'exp\u00e9rience terrain. "
    "Anime les d\u00e9briefings et contextualise chaque notion sur les cas r\u00e9els des participants.",
    body_just))
story.append(Spacer(1, 4))
story.append(Paragraph(
    "<b>Votre Mentor IA (projet Claude)</b> : chaque participant dispose d\u00e8s la premi\u00e8re heure de son propre Mentor IA, "
    "configur\u00e9 avec le contexte de la formation. Il r\u00e9pond aux questions, accompagne les exercices, "
    "et reste actif apr\u00e8s la formation pour continuer \u00e0 servir au quotidien.",
    body_just))
story.append(Spacer(1, 4))
story.append(Paragraph(
    "<b>Az, l'IA co-animatrice</b> : intelligence artificielle esp\u00e8gle int\u00e9gr\u00e9e au cockpit de formation. "
    "Elle rebondit sur les \u00e9changes, lance les quiz, apporte un regard d\u00e9cal\u00e9 sur les concepts. "
    "D\u00e9monstration vivante de ce que l'IA peut faire en contexte professionnel.",
    body_just))
story.append(Spacer(1, 6))
story.append(Paragraph(
    "Le support de cours interactif est accessible en ligne pendant et apr\u00e8s la formation.", body_just))

story.append(Spacer(1, 14))
story.append(Paragraph("Modalit\u00e9s d'\u00e9valuation", h1_ambre))
for item in [
    "Quiz de contr\u00f4le des acquis en fin de Jour 1 (envoy\u00e9 par email)",
    "Quiz de r\u00e9activation au d\u00e9but du Jour 2 (mesure de la r\u00e9tention \u00e0 une semaine)",
    "Quiz de synth\u00e8se en fin de Jour 2 (envoy\u00e9 par email)",
    "Questionnaire de satisfaction \u00e0 chaud en fin de formation, compl\u00e9t\u00e9 sur place et envoy\u00e9 par mail",
    "Suivi post-formation \u00e0 froid (J+30)",
]:
    story.append(Paragraph("<font color='#D97706'>&bull;</font> " + item, body))
    story.append(Spacer(1, 3))

story.append(PageBreak())


# ============ JOUR 1 ============
story.append(Paragraph("Jour 1 - Comprendre l'IA", h1_ambre))
story.append(demi_journee_header("Demi-journ\u00e9e 1 - Comprendre l'IA", "9h00 - 12h30 (3h30)"))
story.append(Spacer(1, 6))

story.append(module_block(
    "J1-01", "Embarquement", "30 min",
    [
        "Pr\u00e9sentation du formateur, du dispositif p\u00e9dagogique et des objectifs",
        "D\u00e9couverte du trio : formateur + Mentor IA personnel + Az (co-animatrice IA)",
        "Cr\u00e9ation du Projet Claude personnel par chaque participant",
        "Prise en main du support de cours interactif en ligne",
    ],
    ["Mise en situation imm\u00e9diate", "P\u00e9dagogie par l'exp\u00e9rience"],
    [],
))

story.append(module_block(
    "J1-02", "Fondamentaux de l'IA g\u00e9n\u00e9rative", "2h",
    [
        "L'IA en chiffres : 900M d'utilisateurs, 49% de Shadow AI, adoption europ\u00e9enne",
        "LLM = pr\u00e9diction du mot suivant (pipeline d'entra\u00eenement)",
        "L'iceberg des tokens : votre message repr\u00e9sente ~10% du contexte total",
        "SAIT vs G\u00c9N\u00c8RE : pourquoi l'IA invente avec assurance",
    ],
    ["Expos\u00e9 interactif", "D\u00e9monstrations en direct", "Dialogue avec le Mentor IA"],
    [
        "Comparer une r\u00e9ponse du Mentor IA vs une conversation vierge (~20 min)",
        "Tester les limites : demander un fait v\u00e9rifiable en temps r\u00e9el (~20 min)",
    ],
))

story.append(module_block(
    "J1-03", "Paysage LLM et m\u00e9moire", "1h",
    [
        "Comparatif ChatGPT / Claude / Gemini : forces et limites de chacun",
        "BullshitBench : test des questions absurdes",
        "Les 3 couches de m\u00e9moire : fil, pr\u00e9f\u00e9rences, projet",
        "Fen\u00eatre de contexte : ce que l'IA oublie dans les longs \u00e9changes",
    ],
    ["Expos\u00e9 comparatif", "Exp\u00e9rimentation guid\u00e9e"],
    ["Tester la m\u00e9moire : se pr\u00e9senter, \u00e9changer, ouvrir un nouveau fil (~25 min)"],
))

story.append(PageBreak())


story.append(Paragraph("Jour 1 (suite)", h1_ambre))
story.append(demi_journee_header("Demi-journ\u00e9e 2 - Ma\u00eetriser l'IA", "13h30 - 17h00 (3h30)"))
story.append(Spacer(1, 6))

story.append(module_block(
    "J1-04", "Les 4 Piliers + m\u00e9thode C.R.T.F.", "2h",
    [
        "Les 4 piliers de l'IA ma\u00eetris\u00e9e : Recadrer, Contextualiser, V\u00e9rifier, It\u00e9rer",
        "M\u00e9thode C.R.T.F. : Contexte, R\u00f4le, T\u00e2che, Format",
        "Transformation avant/apr\u00e8s : prompt g\u00e9n\u00e9rique vs prompt structur\u00e9",
        "Checklist rapide (10 secondes) pour chaque interaction avec l'IA",
    ],
    ["P\u00e9dagogie inductive", "Cas pratiques m\u00e9tier", "Avant/apr\u00e8s en direct"],
    [
        "Tester 3 r\u00f4les diff\u00e9rents sur le m\u00eame sujet (~20 min)",
        "Construire un prompt C.R.T.F. complet sur un cas r\u00e9el (~25 min)",
        "Appliquer la m\u00e9thode \u00e0 une vraie d\u00e9cision professionnelle (~20 min)",
    ],
))

story.append(module_block(
    "J1-05", "M\u00e9caniques cach\u00e9es et hallucinations", "1h",
    [
        "Temp\u00e9rature (cr\u00e9ativit\u00e9 vs pr\u00e9cision) et persona (le r\u00f4le change tout)",
        "Fen\u00eatre de contexte : le risque de perte d'information",
        "Limites volontaires (garde-fous) vs involontaires (hallucinations)",
        "Hallucinations : chiffres 2025-2026, m\u00e9canismes, cons\u00e9quences",
        "3 r\u00e9flexes anti-hallucination : sourcer, croiser, tester",
    ],
    ["D\u00e9monstration live", "Exercice L\u00e9gifrance", "D\u00e9briefing collectif"],
    [
        "V\u00e9rification juridique en direct sur L\u00e9gifrance (~40 min)",
        "Explorer les param\u00e8tres de s\u00e9curit\u00e9 des donn\u00e9es des 3 LLM (~30 min)",
    ],
))

story.append(module_block(
    "J1-06", "S\u00e9curit\u00e9 et risques IA", "30 min",
    [
        "Tableau de v\u00e9rit\u00e9 des donn\u00e9es : ce que chaque LLM fait de vos informations",
        "3 zones de s\u00e9curit\u00e9 : verte (s\u00fbr), orange (pr\u00e9caution), rouge (interdit)",
        "4 risques majeurs : Shadow AI, deepfakes, phishing augment\u00e9, biais IA",
        "5 r\u00e9flexes s\u00e9curit\u00e9 \u00e0 ancrer",
    ],
    ["Expos\u00e9 + d\u00e9mo comparative", "Discussion collective"],
    ["Comparer les politiques de confidentialit\u00e9 des 3 LLM (~20 min)"],
))

story.append(Paragraph(
    "<i>Quiz Bilan Jour 1 envoy\u00e9 par email apr\u00e8s la s\u00e9ance (7 questions, ~10 min)</i>", body))
story.append(PageBreak())


# ============ JOUR 2 ============
story.append(Paragraph("Jour 2 - Construire et p\u00e9renniser", h1_ambre))
story.append(Paragraph(
    "Une semaine apr\u00e8s le Jour 1 - mesure de la r\u00e9tention des acquis, "
    "puis passage \u00e0 la construction de son propre Mentor IA et \u00e0 la s\u00e9curisation des usages.",
    body_just))
story.append(Spacer(1, 10))

story.append(demi_journee_header("Demi-journ\u00e9e 3 - Construire avec l'IA", "9h00 - 12h30 (3h30)"))
story.append(Spacer(1, 6))

story.append(module_block(
    "J2-01", "R\u00e9activation J2", "15 min",
    [
        "Rappel visuel des 4 Piliers et de la m\u00e9thode C.R.T.F.",
        "Checklist rapide : les r\u00e9flexes \u00e0 avoir avant chaque interaction IA",
        "Quiz de r\u00e9activation (mesure de r\u00e9tention \u00e0 une semaine)",
    ],
    ["Quiz individuel", "\u00c9change collectif"],
    ["Quiz interactif via le Mentor IA (~15 min)"],
))

story.append(module_block(
    "J2-02", "Cr\u00e9er son Mentor IA", "2h15",
    [
        "Les 3 questions fondamentales : il fait quoi ? il sait quoi ? il ne fait pas quoi ?",
        "6 \u00e9tapes de construction : mission, contexte, garde-fous, test, it\u00e9ration, enrichissement",
        "Niveaux d'enrichissement : enrichir (documents), connecter (outils)",
        "Test crois\u00e9 en bin\u00f4me : v\u00e9rifier que le Mentor IA fonctionne pour un tiers",
    ],
    ["Grand atelier guid\u00e9", "Travail individuel + bin\u00f4me", "It\u00e9ration avec feedback"],
    ["Construction compl\u00e8te d'un Mentor IA m\u00e9tier (~2h)"],
))

story.append(module_block(
    "J2-03", "RAG et documents", "1h",
    [
        "Le mythe vs la r\u00e9alit\u00e9 : ce que le RAG fait vraiment",
        "4 niveaux de connexion aux documents",
        "La m\u00e9taphore de la biblioth\u00e9caire press\u00e9e",
        "4 r\u00e9flexes RAG + outils cl\u00e9s : NotebookLM et Perplexity",
    ],
    ["Expos\u00e9 + d\u00e9mo", "Exploration d'outils"],
    ["Tester NotebookLM et Perplexity sur ses propres documents (~40 min)"],
))

story.append(PageBreak())


story.append(Paragraph("Jour 2 (suite)", h1_ambre))
story.append(demi_journee_header("Demi-journ\u00e9e 4 - P\u00e9renniser", "13h30 - 17h00 (3h30)"))
story.append(Spacer(1, 6))

story.append(module_block(
    "J2-04", "S\u00e9curit\u00e9 IA en entreprise", "1h30",
    [
        "Du constat \u00e0 l'action : 3 risques organisationnels",
        "Les 5 blocs d'une charte IA d'entreprise",
        "7 r\u00e9flexes pour impl\u00e9menter une politique IA",
        "Ce que dit la loi (AI Act, RGPD - simplifi\u00e9)",
    ],
    ["Cas pratique en groupe", "R\u00e9daction individuelle"],
    ["R\u00e9diger les 10 lignes de sa charte IA d'entreprise (~45 min)"],
))

story.append(module_block(
    "J2-05", "Ma feuille de route", "1h30",
    [
        "Template 3 horizons : actions rapides, projets structurants, vision",
        "Les 3 douleurs \u00e0 identifier dans son quotidien",
        "Prompt de cadrage C.R.T.F. pour construire sa feuille de route avec l'IA",
        "Checklist r\u00e9capitulative de tous les r\u00e9flexes de la formation",
    ],
    ["Travail individuel guid\u00e9", "Dialogue avec le Mentor IA", "Partage collectif"],
    ["Construire sa feuille de route compl\u00e8te avec le Mentor IA (~1h)"],
))

story.append(module_block(
    "J2-06", "Cl\u00f4ture", "30 min",
    [
        "R\u00e9sum\u00e9 visuel des acquis : 4 Piliers + C.R.T.F.",
        "3 outils pour d\u00e9marrer : Projet Claude / GPT / Gem",
        "Questionnaire de satisfaction \u00e0 chaud",
    ],
    ["Synth\u00e8se collective", "Questionnaire individuel"],
    [],
))

story.append(Paragraph(
    "<i>Quiz Bilan Jour 2 envoy\u00e9 par email apr\u00e8s la s\u00e9ance (7 questions, ~10 min)<br/>"
    "Questionnaire de satisfaction compl\u00e9t\u00e9 sur place</i>", body))

# ============ BUILD ============
doc.build(story, onFirstPage=draw_page, onLaterPages=draw_page)
print("OK -> " + OUTPUT)
print("Size: %d bytes" % os.path.getsize(OUTPUT))
