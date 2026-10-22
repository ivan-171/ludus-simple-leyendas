> Distribución compacta para publicación: se omiten los archivos originales y evidencias mencionados debajo; se conservan en el ZIP completo. Los recursos usados y los textos de licencia de las fuentes sí se incluyen.

# Ludus — third-party graphics and fonts

All runtime resources are shipped locally. No resource in this directory requires a CDN, login or network request at play time.

## Animated fighters — LuizMelo, CC0 1.0

- **Medieval Warrior Pack**: https://luizmelo.itch.io/medieval-warrior-pack
- **Medieval Warrior Pack 2**: https://luizmelo.itch.io/medieval-warrior-pack-2
- **Medieval Warrior Pack 3**: https://luizmelo.itch.io/medieval-warrior-pack-3
- License: https://creativecommons.org/publicdomain/zero/1.0/

The creator's three pages explicitly identify these packs as CC0, free for personal and commercial use. Original downloads obtained from each creator's free itch.io download flow on 2026-10-15. Source page snapshots are retained under `license-evidence/`; the second and third packs also include their original `License.txt`.

### Adaptations for this game

The original sprite sheets were sliced at their actual frame sizes (184×137, 150×150 and 135×135 respectively). Each frame was resized with nearest-neighbor interpolation and positioned in a transparent 128×128 canvas with a foot pivot at (64,115). All animation frames were retained. No AI-generated frames were added.

Runtime variants: `veteran`, `duelist`, `armored`. Exact paths, counts and suggested playback speeds are documented in `fighters-manifest.json`. The artwork is medieval fantasy; the game's class names and systems adapt it to an ancient arena setting rather than claiming archaeological accuracy.

## Roman gladiator — Chasersgaming, CC0 1.0

- Pack: **RPG Asset Character 'Gladiator' SMS**
- Source: https://opengameart.org/content/rpg-asset-character-gladiator-sms
- Creator: https://chasersgaming.itch.io/
- License: https://creativecommons.org/publicdomain/zero/1.0/

OpenGameArt identifies the license as CC0. Original archive `sms_gladiator_toby_orbon_free_files.zip` downloaded from that page on 2026-10-15. Evidence: `license-evidence/gladiator.html`.

Original frame canvases are 24×32, with a 24×40 portrait. Bonus runtime sheets in `fighters/roman/` have been scaled ×3 using nearest-neighbor interpolation and use the same 128×128 frame canvas and foot pivot (64,115). Four cardinal directions are available for idle, walk, run, attack, hurt and jump. The free pack's attack, hurt and jump states each contain one frame per direction; the moving states have four frames. These are the actual source frames, not invented animation claims.

## RPG icons — Henrique Lazarini / 7Soul1, CC0 1.0

- Pack: **496 pixel art icons for medieval/fantasy RPG**
- Source: https://opengameart.org/content/496-pixel-art-icons-for-medievalfantasy-rpg
- Author: Henrique Lazarini (7Soul1); archive assembled by gnola14.
- License: https://creativecommons.org/publicdomain/zero/1.0/

The OpenGameArt page identifies this distribution as CC0. The uploader explains that derivative copyrighted icons were removed from this particular 496-icon distribution. Archive downloaded from the page's `496_RPG_icons.zip` link on 2026-10-15. Original 34×34 PNGs retained under `icons-7soul/`; useful named copies under `icons/`. Unmodified copies; no recoloring.

## Tiny Dungeon — Kenney, CC0 1.0

- Source: https://kenney.nl/assets/tiny-dungeon
- Author: Kenney (https://kenney.nl)
- License: https://creativecommons.org/publicdomain/zero/1.0/

Official archive downloaded from Kenney on 2026-10-15. Original `kenney/License.txt` and source page snapshot retained. Selected 16×16 icons extracted directly from the packed tile sheet: shield, buckler, red potion, hammer, torch, practice dummy, saber. Exact paths and dimensions: `icons-manifest.json`.

## Fonts — SIL Open Font License 1.1

- **Cinzel**, Natanael Gama: https://github.com/google/fonts/tree/main/ofl/cinzel

Official WOFF2 fonts downloaded from the Google Fonts distribution. Local font files and their original OFL license texts are under `fonts/`. The reserved font names are not changed. These fonts can be bundled with the game under the included license.

## Generated environment artwork

Environment illustrations, when present outside this vendor directory, are generated for Ludus and are credited separately by the game owner. They are not sourced from the packs above.

## Wolf — alizard, CC0 1.0

- Source: https://opengameart.org/content/pixel-wolf
- Author: alizard
- License: https://creativecommons.org/publicdomain/zero/1.0/

The page explicitly identifies the sprites as CC0. Source page snapshot retained under `license-evidence/wolf.html`; four original PNGs retained under `wolf-source/`. Runtime states are in `fighters/wolf/`. The original solid teal background (RGB 12,98,98) was keyed to transparent alpha. Frames were horizontally flipped to face right, scaled ×2 using nearest-neighbor interpolation and normalized to the game's 128×128 frame canvas with pivot (64,115). The two standing frames of the sit cycle provide idle; the original jump provides an attack lunge. This pack has no dedicated bite, hurt or death animation. The runtime should use movement, tint and fall/fade for those responses.

## Inter — SIL Open Font License 1.1

- Source: https://github.com/google/fonts/tree/main/ofl/inter
- Author: Rasmus Andersson
- Local font: `fonts/Inter.woff2`; original license: `fonts/inter-OFL.txt`.

Cinzel and Inter WOFF2 files were downloaded from the official Google Fonts CSS/CDN and bundled locally. These are genuine WOFF2 files, not renamed TrueType files. Their Latin subsets include Spanish accented letters.


Edición integrada: los recursos descritos se incluyen como datos embebidos en index.html. Las licencias de fuentes se adjuntan en LICENCIAS_FUENTES.txt.
