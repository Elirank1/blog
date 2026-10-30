#!/usr/bin/env python3
"""Generate the 6 original diagrams for the essay, using Corpiler's documented
drawing-system grammar (viewBox 640x480, exact token colors, exact class
vocabulary from brand/05-drawing-system/DRAWING-SYSTEM.md and the sample SVGs
read directly from the brand kit). Not stock icons, not AI-generated images --
hand-composed SVG using the brand's own line-drawing vocabulary.
"""
import os

STYLE = """<style>
text{font-family:'JetBrains Mono',Menlo,monospace;fill:#5F5B52}
.t-ink{fill:#171614}
.cap{font-family:'IBM Plex Sans','IBM Plex Sans Hebrew',sans-serif}
.tag{font-weight:700}
.qm{font-family:'Instrument Serif',Georgia,serif;font-style:italic;fill:#5F5B52}
.k{stroke:#171614;fill:none;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}
.kf{stroke:#171614;fill:#EFEBE1;stroke-width:1.6;stroke-linejoin:round}
.inkf{fill:#171614;stroke:#171614;stroke-width:1.6;stroke-linejoin:round}
.inkf0{fill:#171614}
.g{stroke:#B4AEA1;fill:none;stroke-width:1.4;stroke-linecap:round;stroke-linejoin:round}
.gd{stroke:#B4AEA1;fill:none;stroke-width:1.8;stroke-dasharray:6 7;stroke-linecap:round}
.gd2{stroke:#B4AEA1;fill:none;stroke-width:1.2;stroke-dasharray:3 4}
.hatch{stroke:#B4AEA1;stroke-width:1}
.sq{fill:#E6E1D5}
.note{fill:#F2E9C6;stroke:#B4AEA1;stroke-width:1.2}
.yb{stroke:#A88C00;fill:none;stroke-width:7.5;stroke-linecap:round;stroke-linejoin:round}
.y{stroke:#FDD604;fill:none;stroke-width:4.6;stroke-linecap:round;stroke-linejoin:round}
.yd,.dot{fill:#FDD604;stroke:#A88C00;stroke-width:1.6}
.gate,.sign{fill:#EFEBE1;stroke:#171614;stroke-width:1.6}
.gate.unlit{fill:#E6E1D5;stroke:#B4AEA1}
.sign-v{fill:#5F5B52}
.eyebrow{font-family:'JetBrains Mono',Menlo,monospace;font-size:10px;letter-spacing:.4px;fill:#5F5B52}
.cap-label{font-family:'IBM Plex Sans','IBM Plex Sans Hebrew',sans-serif;font-size:12px;fill:#171614}
</style>"""

def svg(body, vb="0 0 640 480", title="Diagram", extra_style=""):
    return (
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="%s" role="img" '
        'aria-label="%s" style="width:100%%;height:auto;background:#EFEBE1;border:1px solid #D0CABD;border-radius:6px">'
        "%s<title>%s</title>%s</svg>" % (vb, title, STYLE + extra_style, title, body)
    )

OUT = os.path.dirname(os.path.abspath(__file__))

def write(name, content):
    path = os.path.join(OUT, name)
    with open(path, "w") as f:
        f.write(content)
    print("wrote", path, len(content), "bytes")

# ---------------------------------------------------------------------------
# Diagram 1 -- HERO: two labs converging on the same shape
# ---------------------------------------------------------------------------
d1 = """
<text x="32" y="36" class="eyebrow">01/06 · THE PATTERN</text>
<rect x="32" y="60" width="200" height="64" rx="6" class="kf"/>
<text x="132" y="97" text-anchor="middle" class="cap-label tag">ANTHROPIC</text>
<rect x="408" y="60" width="200" height="64" rx="6" class="kf"/>
<text x="508" y="97" text-anchor="middle" class="cap-label tag">OPENAI</text>
<path d="M132 124V220" class="yb"/><path d="M132 124V220" class="y"/>
<path d="M508 124V220" class="yb"/><path d="M508 124V220" class="y"/>
<path d="M132 220H508" class="yb"/><path d="M132 220H508" class="y"/>
<circle cx="320" cy="220" r="8" class="dot"/>
<rect x="190" y="252" width="260" height="76" rx="6" class="gate"/>
<text x="320" y="282" text-anchor="middle" class="cap-label tag">A DEPLOYMENT COMPANY</text>
<text x="320" y="302" text-anchor="middle" class="cap-label">Capital + credibility + FDEs</text>
<path d="M60 400H580" class="gd"/>
<text x="60" y="420" class="eyebrow">MODEL QUALITY -- NOT THE AXIS THIS ESSAY IS ABOUT</text>
<text x="32" y="460" class="cap-label" style="fill:#5F5B52">Two labs that compete on models built the same kind of company around them.</text>
"""
write("hero-two-labs.svg", svg(d1, title="Two labs, one shape"))

# ---------------------------------------------------------------------------
# Diagram 2 -- TIMELINE (section 1)
# ---------------------------------------------------------------------------
events = [
    ("MAR 12", "Claude Partner\nNetwork"),
    ("MAY 4", "Anthropic +\nPE consortium"),
    ("MAY 11", "OpenAI\nDeployment Co."),
    ("JUN 3", "Services\nTrack"),
    ("JUL 15", "Ode\nlaunches"),
    ("OCT 2", "Frontier\nAcademy"),
    ("OCT 23", "Anthropic +\nHg, reported"),
]
n = len(events)
x0, x1 = 40, 600
xs = [x0 + i * (x1 - x0) / (n - 1) for i in range(n)]
parts = ['<text x="40" y="36" class="eyebrow">02/06 · SEVEN EVENTS, EIGHT MONTHS</text>']
parts.append('<path d="M%d 220H%d" class="g"/>' % (x0, x1))
for i, (date, label) in enumerate(events):
    x = xs[i]
    y_label = 160 if i % 2 == 0 else 280
    y_tick = 220
    dashed = 'class="gd2"' if i == n - 1 else 'class="g"'
    dotcls = "dot" if i < n - 1 else "yd"
    parts.append('<path d="M%.1f %dV%d" %s/>' % (x, y_label + (18 if i % 2 == 0 else -6), y_tick, dashed))
    parts.append('<circle cx="%.1f" cy="%d" r="6" class="%s"/>' % (x, y_tick, dotcls))
    lines = label.split("\n")
    ly = y_label if i % 2 == 0 else y_label + 14
    for j, ln in enumerate(lines):
        parts.append('<text x="%.1f" y="%d" text-anchor="middle" class="cap-label">%s</text>' % (x, ly + j * 14, ln))
    parts.append('<text x="%.1f" y="%d" text-anchor="middle" class="eyebrow">%s</text>' % (x, 236 if i % 2 == 0 else 206, date))
parts.append('<text x="40" y="440" class="cap-label" style="fill:#5F5B52">Last point reported via secondary coverage, not confirmed by either company -- drawn as a lighter tick.</text>')
write("timeline.svg", svg("\n".join(parts), title="Seven events, eight months"))

# ---------------------------------------------------------------------------
# Diagram 3 -- THREE-PART MODEL (section 3)
# ---------------------------------------------------------------------------
d3 = """
<text x="32" y="36" class="eyebrow">03/06 · THREE PARTS, ONE EACH</text>
<rect x="40" y="76" width="192" height="88" rx="6" class="kf"/>
<text x="136" y="112" text-anchor="middle" class="cap-label tag">FRONTIER LABS</text>
<text x="136" y="132" text-anchor="middle" class="cap-label">Technology + credibility</text>
<rect x="408" y="76" width="192" height="88" rx="6" class="kf"/>
<text x="504" y="112" text-anchor="middle" class="cap-label tag">PRIVATE EQUITY</text>
<text x="504" y="132" text-anchor="middle" class="cap-label">Capital + access channel</text>
<rect x="224" y="300" width="192" height="88" rx="6" class="kf"/>
<text x="320" y="336" text-anchor="middle" class="cap-label tag">DEPLOYMENT OPS</text>
<text x="320" y="356" text-anchor="middle" class="cap-label">FDEs who've done it before</text>
<path d="M136 164V240H320V300" class="yb"/><path d="M136 164V240H320V300" class="y"/>
<path d="M504 164V240H320V300" class="yb"/><path d="M504 164V240H320V300" class="y"/>
<circle cx="320" cy="240" r="9" class="gate"/>
<circle cx="136" cy="164" r="6" class="dot"/><circle cx="504" cy="164" r="6" class="dot"/><circle cx="320" cy="300" r="6" class="dot"/>
<text x="32" y="440" class="cap-label" style="fill:#5F5B52">Each side supplies the one asset it has a real advantage in. Why that's the logic is my reading, not theirs.</text>
"""
write("three-part-model.svg", svg(d3, title="Three parts, one each"))

# ---------------------------------------------------------------------------
# Diagram 4 -- FDE WORKFLOW (section 4)
# ---------------------------------------------------------------------------
stages = ["DISCOVERY", "JUDGMENT", "FEASIBILITY", "PROOF", "OPERATION", "LEARNING"]
bw, gap = 88, 14
total = bw * 6 + gap * 5
sx = (640 - total) / 2
parts4 = ['<text x="32" y="36" class="eyebrow">04/06 · WHAT AN FDE ENGAGEMENT MOVES THROUGH</text>']
for i, s in enumerate(stages):
    x = sx + i * (bw + gap)
    is_gate = s in ("DISCOVERY", "JUDGMENT")
    cls = "gate" if is_gate else "kf"
    parts4.append('<rect x="%.1f" y="180" width="%d" height="100" rx="6" class="%s"/>' % (x, bw, cls))
    words = s
    parts4.append('<text x="%.1f" y="222" text-anchor="middle" class="cap-label tag" style="font-size:11px">%s</text>' % (x + bw / 2, words))
    if is_gate:
        parts4.append('<circle cx="%.1f" cy="245" r="6" class="dot"/>' % (x + bw / 2))
        parts4.append('<text x="%.1f" y="266" text-anchor="middle" class="eyebrow" style="font-size:8px">HUMAN AUTHORITY</text>' % (x + bw / 2))
    if s == "LEARNING":
        parts4.append('<text x="%.1f" y="258" text-anchor="middle" class="qm" font-size="22">?</text>' % (x + bw / 2))
    if i < 5:
        xa = x + bw
        parts4.append('<path d="M%.1f 230H%.1f" class="k"/>' % (xa, xa + gap))
        parts4.append('<path d="M%.1f 225l6 5l-6 5" class="k"/>' % (xa + gap - 6))
parts4.append('<text x="32" y="420" class="cap-label" style="fill:#5F5B52">Discovery and judgment: no shipping product claims to replace a human here yet.</text>')
parts4.append('<text x="32" y="440" class="cap-label" style="fill:#5F5B52">Proof and operation: partly automated today, in shipping product (section 6).</text>')
write("fde-workflow.svg", svg("\n".join(parts4), title="What an FDE engagement moves through"))

# ---------------------------------------------------------------------------
# Diagram 5 -- ECONOMICS (section 5) -- explicitly illustrative, not data
# ---------------------------------------------------------------------------
lines_cost = [
    ("Expert intervention hours", 92),
    ("Implementation effort", 74),
    ("QA and validation", 58),
    ("Rework", 46),
    ("Customer-specific integration", 50),
    ("Model and tool cost", 22),
]
maxw = 360
parts5 = ['<text x="32" y="34" class="eyebrow">05/06 · SIX COST LINES, ILLUSTRATIVE ONLY</text>']
parts5.append('<text x="32" y="54" class="eyebrow" style="fill:#A88C00">NOT ACTUAL COMPANY DATA -- NO COMPANY HAS PUBLISHED THIS</text>')
y = 86
for label, pct in lines_cost:
    w = maxw * pct / 100
    parts5.append('<text x="32" y="%d" class="cap-label">%s</text>' % (y + 14, label))
    parts5.append('<rect x="260" y="%d" width="%d" height="22" rx="3" class="kf"/>' % (y, w))
    y += 46
parts5.append('<path d="M32 %dH610" class="gd2"/>' % (y + 6))
parts5.append('<text x="32" y="%d" class="cap-label" style="fill:#5F5B52">Bar length = the author\'s own relative guess (section 5). No units -- no company publishes this.</text>' % (y + 32))
write("economics-illustrative.svg", svg("\n".join(parts5), title="Six cost lines, illustrative only"))

# ---------------------------------------------------------------------------
# Diagram 6 -- FOUR LEVELS / next layer (section 8)
# ---------------------------------------------------------------------------
levels = [
    (1, "CODE & TEMPLATE REUSE", "kf", False),
    (2, "DELIVERY-PROCESS REUSE", "kf", False),
    (3, "DECISION-MECHANISM REUSE", "kf", True),
    (4, "ORGANIZATIONAL RECOMPILATION", "gd-box", False),
]
parts6 = ['<text x="32" y="34" class="eyebrow">06/06 · THE FOUR LEVELS</text>']
lw, lh, gap, lx = 330, 76, 18, 70
ly = 430  # bottom edge of level 1 (bottom-most box)
rotations = [-0.5, 0.9, -1.1, 0.7]
for i, (num, label, cls, dashed_edge) in enumerate(levels):
    y = ly - lh - i * (lh + gap)
    rot = rotations[i]
    if cls == "gd-box":
        rect_cls = "class=\"gate unlit\" stroke-dasharray=\"6 5\""
    else:
        rect_cls = 'class="kf"'
    parts6.append('<g transform="rotate(%.1f %d %d)">' % (rot, lx + lw / 2, y + lh / 2))
    parts6.append('<rect x="%d" y="%d" width="%d" height="%d" rx="6" %s/>' % (lx, y, lw, lh, rect_cls))
    parts6.append('<text x="%d" y="%d" class="eyebrow" style="font-size:9px">LEVEL %d</text>' % (lx + 16, y + 26, num))
    parts6.append('<text x="%d" y="%d" class="cap-label tag" style="font-size:12px">%s</text>' % (lx + 16, y + 50, label))
    parts6.append("</g>")
# the yellow dot marking "frontier of reliable reuse today" between level 2 (i=1) and level 3 (i=2)
boundary_y = ly - lh - 1 * (lh + gap)  # top edge of level 2's box == boundary with level 3 above it
dot_x = lx + lw + 36
parts6.append('<circle cx="%d" cy="%d" r="8" class="dot"/>' % (dot_x, boundary_y))
parts6.append('<text x="%d" y="%d" class="eyebrow" style="font-size:8px">WHERE RELIABLE</text>' % (dot_x + 14, boundary_y - 4))
parts6.append('<text x="%d" y="%d" class="eyebrow" style="font-size:8px">REUSE STOPS</text>' % (dot_x + 14, boundary_y + 8))
parts6.append('<text x="%d" y="%d" class="eyebrow" style="font-size:8px">TODAY</text>' % (dot_x + 14, boundary_y + 20))
parts6.append('<text x="32" y="460" class="cap-label" style="fill:#5F5B52">Level 4 is drawn unlit: not demonstrated as software by anyone, including the author.</text>')
write("four-levels.svg", svg("\n".join(parts6), title="The four levels"))

print("done")
