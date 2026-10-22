"""Generate all raster assets for the portfolio site.

Run from the project root:  python3 scripts/generate_images.py

Outputs (PNG):
  public/images/profile.png          900x900   avatar used on Home + About
  public/images/og.png              1200x630   Open Graph social card
  public/images/workspace.png       1200x800   About page illustration
  public/images/projects/*.png      1200x800   project thumbnails
"""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "images"

FONT_BOLD = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
FONT_REGULAR = "/System/Library/Fonts/Supplemental/Arial.ttf"


def font(size: int, bold: bool = True) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(FONT_BOLD if bold else FONT_REGULAR, size)


def hex_rgb(value: str) -> tuple[int, int, int]:
    value = value.lstrip("#")
    return tuple(int(value[i : i + 2], 16) for i in (0, 2, 4))


def diagonal_gradient(size: tuple[int, int], top: str, bottom: str) -> Image.Image:
    """Bilinear diagonal gradient built from a 2x2 seed image."""
    seed = Image.new("RGB", (2, 2))
    c1, c2 = hex_rgb(top), hex_rgb(bottom)
    mid = tuple((a + b) // 2 for a, b in zip(c1, c2))
    seed.putpixel((0, 0), c1)
    seed.putpixel((1, 0), mid)
    seed.putpixel((0, 1), mid)
    seed.putpixel((1, 1), c2)
    return seed.resize(size, Image.BICUBIC)


def soft_blob(
    base: Image.Image, center: tuple[int, int], radius: int, color: str, alpha: int, blur: int = 60
) -> None:
    """Composite a blurred translucent circle onto the base image.

    Note: ImageDraw must paint on an RGB base with mode="RGBA" (or on a fresh
    RGBA layer that is pasted with its own mask) — drawing directly onto an
    RGBA image replaces pixels instead of alpha-blending them.
    """
    layer = Image.new("RGBA", base.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer)
    cx, cy = center
    draw.ellipse([cx - radius, cy - radius, cx + radius, cy + radius], fill=(*hex_rgb(color), alpha))
    layer = layer.filter(ImageFilter.GaussianBlur(blur))
    base.paste(layer, (0, 0), layer)


def draw_window(draw: ImageDraw.ImageDraw, box: tuple[int, int, int, int]) -> None:
    """A translucent 'app window' motif with a mini chart inside."""
    x1, y1, x2, y2 = box
    draw.rounded_rectangle(box, radius=28, fill=(255, 255, 255, 46), outline=(255, 255, 255, 90), width=3)
    bar_y = y1 + 58
    draw.rounded_rectangle([x1, y1, x2, bar_y], radius=28, fill=(255, 255, 255, 34))
    draw.rectangle([x1, bar_y - 30, x2, bar_y], fill=(255, 255, 255, 34))
    for i in range(3):
        cx = x1 + 42 + i * 38
        draw.ellipse([cx - 11, y1 + 18, cx + 11, y1 + 40], fill=(255, 255, 255, 170))
    draw.rounded_rectangle([x1 + 34, bar_y + 30, x1 + 190, y2 - 34], radius=16, fill=(255, 255, 255, 34))
    for i in range(4):
        ly = bar_y + 62 + i * 46
        draw.rounded_rectangle([x1 + 58, ly, x1 + 166, ly + 16], radius=8, fill=(255, 255, 255, 90))
    base_x = x1 + 240
    baseline = y2 - 46
    heights = [90, 150, 120, 210, 175, 250, 205]
    for i, h in enumerate(heights):
        bx = base_x + i * 88
        draw.rounded_rectangle([bx, baseline - h, bx + 56, baseline], radius=12, fill=(255, 255, 255, 120))
    draw.line([base_x, baseline + 14, x2 - 40, baseline + 14], fill=(255, 255, 255, 140), width=4)



def project_card(name: str, category: str, top: str, bottom: str, filename: str) -> None:
    w, h = 1200, 800
    img = diagonal_gradient((w, h), top, bottom)
    soft_blob(img, (1020, 140), 320, "#ffffff", 46)
    soft_blob(img, (140, 700), 280, "#ffffff", 38)
    soft_blob(img, (900, 720), 220, "#000000", 30)
    draw = ImageDraw.Draw(img, "RGBA")
    draw_window(draw, (150, 80, 1050, 520))

    pill_font = font(30)
    pill_text = category.upper()
    tw = draw.textlength(pill_text, font=pill_font)
    draw.rounded_rectangle([80, 548, 80 + tw + 56, 606], radius=29, fill=(255, 255, 255, 210))
    draw.text((80 + 28, 577), pill_text, font=pill_font, fill=hex_rgb(top), anchor="lm")
    # title with a soft shadow for legibility on any gradient
    draw.text((84, 697), name, font=font(76), fill=(0, 0, 0, 110), anchor="ls")
    draw.text((80, 692), name, font=font(76), fill=(255, 255, 255), anchor="ls")

    (OUT / "projects").mkdir(parents=True, exist_ok=True)
    img.save(OUT / "projects" / filename)
    print("wrote", OUT / "projects" / filename)


def profile() -> None:
    w = h = 900
    img = diagonal_gradient((w, h), "#4f46e5", "#06b6d4")
    soft_blob(img, (720, 140), 260, "#ffffff", 60)
    soft_blob(img, (120, 780), 300, "#ffffff", 40)
    draw = ImageDraw.Draw(img, "RGBA")
    draw.ellipse([135, 135, 765, 765], outline=(255, 255, 255, 110), width=6)
    draw.ellipse([185, 185, 715, 715], fill=(255, 255, 255, 255))
    draw.text((450, 470), "AJ", font=font(230), fill=hex_rgb("#4f46e5"), anchor="mm")
    for cx, cy, r in ((150, 150, 16), (760, 240, 12), (240, 760, 12), (700, 720, 18)):
        draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(255, 255, 255, 190))
    OUT.mkdir(parents=True, exist_ok=True)
    img.save(OUT / "profile.png")
    print("wrote", OUT / "profile.png")


def workspace() -> None:
    w, h = 1200, 800
    img = diagonal_gradient((w, h), "#1e1b4b", "#4f46e5")
    soft_blob(img, (1050, 120), 300, "#ffffff", 40)
    soft_blob(img, (120, 700), 260, "#06b6d4", 70)
    draw = ImageDraw.Draw(img, "RGBA")
    draw.rounded_rectangle([210, 110, 990, 560], radius=26, fill=(255, 255, 255, 44), outline=(255, 255, 255, 90), width=3)
    draw.rounded_rectangle([242, 142, 958, 512], radius=14, fill=(15, 23, 42, 120))
    for i, width in enumerate((320, 470, 250, 400)):
        draw.rounded_rectangle([282, 188 + i * 58, 282 + width, 218 + i * 58], radius=12, fill=(255, 255, 255, 120))
    draw.rounded_rectangle([555, 560, 645, 632], radius=12, fill=(255, 255, 255, 60))
    draw.rounded_rectangle([400, 632, 800, 676], radius=22, fill=(255, 255, 255, 60))
    draw.rounded_rectangle([920, 560, 1010, 668], radius=18, fill=(255, 255, 255, 70))
    for dx, dy in ((-52, -70), (0, -96), (52, -70)):
        draw.ellipse([965 + dx - 34, 560 + dy - 22, 965 + dx + 34, 560 + dy + 22], fill=(255, 255, 255, 110))
    OUT.mkdir(parents=True, exist_ok=True)
    img.save(OUT / "workspace.png")
    print("wrote", OUT / "workspace.png")


def og_card() -> None:
    w, h = 1200, 630
    img = diagonal_gradient((w, h), "#312e81", "#6366f1")
    soft_blob(img, (1080, 90), 260, "#ffffff", 44)
    soft_blob(img, (100, 560), 260, "#06b6d4", 80)
    draw = ImageDraw.Draw(img, "RGBA")
    draw.rounded_rectangle([80, 84, 208, 212], radius=28, fill=(255, 255, 255, 50))
    draw.text((144, 158), "AJ", font=font(64), fill=(255, 255, 255), anchor="mm")
    draw.text((80, 330), "Alex Johnson", font=font(92), fill=(255, 255, 255), anchor="ls")
    draw.text((80, 430), "Full-Stack Developer", font=font(38, bold=False), fill=(255, 255, 255, 220), anchor="ls")
    draw.rounded_rectangle([80, 480, 560, 540], radius=30, fill=(255, 255, 255, 60))
    draw.text((112, 510), "Portfolio  ·  alexjohnson.dev", font=font(30), fill=(255, 255, 255, 235), anchor="lm")
    OUT.mkdir(parents=True, exist_ok=True)
    img.save(OUT / "og.png")
    print("wrote", OUT / "og.png")


def main() -> None:
    (OUT / "projects").mkdir(parents=True, exist_ok=True)
    profile()
    workspace()
    og_card()
    project_card("ShopFlow", "E-commerce", "#6366f1", "#a855f7", "shopflow.png")
    project_card("TaskHive", "Productivity", "#06b6d4", "#3b82f6", "taskhive.png")
    project_card("FinTrack", "Fintech", "#10b981", "#14b8a6", "fintrack.png")
    project_card("DevSpace", "Developer Tools", "#f97316", "#f43f5e", "devspace.png")
    project_card("LearnHub", "Education", "#8b5cf6", "#ec4899", "learnhub.png")
    project_card("MediCare", "Healthtech", "#0ea5e9", "#6366f1", "medicare.png")


if __name__ == "__main__":
    main()

