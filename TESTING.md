# Verificación de Ludus 3

Los informes JSON incluidos proceden de ejecuciones reales del paquete de código entregado. No equivalen a una garantía de ausencia de errores.

## Motor

Pruebas de reglas y escenarios deterministas, más un recorrido de estrés de **10.000 eventos / 29.554 combates** con los seis modos de emparejamiento:

- Duelos amistosos y a muerte, bestias en tres dificultades, torneos de 4/8/16 y BR.
- En amistosos y torneos, cero bajas; título y recompensa concedidos una vez.
- BR con clasificación completa sin duplicados, finalista distinguido, muertes, indulto y propuesta de libertad obligatoria.
- Tandas detenidas exactamente en las decisiones y reanudadas sin duplicar eventos.
- Autorrelleno después de resolver los destinos, capacidad editable, creación, retirada y libertad manual.
- Más Allá: carrera original intacta, identidad conservada, segunda oportunidad única y plaza adicional al resucitar.
- Olimpo: cuatro formatos, Elo/fama propios y atributos/carrera original congelados.
- Perks efectivos, crecimiento monotónico, techo suave y reducción de aprendizaje ante rivales débiles o repetidos.
- Lesión aplicada durante los combates del herido, nunca consumida por peleas ajenas.
- Muerte de mentor, objetivo de venganza correcto, hazaña y recompensa una sola vez.
- Némesis, rivalidades, reparto de participación en modos equilibrados y selección manual.
- Guardados exactos con decisiones pendientes; rechazo de corrupción; conversión de fixture real de Ludus Simple v2.
- Un valor importado de atributo 100 no disminuye por el techo suave de 99.

Cada cien eventos del recorrido largo se valida y exporta/importa la partida. El informe registra 26.113 entidades históricas, además del desglose por arena y formato.

## Navegador

**18 escenarios en Chromium real mediante Playwright**, con toques en vista móvil, sprites cargados y controles reales:

- 390 px al iniciar; perfil, once atributos, pestañas, edición de nombre/mentor/estilo.
- Crear gladiador, ampliar plazas y guardar reglas.
- Duelo manual animado, pausa, velocidad y salto sin nueva simulación.
- Cien duelos con decisiones y recuento exacto.
- Cuadro de torneo y actas; BR, indulto, libertad y relleno.
- Recarga durante una decisión del BR: no se pierde el destino ni aparece otro evento.
- Torneo de muertos y resurrección conservando la carrera original.
- Libertad voluntaria, retirada y relevo.
- Cuatro formatos del Olimpo sin mutar carrera ni atributos.
- Seis emparejamientos y tres dificultades de bestia.
- Exportación, importación y recarga con persistencia.
- Vistas de 360, 390 y 1280 px sin desbordamiento horizontal en las tres secciones.
- Manual accesible; actualización sin interferencia de cachés ajenos.
- Publicación bajo subdirectorio de Pages y recarga sin conexión.
- Cero excepciones JavaScript y cero recursos ausentes durante el recorrido.

## Alcance

No se ha probado en un iPhone físico ni en el motor WebKit/Safari. El diseño es táctil y adaptable; la validación automática de interfaz se ha hecho en Chromium. La carga final a la cuenta de GitHub del usuario y su publicación no se han realizado.

El balance usa probabilidades y produce historias distintas según la semilla. Las pruebas verifican reglas, límites y diferencias de recompensa; la sensación de ritmo y preferencia por campeones se ajustará con partidas reales. La animación es un resumen del resultado, no otra simulación.
