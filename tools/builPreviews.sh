rm -r type/*/svgs/*
rm type/*/images_data.json

Integra_grotesque=/Users/jansindler/Documents/type/Integra/exports/Grotesque
Integra_script=/Users/jansindler/Documents/type/Integra/exports/Script
Integra_out=type/Integra/svgs

Gabion_display=/Users/jansindler/Documents/type/Gabion/exports/Display
Gabion_text=/Users/jansindler/Documents/type/Gabion/exports/Text
Gabion_out=type/Gabion/svgs

Afrikola_headline=/Users/jansindler/Documents/type/Afrikola/exports/full/otf/Headline
Afrikola_monospace=/Users/jansindler/Documents/type/Afrikola/exports/full/otf/Monospace
Afrikola_out=type/Afrikola/svgs

words="database might be helpful. I once worked on a Firefox add-on which deals with words and all kinds of simple to complicated associations between them and stuff. Looks like WordNet will be very much useful to you"

python tools/buildPreviews.py $Integra_grotesque $Integra_script otf "$words" $Integra_out
python tools/buildPreviews.py $Gabion_display $Gabion_text otf "$words" $Gabion_out
python tools/buildPreviews.py $Afrikola_headline $Afrikola_monospace otf "$words" $Afrikola_out

svgo type/*/svgs/*/*.svg