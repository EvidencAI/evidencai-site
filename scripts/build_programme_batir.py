"""
Genere le PDF Qualiopi programme "Batir avec Claude" - meme style que Decider.
Sortie : public/downloads/programme-qualiopi-batir-avec-claude.pdf
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

OUTPUT = "/Users/stephanecommenge/Claude-Dev/EvidencIA-site/public/downloads/programme-qualiopi-batir-avec-claude.pdf"


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
        "EvidencAI - Programme pedagogique - Batir avec Claude")
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
    title="Programme Qualiopi - Batir avec Claude",
    author="EvidencAI - ALIA Formation",
    subject="Programme pedagogique detaille",
)

story = []


# ============ PAGE 1 ============
story.append(Paragraph("Programme pedagogique detaille", subtitle_main))
story.append(Paragraph("B\u00e2tir avec Claude", title_main))
story.append(Paragraph("De l'utilisateur au pilote, du pilote \u00e0 l'architecte", subtitle_main))

story.append(Paragraph("Informations g\u00e9n\u00e9rales", h1_ambre))
story.append(info_row("Dur\u00e9e", "2 jours (14 heures) - J1 + J2 espac\u00e9s d'une semaine"))
story.append(info_row("Public vis\u00e9", "Dirigeants, professionnels et utilisateurs avanc\u00e9s souhaitant passer de l'usage \u00e0 la construction"))
story.append(info_row("Pr\u00e9requis", "Utiliser Claude r\u00e9guli\u00e8rement depuis au moins 1 mois. Abonnement Claude Pro ou Team actif. Ordinateur portable. Questionnaire de pr\u00e9-formation compl\u00e9t\u00e9."))
story.append(info_row("Lieu", "En pr\u00e9sentiel (Valence, 26)"))
story.append(info_row("Effectif", "8 participants maximum"))
story.append(info_row("Formateur", "St\u00e9phane Commenge"))
story.append(info_row("Tarif", "960 \u20ac HT par participant"))
story.append(info_row("Certification", "Formation certifi\u00e9e Qualiopi via ALIA Formation"))

story.append(Spacer(1, 14))
story.append(Paragraph("Objectifs p\u00e9dagogiques", h1_ambre))
story.append(Paragraph("\u00c0 l'issue de la formation, le participant sera capable de :", body))
story.append(Spacer(1, 4))

objectifs = [
    "Structurer la m\u00e9moire de Claude (pr\u00e9f\u00e9rences, projets Cowork, consignes) pour un partenariat persistant qui n'oublie plus le contexte.",
    "Pratiquer la m\u00e9thode du dialogue : co-construire, it\u00e9rer, challenger ses choix avec Claude comme pair qui \u00e9prouve la r\u00e9flexion.",
    "Concevoir, tester et activer des skills personnalis\u00e9s qui transforment les processus m\u00e9tier r\u00e9currents en briques r\u00e9activables.",
    "Connecter Claude \u00e0 ses outils et \u00e0 ses donn\u00e9es via les connecteurs MCP et les t\u00e2ches programm\u00e9es pour automatiser les workflows.",
    "Assembler skills, connecteurs et m\u00e9moire dans un plugin m\u00e9tier autonome, d\u00e9di\u00e9 \u00e0 son domaine et ses donn\u00e9es.",
    "Utiliser Claude Code pour construire des outils sur mesure qui n'existaient nulle part ailleurs, sans pr\u00e9requis de d\u00e9veloppement.",
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
    "<b>Le formateur (St\u00e9phane)</b> : ouvre son propre atelier en transparence totale. "
    "Environnement r\u00e9el, plugins en production (Mon Greffier, Mnemos), m\u00e9thode \u00e0 l'\u0153uvre "
    "devant les participants. Pas de d\u00e9mo rod\u00e9e : le chantier tel qu'il est.", body_just))
story.append(Spacer(1, 4))
story.append(Paragraph(
    "<b>Votre Mentor IA (projet Claude)</b> : chaque participant re\u00e7oit d\u00e8s l'ouverture son propre outil IA "
    "pr\u00e9par\u00e9 pour la session. Il embarque tous les cours et la m\u00e9thode, assiste pendant la formation, "
    "et reste actif apr\u00e8s. Pendant les deux jours, les participants apprennent \u00e0 en construire d'autres, "
    "calibr\u00e9s sur leurs besoins m\u00e9tier.", body_just))
story.append(Spacer(1, 4))
story.append(Paragraph(
    "<b>Az, l'IA co-architecte</b> : intelligence artificielle int\u00e9gr\u00e9e au cockpit de formation. "
    "Elle intervient en live, challenge les choix, propose des angles inattendus, pousse \u00e0 it\u00e9rer. "
    "Le miroir qui \u00e9prouve les r\u00e9flexions, en temps r\u00e9el, devant tout le monde.", body_just))
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
    "Suivi post-formation \u00e0 froid (J+30) : quels skills utilis\u00e9s ? Quelles automatisations op\u00e9rationnelles ?",
]:
    story.append(Paragraph("<font color='#D97706'>&bull;</font> " + item, body))
    story.append(Spacer(1, 3))


story.append(Spacer(1, 14))
story.append(Paragraph("Les 5 piliers du b\u00e2tisseur", h1_ambre))
story.append(Paragraph(
    "Cinq outils Claude \u00e0 ma\u00eetriser. Ensemble, ils font tenir l'\u00e9difice. "
    "Aucun ne rend d\u00e9veloppeur. Tous rendent autonome.", body_just))
story.append(Spacer(1, 4))

piliers = [
    ("01", "M\u00e9moire", "Claude vous reconna\u00eet. Pr\u00e9f\u00e9rences, contexte, historique utile : vous ne repartez plus de z\u00e9ro."),
    ("02", "Projet", "Claude habite un espace. Cowork, base de connaissances, consignes : un atelier structur\u00e9."),
    ("03", "Skill", "Claude fait sans que vous y pensiez. Chaque processus m\u00e9tier r\u00e9current devient une brique r\u00e9activable."),
    ("04", "Plugin", "Claude devient un outil m\u00e9tier. Vous assemblez vos briques en \u00e9difice, connect\u00e9 \u00e0 vos donn\u00e9es."),
    ("05", "Claude Code", "Claude construit avec vous. Pas besoin de coder : vous savez quoi demander."),
]
for num, titre, texte in piliers:
    story.append(Paragraph(
        "<font color='#D97706'><b>%s - %s</b></font>  %s" % (num, titre, texte), body_just))
    story.append(Spacer(1, 3))

story.append(PageBreak())


# ============ JOUR 1 ============
story.append(Paragraph("Jour 1 - Structurer son intelligence", h1_ambre))
story.append(Paragraph(
    "Poser les fondations du partenariat : la m\u00e9moire qui dure, la m\u00e9thode du dialogue "
    "qui fait de Claude un pair, les skills qui capitalisent ce qui marche.", body_just))
story.append(Spacer(1, 10))

story.append(demi_journee_header("Demi-journ\u00e9e 1 - M\u00e9moire et m\u00e9thode", "9h00 - 12h30 (3h30)"))
story.append(Spacer(1, 6))

story.append(module_block(
    "J1-01", "Embarquement", "30 min",
    [
        "Pr\u00e9sentation du formateur, du dispositif et des objectifs",
        "D\u00e9couverte du trio : St\u00e9phane + Mentor IA personnel + Az (co-architecte)",
        "Activation du Mentor IA personnel de chaque participant",
        "Prise en main du cockpit de formation et du support interactif",
    ],
    ["Mise en situation imm\u00e9diate", "P\u00e9dagogie par l'exp\u00e9rience"],
    ["Premier dialogue avec son Mentor IA (~15 min)"],
))

story.append(module_block(
    "J1-02", "Pilier 1 - La m\u00e9moire qui dure", "1h30",
    [
        "Les 3 couches de m\u00e9moire Claude : fil, pr\u00e9f\u00e9rences, projet",
        "Configuration avanc\u00e9e des pr\u00e9f\u00e9rences : comment parler, quoi ne pas dire",
        "Le projet Cowork : espace de travail, base de connaissances, consignes",
        "M\u00e9moire contextuelle : ce qui se transmet, ce qui se perd, ce qui s'archive",
    ],
    ["Expos\u00e9 + d\u00e9mo en direct", "Configuration guid\u00e9e", "Travail individuel"],
    [
        "Configurer ses pr\u00e9f\u00e9rences Claude (~20 min)",
        "Cr\u00e9er et peupler son premier Projet Cowork m\u00e9tier (~30 min)",
    ],
))

story.append(module_block(
    "J1-03", "Pilier 2 - Le projet et la m\u00e9thode du dialogue", "1h30",
    [
        "Penser avec Claude, pas lui demander : la posture qui change tout",
        "Les 4 gestes du b\u00e2tisseur : structurer, co-construire, automatiser, \u00e9tendre",
        "Le dialogue comme m\u00e9thode : it\u00e9rer, challenger, \u00e9prouver ses choix",
        "Garder la pens\u00e9e, d\u00e9l\u00e9guer la plume : o\u00f9 s'arr\u00eate le pilote",
    ],
    ["D\u00e9monstration live", "Cas pratique dirigeant", "Atelier bin\u00f4me"],
    [
        "Mener un vrai arbitrage m\u00e9tier en dialogue avec Claude (~30 min)",
        "Faire challenger une d\u00e9cision d\u00e9j\u00e0 prise (~20 min)",
    ],
))

story.append(PageBreak())


story.append(Paragraph("Jour 1 (suite)", h1_ambre))
story.append(demi_journee_header("Demi-journ\u00e9e 2 - Skills et artifacts", "13h30 - 17h00 (3h30)"))
story.append(Spacer(1, 6))

story.append(module_block(
    "J1-04", "Pilier 3 - Concevoir et activer un skill", "2h",
    [
        "Qu'est-ce qu'un skill : la capacit\u00e9 m\u00e9tier r\u00e9activable par un mot",
        "Anatomie d'un skill : triggers, prompt syst\u00e8me, ressources, garde-fous",
        "Atelier : identifier un processus m\u00e9tier r\u00e9current \u00e0 capitaliser",
        "Construction, activation et test crois\u00e9 en bin\u00f4me",
        "It\u00e9ration : un skill ne fonctionne jamais du premier coup",
    ],
    ["Grand atelier guid\u00e9", "It\u00e9ration par paire", "Feedback structur\u00e9"],
    [
        "Cartographier 3 processus m\u00e9tier r\u00e9currents (~15 min)",
        "Construire un skill complet sur l'un d'eux (~1h15)",
        "Test crois\u00e9 en bin\u00f4me (~25 min)",
    ],
))

story.append(module_block(
    "J1-05", "Artifacts et biblioth\u00e8ques", "1h",
    [
        "Les artifacts Claude : objets r\u00e9utilisables, persistants, partageables",
        "Construire une biblioth\u00e8que personnelle : prompts, templates, skills",
        "Capitaliser ce qui marche, archiver ce qui ne marche pas",
        "L'atelier qui grossit au lieu du classeur qui prend la poussi\u00e8re",
    ],
    ["Exploration d'outils", "Organisation personnelle"],
    [
        "Construire sa biblioth\u00e8que de prompts structur\u00e9s (~25 min)",
        "Cr\u00e9er et publier un artifact r\u00e9utilisable (~20 min)",
    ],
))

story.append(module_block(
    "J1-06", "Cl\u00f4ture Jour 1 et feuille de route d'intersession", "30 min",
    [
        "R\u00e9capitulatif des 3 premiers piliers : m\u00e9moire, projet, skill",
        "Feuille de route d'intersession : ce que chaque participant va tester sur 7 jours",
        "Quiz bilan du Jour 1 envoy\u00e9 par email",
    ],
    ["Synth\u00e8se collective", "Engagement individuel"],
    ["R\u00e9diger ses 3 objectifs d'intersession avec son Mentor IA (~15 min)"],
))

story.append(Paragraph(
    "<i>Quiz Bilan Jour 1 envoy\u00e9 par email apr\u00e8s la s\u00e9ance (7 questions, ~10 min)</i>",
    body))
story.append(PageBreak())


# ============ JOUR 2 ============
story.append(Paragraph("Jour 2 - Automatiser son intelligence", h1_ambre))
story.append(Paragraph(
    "Une semaine apr\u00e8s le Jour 1 - mesure de la r\u00e9tention, puis passage \u00e0 l'\u00e9chelle. "
    "Les connecteurs ancrent Claude dans la r\u00e9alit\u00e9 m\u00e9tier, les plugins assemblent les briques, "
    "Claude Code ouvre le champ du possible.", body_just))
story.append(Spacer(1, 10))

story.append(demi_journee_header("Demi-journ\u00e9e 3 - Connecteurs et automatisation", "9h00 - 12h30 (3h30)"))
story.append(Spacer(1, 6))

story.append(module_block(
    "J2-01", "R\u00e9activation Jour 2", "15 min",
    [
        "Rappel visuel des 3 piliers vus en J1 : m\u00e9moire, projet, skill",
        "Retour d'exp\u00e9rience d'intersession : ce qui a tenu, ce qui a cass\u00e9",
        "Quiz de r\u00e9activation (mesure de r\u00e9tention \u00e0 une semaine)",
    ],
    ["Quiz individuel", "\u00c9change collectif"],
    ["Quiz interactif via le Mentor IA (~10 min)"],
))

story.append(module_block(
    "J2-02", "Pilier 4 - Connecteurs m\u00e9tier (MCP)", "1h45",
    [
        "MCP (Model Context Protocol) : comment Claude dialogue avec vos outils",
        "Panorama des connecteurs disponibles : Google Workspace, Notion, GitHub, SQL",
        "Configuration d'un connecteur : permissions, scopes, s\u00e9curit\u00e9 des donn\u00e9es",
        "Un skill devient puissant quand il agit sur de vraies donn\u00e9es",
    ],
    ["Expos\u00e9 + d\u00e9mo", "Configuration guid\u00e9e", "S\u00e9curit\u00e9-first"],
    [
        "Connecter son Cowork \u00e0 un outil m\u00e9tier (~40 min)",
        "Construire un skill qui exploite le connecteur (~40 min)",
    ],
))

story.append(module_block(
    "J2-03", "T\u00e2ches programm\u00e9es et workflows r\u00e9currents", "1h30",
    [
        "Du skill manuel \u00e0 la t\u00e2che automatis\u00e9e : qu'est-ce qui tourne tout seul ?",
        "Planification : quotidien, hebdomadaire, d\u00e9clench\u00e9 par \u00e9v\u00e9nement",
        "Workflows compos\u00e9s : encha\u00eener plusieurs skills",
        "Ce que vous refaisiez chaque vendredi tourne d\u00e9sormais toutes les nuits",
    ],
    ["D\u00e9mo live", "Atelier construction", "Mise en production"],
    [
        "Identifier 2 t\u00e2ches hebdomadaires \u00e0 automatiser (~15 min)",
        "Programmer et activer la premi\u00e8re t\u00e2che (~45 min)",
    ],
))

story.append(PageBreak())


story.append(Paragraph("Jour 2 (suite)", h1_ambre))
story.append(demi_journee_header("Demi-journ\u00e9e 4 - Plugins et Claude Code", "13h30 - 17h00 (3h30)"))
story.append(Spacer(1, 6))

story.append(module_block(
    "J2-04", "Pilier 4 (suite) - Plugins et \u00e9cosyst\u00e8me", "1h30",
    [
        "Qu'est-ce qu'un plugin : skills + connecteurs + m\u00e9moire pour un m\u00e9tier",
        "D\u00e9monstration de plugins en production : Mon Greffier, Mnemos",
        "Architecture d'un plugin m\u00e9tier : p\u00e9rim\u00e8tre, utilisateurs, donn\u00e9es, garde-fous",
        "Packaging, distribution interne, maintenance",
    ],
    ["\u00c9tude de cas live", "Atelier architecture", "Pair design"],
    [
        "Esquisser l'architecture d'un plugin m\u00e9tier (~40 min)",
        "Valider les choix avec le Mentor IA puis un pair (~25 min)",
    ],
))

story.append(module_block(
    "J2-05", "Pilier 5 - Claude Code, le champ du possible", "1h30",
    [
        "Claude Code : Claude qui \u00e9crit du code, vous qui dirigez",
        "Ce que \u00e7a rend possible : outils internes, scripts m\u00e9tier, prototypes",
        "La posture : savoir quoi demander, pas savoir coder",
        "D\u00e9monstration live : construire un outil m\u00e9tier en direct",
        "Garde-fous : quand Claude Code suffit, quand il faut un vrai d\u00e9veloppeur",
    ],
    ["D\u00e9monstration live", "Exploration guid\u00e9e", "Cas d'usage dirigeant"],
    [
        "Sp\u00e9cifier un mini-outil m\u00e9tier pour soi (~20 min)",
        "Lancer la construction avec Claude Code, it\u00e9rer (~45 min)",
    ],
))

story.append(module_block(
    "J2-06", "Cl\u00f4ture - Votre atelier continue", "30 min",
    [
        "R\u00e9capitulatif des 5 piliers : m\u00e9moire, projet, skill, plugin, Claude Code",
        "Feuille de route \u00e0 30 jours : ce qui va tourner, ce qui reste \u00e0 b\u00e2tir",
        "Rappel sur le Mentor IA enrichi : il reste avec vous",
        "Questionnaire de satisfaction compl\u00e9t\u00e9 sur place",
    ],
    ["Synth\u00e8se collective", "Engagement individuel", "\u00c9valuation"],
    ["\u00c9crire sa feuille de route J+30 avec son Mentor IA (~20 min)"],
))

story.append(Paragraph(
    "<i>Quiz Bilan Jour 2 envoy\u00e9 par email apr\u00e8s la s\u00e9ance (7 questions, ~10 min)<br/>"
    "Questionnaire de satisfaction compl\u00e9t\u00e9 sur place<br/>"
    "Suivi post-formation \u00e0 J+30 pour mesurer l'impact r\u00e9el</i>", body))

# ============ BUILD ============
doc.build(story, onFirstPage=draw_page, onLaterPages=draw_page)
print("OK -> " + OUTPUT)
print("Size: %d bytes" % os.path.getsize(OUTPUT))
