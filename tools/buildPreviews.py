import drawBot as db
import json
import argparse
from fontTools.ttLib import TTFont
from fontParts.world import OpenFont
from pathlib import Path

parser = argparse.ArgumentParser(description='Process some integers.')
parser.add_argument('fonts', type=Path, nargs="+")
parser.add_argument('type', type=str)
parser.add_argument('words', type=lambda x:x.split(' '))
parser.add_argument('outdir', type=Path)
args = parser.parse_args()

def lower_file_name(stem):
    stem = [char if char.islower() else f"{char.lower()}_" for char in stem]
    return "".join(stem)

fonts = []
for font in args.fonts:
    fonts.extend(list(font.glob(f"*.{args.type}")))

data = {
}

def get_style_name(font):
    ttfont = TTFont(font)['name']
    style_name = None
    entries = (
        (17, 1, 0),
        (17, 3, 1),
        (2, 3, 1)
    )
    for entry in entries:
        try:
            style_name = ttfont.getName(*entry).toStr()
            break
        except:
            pass
    else:
        style_name = " "
    return style_name

for i, word in enumerate(args.words):

    key = lower_file_name(word)
    fontSize = 1000
    font = fonts[i%len(fonts)]
    sub_folder = font.parent.stem
    bez = db.BezierPath()
    db.fontSize(fontSize)
    db.font(font)
    s = db.FormattedString(word, fontSize=fontSize, font=font)
    content_width, content_height = db.textSize(word)
    space = db.textSize(" ")[0]
    bez.text(s, (0, 0))
    yShift = abs(db.fontDescender())+50
    bez.translate(0, yShift)

    bez_left, bez_bottom, bez_right, bez_top = bez.bounds()


    canvas_width = content_width
    canvas_height = db.fontAscender() + abs(db.fontDescender()) + 100


    cutoff_left = abs(bez_left) if bez_left < 0 else 0
    cutoff_right = bez_right - content_width if bez_right > content_width else 0


    bez.translate(cutoff_left, 0)

    db.newPage(canvas_width+cutoff_left+cutoff_right, canvas_height)
    db.drawPath(bez)
    svg_out = args.outdir/sub_folder/f"{key}.svg"
    if not svg_out.parent.exists():
        svg_out.parent.mkdir()
    db.saveImage(str(svg_out))

    data.setdefault(sub_folder, {})[key] = [
        round(cutoff_left),
        round(cutoff_right),
        round(content_width),
        space,
        get_style_name(font)
    ]


with open(args.outdir.parent/"images_data.json", "w+") as outputFile:
    json.dump(data, outputFile)
