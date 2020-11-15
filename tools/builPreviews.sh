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

words="he daily detail different Man slaughter not speaking decline liesbeyond Circles desires power in amusing cannot comment still more I on Law worlds experience modest for have minds better see suppose wisdom the those we be many work about it by minute rest needs andyet every may multitudes aswell believes now but of tendencies disavow his moderate thus whole hopes knowall countrymen Flatland failure as Spacelanders thegreat naturallycredited justice life say critics maintained thinks has herein While condemned This can some a who supremacy intellectual Spaceland correspond highest constrains while says one hisreaders generations toultimate taken thing isworking never that anotherand For sentencing all him their precisely thatNature In other obscure part far suppressed Nature prove importance themselves always hand overimmense must It Circularor doing Revolutions with which without few and whicha suggestive passage aristocratic to is infecundity them declarethat begs fulfilment quite facts"
# words="In a still more obscure passage he now desires to disavow the Circularor to work anotherand quite a different and far better thing"

python tools/buildPreviews.py $Integra_grotesque $Integra_script otf "$words" $Integra_out
python tools/buildPreviews.py $Gabion_display $Gabion_text otf "$words" $Gabion_out
python tools/buildPreviews.py $Afrikola_headline $Afrikola_monospace otf "$words" $Afrikola_out

svgo type/*/svgs/*/*.svg