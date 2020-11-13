import drawBot as db
import json
import argparse
from fontTools.ttLib import TTFont
from fontParts.world import OpenFont
from pathlib import Path

parser = argparse.ArgumentParser(description='Process some integers.')
parser.add_argument('font', type=Path)
parser.add_argument('font_name', type=str)
parser.add_argument('filename', type=str)

base = Path(__file__).parent

args = parser.parse_args()

font = db.font(args.font)
db.fontSize(1000)


bez = db.BezierPath()
s = db.FormattedString(
    args.font_name, 
    fontSize=1000, 
    font=font,
    fontVariations={
        "rttx": 45
    })
bez.text(s, (0, 0))

left, bottom, right, top = bez.bounds()
bez_width = abs(left) + right
bez_height = abs(bottom) + top
bez.translate(0, abs(bottom))
db.newPage(bez_width, bez_height)
db.fill(0)
db.drawPath(bez)

db.saveImage(str(base/"assets"/f"{args.filename}.svg"))