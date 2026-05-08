#!/usr/bin/env python3
"""Build the slides static site for GitHub Pages from `slide/`.

Output goes to `_site/` and is structured as:

    _site/
        index.html              # 섹션 인덱스
        section-XX-*.html       # 개별 슬라이드
        images/                 # 이미지 자산
"""
from __future__ import annotations

import re
import shutil
from html import escape
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "slide"
OUT = ROOT / "_site"

LECTURE_TITLE = "Claude Code 기초 및 활용"
LECTURE_SUBTITLE = "튜토리얼 에디션 — 워크플로우, 팀 규칙, 플러그인, 하네스"

TITLE_RE = re.compile(r"<title>(.*?)</title>", re.IGNORECASE | re.DOTALL)


def extract_title(html_path: Path) -> str:
    text = html_path.read_text(encoding="utf-8", errors="replace")
    m = TITLE_RE.search(text)
    return m.group(1).strip() if m else html_path.stem


def discover_sections(src_dir: Path) -> list[tuple[str, str]]:
    items: list[tuple[int, str, str]] = []
    for f in sorted(src_dir.glob("section-*.html")):
        m = re.match(r"section-(\d+)", f.name)
        n = int(m.group(1)) if m else 999
        items.append((n, f.name, extract_title(f)))
    items.sort(key=lambda t: t[0])
    return [(name, title) for _, name, title in items]


BASE_STYLE = """
:root {
    --bg-primary: #F7F3EE;
    --bg-secondary: #EDE8E0;
    --bg-card: #FFFFFF;
    --text-primary: #1A1A1A;
    --text-secondary: #6B6560;
    --accent: #D97706;
    --accent-secondary: #B45309;
    --border: rgba(180, 83, 9, 0.35);
    --shadow: 0 1px 2px rgba(0,0,0,0.04), 0 8px 24px rgba(180,83,9,0.06);
}
* { box-sizing: border-box; }
html, body {
    margin: 0;
    padding: 0;
    background: var(--bg-primary);
    color: var(--text-primary);
    font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
    -webkit-font-smoothing: antialiased;
}
.page {
    max-width: 880px;
    margin: 0 auto;
    padding: 4rem 1.5rem 6rem;
}
header.hero {
    margin-bottom: 3rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid var(--border);
}
.eyebrow {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.85rem;
    color: var(--accent-secondary);
    text-transform: uppercase;
    letter-spacing: 0.12em;
    margin-bottom: 0.75rem;
}
h1 {
    font-family: 'Outfit', 'Plus Jakarta Sans', sans-serif;
    font-weight: 600;
    font-size: clamp(1.8rem, 4vw, 2.6rem);
    margin: 0 0 0.5rem;
    letter-spacing: -0.01em;
}
.subtitle {
    color: var(--text-secondary);
    font-size: 1.05rem;
    margin: 0;
}
.list {
    display: grid;
    gap: 0.75rem;
}
a.card {
    display: block;
    padding: 1.25rem 1.5rem;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 12px;
    text-decoration: none;
    color: inherit;
    transition: transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease;
    box-shadow: var(--shadow);
}
a.card:hover {
    transform: translateY(-1px);
    border-color: var(--accent);
}
.card-row {
    display: flex;
    align-items: baseline;
    gap: 1rem;
}
.card-num {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.85rem;
    color: var(--accent-secondary);
    min-width: 2.5em;
}
.card-title {
    font-family: 'Outfit', 'Plus Jakarta Sans', sans-serif;
    font-weight: 500;
    font-size: 1.15rem;
}
footer {
    margin-top: 4rem;
    padding-top: 2rem;
    border-top: 1px solid var(--border);
    color: var(--text-secondary);
    font-size: 0.85rem;
}
footer a { color: var(--accent-secondary); }
""".strip()


HEAD = """<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{title}</title>
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
{style}
</style>
</head>
<body>
<div class="page">
"""

FOOT = """
<footer>
GitHub: <a href="https://github.com/hackurity01/claude-code-example">hackurity01/claude-code-example</a>
</footer>
</div>
</body>
</html>
"""


def render_index(sections: list[tuple[str, str]]) -> str:
    items = []
    for filename, title in sections:
        m = re.match(r"Section\s+(\d+)\s*:\s*(.*)", title)
        if m:
            num, label = m.group(1), m.group(2).strip()
        else:
            num, label = "", title
        items.append(
            f'<a class="card" href="./{escape(filename)}">'
            f'<div class="card-row">'
            f'<span class="card-num">{escape(num.zfill(2)) if num else ""}</span>'
            f'<span class="card-title">{escape(label)}</span>'
            f'</div>'
            f'</a>'
        )
    body = f"""
<header class="hero">
    <div class="eyebrow">Lecture · 2h</div>
    <h1>{escape(LECTURE_TITLE)}</h1>
    <p class="subtitle">{escape(LECTURE_SUBTITLE)}</p>
</header>
<div class="list">
{chr(10).join(items)}
</div>
"""
    return HEAD.format(title=f"{LECTURE_TITLE} — 섹션 인덱스", style=BASE_STYLE) + body + FOOT


def main() -> None:
    if OUT.exists():
        shutil.rmtree(OUT)
    OUT.mkdir(parents=True)

    for f in sorted(SRC.glob("section-*.html")):
        shutil.copy2(f, OUT / f.name)

    images_src = SRC / "images"
    if images_src.is_dir():
        shutil.copytree(images_src, OUT / "images")

    sections = discover_sections(SRC)
    if not sections:
        raise SystemExit(f"no section-*.html found in {SRC}")
    (OUT / "index.html").write_text(render_index(sections), encoding="utf-8")
    (OUT / ".nojekyll").write_text("", encoding="utf-8")

    print(f"built _site/ with {len(sections)} sections")


if __name__ == "__main__":
    main()
