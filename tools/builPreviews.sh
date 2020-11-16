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

words="Nature minds readers some more begs condemned doing daily fulfilment which a and other Circles one experience detail maintained comment another speaking obscure have believes facts Spaceland while Revolutions modest his constrains credited naturally lies with suppose those tendencies themselves to all by prove desires I Law moderate For life hand Spacelanders great few rest In has amusing whole thus thatNature now see importance immense Circularor ultimate aristocratic correspond says supremacy can infecundity herein part of power well is we on work every without beyond different While he about decline disavow be suggestive declare know Man better may This worlds needs justice say must cannot quite but him countrymen critics generations as in still taken passage yet their failure suppressed minute for not far wisdom many hopes working over always intellectual that Flatland them the multitudes slaughter who highest thing sentencing never thinks precisely"

python tools/buildPreviews.py $Integra_grotesque $Integra_script otf "$words" $Integra_out
python tools/buildPreviews.py $Gabion_display $Gabion_text otf "$words" $Gabion_out
python tools/buildPreviews.py $Afrikola_headline $Afrikola_monospace otf "$words" $Afrikola_out

svgo type/*/svgs/*/*.svg