import base64

from pathlib import Path
from fontTools.ttLib import TTFont

base = Path(__file__).parent


font_path = base/'entries'/'type'/'rotor'/'rotor-VF.ttf'
tt_font = TTFont(font_path)

name = tt_font["name"]

# print(dir(name))
print(name.getName(1, 3, 1))

with open(font_path, 'rb') as input_file:
    data = input_file.read()



result = base64.b64encode(data).decode('ascii')


# print(result)