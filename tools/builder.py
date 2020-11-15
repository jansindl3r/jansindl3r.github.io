import markdown
import json
import re

from datetime import datetime
from jinja2 import Environment, FileSystemLoader
from pathlib import Path
from bs4 import BeautifulSoup

base = Path(__file__).parent.parent

env = Environment(loader=FileSystemLoader(str(base/"templates")))
env.trim_blocks = True
env.lstrip_blocks = True

def prettify(htmlString: str):
    return BeautifulSoup(htmlString, 'html.parser').prettify()


def get_md(path):
    with open(path, 'r') as inputFile:
        html = markdown.markdown(inputFile.read())
    matches = list(re.finditer(r"<img.*>", html))
    for match in matches[::-1]:
        left, right = match.span()
        html = f"{html[:left]}<div class='pic-wrapper'>{match.group()}</div>{html[right:]}"
    return html


def render_template(template_name, context={}, outdir=base, sub_folder=None):
    template = env.get_template(template_name)
    context.update(dict(
        sub_folder = sub_folder
    ))
    parsedTemplate = template.render(context)
    if not outdir.exists():
        outdir.mkdir()
    with open(outdir/'index.html', 'w+') as outputHtml:
        outputHtml.write(prettify(parsedTemplate))

def ord_ending(myDate):
    date_suffix = ["th", "st", "nd", "rd"]

    if myDate % 10 in [1, 2, 3] and myDate not in [11, 12, 13]:
        return date_suffix[myDate % 10]
    else:
        return date_suffix[0]

with open(base/"entries"/"stuff"/"data.json", "r+") as input_file:
    stuff_entries = json.load(input_file)
    for sub_folder in stuff_entries:
        stuff_entries[sub_folder].append(get_md(base/"entries"/"stuff"/sub_folder/f"{sub_folder}.md"))
        if stuff_entries[sub_folder][2]:
            time = datetime.strptime(stuff_entries[sub_folder][2], "%d-%m-%Y")
            time = f"{time.year}, {time.strftime('%b')} {time.day}{ord_ending(time.day)}"
            stuff_entries[sub_folder][2] = time
            
with open(base/"entries"/"type"/"data.json", "r+") as input_file:
    type_entries = json.load(input_file)
    for key in type_entries:
        out = ""
        for i, val in enumerate(type_entries[key][2]):
            joiner = ""
            if i < len(type_entries[key][2]) - 1:
                if i < len(type_entries[key][2])-2:
                    joiner = ", "
                else:
                    joiner = " & "
            out += val+joiner
        type_entries[key][2] = out

context = dict(
    root=".",
    stuff_entries = stuff_entries,
    type_entries = type_entries
    )

render_template('index.html', context, sub_folder='.')

sub_folders = []
for _, (sub_folder, *_) in type_entries.items():
    if sub_folder not in sub_folders:
        sub_folders.append(sub_folder)

def get_slideshow(sub_folder):
    entries = []
    files = list((base/'type'/sub_folder/'slideshow').iterdir())
    files = filter(lambda x:False if x.stem.startswith('.') else True, files)
    files = sorted(files, key=lambda x:int(x.stem))
    for entry in files:
        if entry.suffix == ".html":
            with open(entry, "r") as input_file:
                entries.append(['embed', input_file.read()])
        else:
            entries.append(['link', entry.name])
    return entries


for i, sub_folder in enumerate(sub_folders):
    picture_data_path = base/"type"/sub_folder/"images_data.json"
    images_data = False
    if picture_data_path.exists():
        with open(picture_data_path) as input_file:
            images_data = json.load(input_file)
    with open(base/"entries"/"type"/sub_folder/f"{sub_folder}.json", "r") as input_file:
        context = dict(
            previous_typeface = sub_folders[(i-1)%len(sub_folders)],
            next_typeface = sub_folders[(i+1)%len(sub_folders)],
            font_info = json.load(input_file),
            root = "../..",
            text = get_md(base/"entries"/"type"/sub_folder/f"{sub_folder}.md"),
            folder = sub_folder,
            images_data = images_data,
            slideshow = get_slideshow(sub_folder)
        )
    render_template('detail.html', context, outdir=base/"type"/sub_folder)