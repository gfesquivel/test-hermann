# Test de Herrmann en vivo · Liderazgo y Gestión del Cambio

Minisitio para que hasta 60+ alumnos contesten el test de dominancia cerebral de Herrmann desde el celular y vean sus resultados clasificarse **en tiempo real** en la pantalla de la clase (estilo Kahoot).

## Archivos

| Archivo | Qué es |
|---|---|
| `index.html` | Página de los alumnos: datos, 16 preguntas, resultado personal. |
| `profesor.html` | Dashboard en vivo para proyectar: mapa de 4 cuadrantes, participantes, resumen, pregunta por pregunta, equipos y guía de discusión. |
| `config.js` | **Único archivo que debes editar**: config de Firebase, código de sesión y textos. |
| `preguntas.js` | Preguntas, textos de los cuadrantes y motor de cálculo (editable). |
| `lib.js` | Librerías (Firebase + generador de QR). No se edita. |
| `database.rules.json` | Reglas de seguridad para pegar en Firebase. |

## Puesta en marcha (una sola vez)

1. **Firebase** → en tu proyecto, *Realtime Database* → pestaña **Reglas** → pega el contenido de `database.rules.json` → **Publicar**. (Las reglas del "modo de prueba" caducan a los 30 días; estas no.)
2. **config.js** → pega tu bloque `firebaseConfig` y verifica `databaseURL` (es la URL que aparece arriba en la pestaña *Datos* de Realtime Database).
3. **GitHub** → sube los 6 archivos a la raíz del repositorio `test-hermann` (Add file → Upload files → Commit). En 1-2 minutos quedan publicados en GitHub Pages:
   - Alumnos: `https://gfesquivel.github.io/test-hermann/`
   - Profesor: `https://gfesquivel.github.io/test-hermann/profesor.html`

## En clase (guion sugerido, ~15 min)

1. Abre `profesor.html` en el computador conectado al proyector y pulsa **⛶** (pantalla completa). Se ve el QR y el link grande.
2. Los alumnos escanean el QR o escriben el link, ponen nombre, apellido y avatar y contestan (4-5 min). En la pantalla ves quién entró y cómo avanza cada uno.
3. Decide el modo: por defecto los resultados **aparecen en vivo** en el mapa. Si prefieres el efecto sorpresa, pulsa **🙈 Ocultar mapa** mientras contestan y **🎉 Revelar** al final (los puntos entran uno a uno, con sonido y confeti).
4. Usa las pestañas para la discusión: **Resumen** (cuadrante dominante del curso, hemisferios, dobles dominancias), **Preguntas** (qué eligió el curso en cada situación), **Equipos** (arma equipos de "cerebro completo") y **Discusión** (datos del curso + preguntas guía, incluida la crítica al neuromito hemisferio izquierdo/derecho).
5. Al terminar: **⋯ → Descargar resultados (CSV)** para tus registros, y **⋯ → Borrar resultados** para dejar la sesión limpia para la próxima clase (o cambia el código de sesión).

Atajos en el dashboard: `R` revelar/ocultar · `N` nombres · `Q` QR · `Esc` cerrar.

## Cómo se calcula el resultado

Cada pregunta tiene 4 opciones (una por cuadrante, en orden aleatorio para cada alumno). Cada respuesta suma 1 punto a su cuadrante (A Analítico · B Organizador · C Relacional · D Estratega). Con 16 preguntas:

- **Primaria (1)**: cuadrante con el máximo puntaje o con ≥ 37,5 % de las respuestas.
- **Terciaria (3)**: ≤ 12,5 % de las respuestas. **Secundaria (2)**: el resto.
- El "código Herrmann" (p. ej. `1·2·2·3`) sigue el orden A·B·C·D. Dos primarias = doble dominancia (Realista, Visionario/a, Pensador/a, Sensato/a, Analista empático/a, Organizador/a creativo/a); tres = Multidominante; cuatro = Cerebro integral.
- En el mapa, cada alumno se ubica en el cuadrante de su puntaje principal; dentro de la celda, más a la derecha cuanto más hemisferio derecho (C+D) y más arriba cuanto más cortical (A+D).

## Otras sesiones o secciones

Cambia `sesion` en `config.js`, o abre ambas páginas con `?s=OTRO-CODIGO` (el QR del dashboard incluye el código automáticamente). Cada sesión guarda sus propios resultados.

## Datos y privacidad

Se guardan en tu Realtime Database, bajo `sesiones/<codigo>/`: nombre, apellido, nombre en pantalla (por defecto *Nombre + inicial del apellido*, configurable en `mostrarApellido`), avatar, puntajes, secuencia de respuestas y hora. Nadie puede leer ni escribir fuera de `sesiones/`, y las reglas validan el formato de cada registro. El plan gratuito de Firebase admite 100 conexiones simultáneas; cada alumno libera la suya al terminar.
