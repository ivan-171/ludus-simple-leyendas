# Ludus 3

Ocho gladiadores, carreras persistentes y narrativa emergente. Duelos amistosos o a muerte, torneos seguros, Battle Royale con indulto y libertad, bestias, Olimpo y Torneo del Más Allá. Interfaz gráfica con controles táctiles y simulación por tandas de 1 / 5 / 20 / 100.

## Jugar y publicar

Descomprime y sube **todo el contenido** al repositorio, conservando las carpetas. `index.html` debe quedar en la raíz. Hay menos de 100 archivos: una sola subida. Configura GitHub Pages desde la rama y la raíz. No mezcles los archivos con una edición anterior.

Todos los gráficos y fuentes están incluidos; no necesita compilación ni servicios externos. Para una prueba local usa cualquier servidor estático. El modo offline funciona tras la primera carga desde HTTPS o localhost.

**Manual completo y guía de pruebas: [MANUAL.html](MANUAL.html).** También se abre desde Opciones dentro del juego.

## Guardado

Automático en IndexedDB, con copia anterior. Exportación e importación JSON con comprobación de integridad y validación de registros. Migra partidas de Ludus Simple v2, conserva las decisiones y tandas pendientes. El Ludus Imperium original usa otro modelo de guardado.

## Comprobaciones

`node tests/engine.test.js`

`node tests/browser.test.js` requiere Playwright y Chromium. Configura `PLAYWRIGHT_MODULE` con la ruta al módulo y `CHROME_BIN` con el ejecutable si no coinciden con el entorno de desarrollo.

Los resultados están en `tests/engine-results.json` y `tests/browser-results.json`. `TESTING.md` explica alcance y limitaciones. Los tests usan una partida antigua sintética incluida como fixture, sin datos personales.

## Organización

- `combat.js`: simulación pura y reproducible, eventos y clasificación completa.
- `pocket.js`: carreras, Elo, crecimiento, estados, decisiones, torneos y guardados.
- `app.js`: interfaz táctil y presentación de decisiones.
- `art.js`: sprites y reproducción visual de las acciones simuladas.
- `store.js`: guardado y respaldo.
- `sw.js`: recursos locales para recarga sin conexión, ámbito relativo de Pages.

No hay reloj, economía ni mercado. Las lesiones duran combates propios. La muerte y la libertad son estados separados y no borran registros. Los torneos amistosos no pueden producir bajas. Los atributos del Olimpo permanecen congelados.

Créditos y licencias en `assets/vendor/CREDITS.md` y `LICENSE`.
