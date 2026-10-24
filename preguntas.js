/* ============================================================================
   TEST DE HERRMANN — Preguntas, cuadrantes y motor de cálculo (compartido)
   Lo usan index.html (alumnos) y profesor.html (dashboard).
   Puedes editar textos libremente; mantén 4 opciones por pregunta,
   una por cuadrante (A, B, C, D).
   ============================================================================ */
window.HERMANN = (function () {

  /* ---- Los 4 cuadrantes del modelo de Herrmann ---------------------------- */
  const CUADRANTES = {
    A: {
      letra: 'A', nombre: 'Analítico', articulo: 'el', emoji: '🧮',
      zona: 'Cortical izquierdo', hemisferio: 'izquierdo', nivel: 'cortical',
      lema: '“Dame los datos.”',
      claves: ['lógico', 'analítico', 'cuantitativo', 'basado en hechos'],
      descripcion: 'Piensas con lógica, hechos y números. Te gusta entender cómo funcionan las cosas, analizar antes de decidir y argumentar con evidencia. Eres directo/a, crítico/a y eficiente: vas al punto.',
      fortalezas: ['Análisis riguroso', 'Decisiones con datos', 'Resolver problemas', 'Pensamiento crítico'],
      puntoCiego: 'Puedes parecer frío/a o impaciente con las emociones del equipo, y a veces el “dato perfecto” llega tarde para decidir.',
      enEquipo: 'Aportas claridad y rigor. Te complementa un Relacional que cuide el clima y un Estratega que abra el mapa.',
      roles: 'Finanzas, consultoría, análisis de datos, ingeniería de procesos, investigación.',
      pregunta: '¿Cuál es la evidencia?',
      tip: 'Antes de rebatir una idea, pregunta qué la motiva.',
      colorClaro: '#2a6fd0', colorOscuro: '#4e82e5'
    },
    B: {
      letra: 'B', nombre: 'Organizador', articulo: 'el', emoji: '📋',
      zona: 'Límbico izquierdo', hemisferio: 'izquierdo', nivel: 'límbico',
      lema: '“¿Cuál es el plan?”',
      claves: ['planificado', 'secuencial', 'detallista', 'controlado'],
      descripcion: 'Te gusta el orden, la secuencia y el control. Planificas, cumples los plazos y cuidas los detalles. Eres la persona confiable del grupo: si está en tu lista, se hace.',
      fortalezas: ['Planificación', 'Ejecución confiable', 'Gestión del riesgo', 'Atención al detalle'],
      puntoCiego: 'Puedes resistirte al cambio y a las ideas “raras”; el exceso de control a veces frena la creatividad del equipo.',
      enEquipo: 'Haces que las cosas pasen. Te complementa un Estratega que te saque de la rutina y un Relacional que te recuerde a las personas.',
      roles: 'Operaciones, control de gestión, gestión de proyectos, logística, auditoría.',
      pregunta: '¿Cómo lo hacemos y para cuándo?',
      tip: 'Deja un 10% del plan en blanco para lo inesperado.',
      colorClaro: '#237010', colorOscuro: '#297613'
    },
    C: {
      letra: 'C', nombre: 'Relacional', articulo: 'el', emoji: '🤝',
      zona: 'Límbico derecho', hemisferio: 'derecho', nivel: 'límbico',
      lema: '“¿Cómo está la gente?”',
      claves: ['interpersonal', 'emocional', 'expresivo', 'empático'],
      descripcion: 'Piensas con las personas en mente. Eres empático/a, expresivo/a y buen/a comunicador/a. Aprendes conversando y sabes leer el ambiente de un equipo antes que nadie.',
      fortalezas: ['Comunicación', 'Empatía', 'Trabajo en equipo', 'Motivar y enseñar'],
      puntoCiego: 'Puedes evitar el conflicto necesario o tomarte las críticas como algo personal; a veces decides por sentimiento sin mirar los datos.',
      enEquipo: 'Eres el pegamento del grupo. Te complementa un Analítico que ponga números y un Organizador que cierre los compromisos.',
      roles: 'Gestión de personas, marketing, ventas consultivas, docencia, liderazgo de equipos.',
      pregunta: '¿A quiénes afecta esto?',
      tip: 'Tus ideas valen el doble cuando las respaldas con un número.',
      colorClaro: '#d2366f', colorOscuro: '#db4781'
    },
    D: {
      letra: 'D', nombre: 'Estratega', articulo: 'el', emoji: '🚀',
      zona: 'Cortical derecho', hemisferio: 'derecho', nivel: 'cortical',
      lema: '“¿Y si…?”',
      claves: ['holístico', 'intuitivo', 'integrador', 'creativo'],
      descripcion: 'Piensas en grande: ves el panorama completo, conectas ideas y te mueves por intuición. Te gusta experimentar, innovar y tomar riesgos. Lo rutinario te aburre rápido.',
      fortalezas: ['Visión de conjunto', 'Creatividad', 'Síntesis', 'Tolerancia a la incertidumbre'],
      puntoCiego: 'Puedes saltarte los detalles y la ejecución; tus ideas a veces no aterrizan y el equipo se pierde con tantos cambios de rumbo.',
      enEquipo: 'Abres caminos nuevos. Te complementa un Organizador que aterrice el plan y un Analítico que ponga a prueba la idea.',
      roles: 'Estrategia, emprendimiento, innovación, diseño, desarrollo de negocios.',
      pregunta: '¿Y si lo hacemos distinto?',
      tip: 'Elige una idea y llévala hasta el final antes de abrir otra.',
      colorClaro: '#b07a00', colorOscuro: '#bf8610'
    }
  };

  /* ---- Perfiles de doble dominancia ------------------------------------- */
  const DOBLES = {
    AB: { nombre: 'Realista', sub: 'Hemisferio izquierdo', descripcion: 'Riguroso/a y ordenado/a: la combinación más confiable para ejecutar con precisión. Cuidado con subestimar a las personas y las ideas nuevas.' },
    CD: { nombre: 'Visionario/a', sub: 'Hemisferio derecho', descripcion: 'Creativo/a y cercano/a: inspiras y conectas. Cuidado con la falta de rigor y de seguimiento.' },
    AD: { nombre: 'Pensador/a', sub: 'Modo cortical', descripcion: 'Analítico/a y estratégico/a: ideas grandes con lógica detrás. Cuidado con olvidar el plan y a las personas.' },
    BC: { nombre: 'Sensato/a', sub: 'Modo límbico', descripcion: 'Organizado/a y empático/a: haces que las cosas pasen cuidando al equipo. Cuidado con evitar el riesgo y lo nuevo.' },
    AC: { nombre: 'Analista empático/a', sub: 'Diagonal datos–personas', descripcion: 'Datos y personas a la vez: una combinación poco común y muy valiosa. Vives una tensión interna entre cabeza y corazón.' },
    BD: { nombre: 'Organizador/a creativo/a', sub: 'Diagonal plan–imaginación', descripcion: 'Tienes la idea y el cómo. Vives una tensión entre control y libertad: úsala a tu favor.' }
  };

  /* ---- Las 16 preguntas (adaptadas a estudiantes de 5° año de Ing. Comercial) */
  const PREGUNTAS = [
    { id: 1, tema: 'Caso de negocios', texto: 'Estás en un grupo para un caso de negocios y quedan 5 días para entregar. Lo primero que haces es…', opciones: {
      A: 'Abrir el Excel y meterme en los números: quiero entender el problema con datos antes de opinar.',
      B: 'Armar un plan: tareas, responsables y fechas en un documento compartido.',
      C: 'Juntarnos a conversar para ver cómo está cada uno y repartir según lo que a cada uno le gusta.',
      D: 'Lanzar ideas sobre la “gran respuesta” del caso y después ver cómo la aterrizamos.' } },
    { id: 2, tema: 'Estudiar', texto: 'Cuando estudias para una prueba difícil…', opciones: {
      A: 'Resumo lo esencial, hago ejercicios y me concentro solo/a, sin distracciones.',
      B: 'Sigo un calendario de estudio por días y repaso en orden, tema por tema.',
      C: 'Estudio con amigos/as: explicándonos las cosas aprendo mucho más.',
      D: 'Hago mapas mentales, conecto temas entre sí y busco el “para qué” de cada cosa.' } },
    { id: 3, tema: 'Profesores', texto: 'El profesor o profesora que más te ha marcado en la carrera era alguien que…', opciones: {
      A: 'Dominaba la materia y argumentaba con rigor; no perdía el tiempo.',
      B: 'Era claro/a, ordenado/a y cumplía el programa al pie de la letra.',
      C: 'Se interesaba por nosotros como personas y generaba un buen ambiente.',
      D: 'Rompía esquemas, contaba historias y nos hacía ver el mundo distinto.' } },
    { id: 4, tema: 'Programa del ramo', texto: 'Llega el programa de un ramo nuevo. Lo que más te importa es…', opciones: {
      A: 'Que el contenido sea sólido y útil: quiero aprender cosas que sirvan de verdad.',
      B: 'Tener claras las fechas, los porcentajes y las reglas de evaluación desde el día uno.',
      C: 'Que se trabaje en grupo y haya espacio para discutir y participar.',
      D: 'Que haya proyectos abiertos donde pueda proponer algo propio.' } },
    { id: 5, tema: 'Reglas', texto: 'Las reglas de la universidad (asistencia, formatos de entrega, plazos)…', opciones: {
      A: 'Las acepto si tienen lógica; si una regla no tiene sentido, la cuestiono con argumentos.',
      B: 'Las cumplo y me dan tranquilidad: saber las reglas es saber cómo ganar.',
      C: 'Me importa más la relación con la gente que la regla; siempre se puede conversar.',
      D: 'Me cargan: soy más productivo/a cuando tengo libertad para hacerlo a mi manera.' } },
    { id: 6, tema: 'Rol en el grupo', texto: 'En un trabajo grupal, el rol que terminas tomando casi siempre es…', opciones: {
      A: 'El que analiza: modelos, números y la lógica del argumento.',
      B: 'El que organiza: cronograma, formato y que todo se entregue a tiempo.',
      C: 'El que une al grupo: coordino, motivo y resuelvo las tensiones.',
      D: 'El que propone: la idea central, el enfoque distinto, la presentación con impacto.' } },
    { id: 7, tema: 'Por qué esta carrera', texto: 'Si tuvieras que explicar por qué estudiaste Ingeniería Comercial, dirías que…', opciones: {
      A: 'Es una carrera exigente que te enseña a pensar y a resolver problemas con rigor.',
      B: 'Da estabilidad, un camino claro y buenas oportunidades laborales.',
      C: 'Permite trabajar con personas y generar impacto en equipos y organizaciones.',
      D: 'Abre muchas puertas: puedes emprender, innovar y crear cosas nuevas.' } },
    { id: 8, tema: 'Práctica profesional', texto: 'Te ofrecen tres prácticas profesionales. Eliges la de…', opciones: {
      A: 'Finanzas o consultoría: análisis duro, modelos y decisiones con datos.',
      B: 'Operaciones o control de gestión: procesos, orden y mejora continua.',
      C: 'Personas, cultura o marketing relacional: equipos, clientes y vínculos.',
      D: 'Estrategia, innovación o una startup: diseñar lo que todavía no existe.' } },
    { id: 9, tema: 'Aprender algo nuevo', texto: 'Tu forma de aprender una herramienta nueva (Power BI, Python, un idioma…) es…', opciones: {
      A: 'Entender primero la lógica y la estructura; después practico con ejemplos concretos.',
      B: 'Seguir un curso paso a paso, sin saltarme módulos, con mis apuntes ordenados.',
      C: 'Aprender haciendo con otros: tutoriales en grupo, preguntar, conversar.',
      D: 'Tirarme a la piscina con un proyecto real y aprender sobre la marcha.' } },
    { id: 10, tema: 'Lectura', texto: 'Cuando lees por gusto (si es que lees), prefieres…', opciones: {
      A: 'No ficción: economía, ciencia, biografías de gente que logró cosas.',
      B: 'Guías prácticas y libros de desarrollo personal con pasos concretos.',
      C: 'Novelas con personajes que te emocionan y te hacen sentir.',
      D: 'Ciencia ficción, fantasía o ensayos con ideas locas sobre el futuro.' } },
    { id: 11, tema: 'Pregunta sorpresa', texto: 'El profesor te hace una pregunta sorpresa frente a todo el curso…', opciones: {
      A: 'Respondo con lo que sé, directo al punto; si no sé, lo digo.',
      B: 'Me incomoda si no me preparé; prefiero saber de antemano qué van a preguntar.',
      C: 'Me pongo nervioso/a por lo que piensen los demás, aunque sepa la respuesta.',
      D: 'Improviso con alguna idea o salida ingeniosa, y a veces hasta me divierto.' } },
    { id: 12, tema: 'Notas', texto: 'Con las notas y los promedios…', opciones: {
      A: 'Reviso cada corrección y, si hay un error, reclamo con fundamentos.',
      B: 'Llevo mi planilla al día: sé exactamente qué necesito en cada prueba para pasar.',
      C: 'Me afectan más de lo que debería; una mala nota me baja el ánimo un par de días.',
      D: 'Más o menos sé cómo voy; me importa más lo que aprendí que la nota exacta.' } },
    { id: 13, tema: 'Lo que mejor se te da', texto: 'Tus amigos dirían que lo que mejor se te da es…', opciones: {
      A: 'Resolver problemas difíciles con lógica.',
      B: 'Que las cosas se hagan: cumplir, organizar, no fallar.',
      C: 'Entender a la gente y hacer que el grupo funcione.',
      D: 'Tener ideas nuevas y ver oportunidades donde otros no las ven.' } },
    { id: 14, tema: 'Paseo de fin de carrera', texto: 'Hay que organizar el paseo de fin de carrera. Tú…', opciones: {
      A: 'Comparo opciones: costo por persona, tiempos, qué conviene más.',
      B: 'Hago la lista de todo lo necesario, cobro las cuotas y mando el itinerario.',
      C: 'Me preocupo de que nadie quede fuera y de que todos lo pasen bien.',
      D: 'Propongo el destino inesperado que nadie había pensado.' } },
    { id: 15, tema: 'Futuro profesional', texto: 'En tu futuro profesional te imaginas…', opciones: {
      A: 'Como el experto/a técnico de referencia: la persona a la que le preguntan los números.',
      B: 'Gerenciando operaciones o finanzas: equipos ordenados y resultados consistentes.',
      C: 'Liderando personas: desarrollar equipos, cultura y relaciones de largo plazo.',
      D: 'Fundando algo propio o liderando la estrategia e innovación de una empresa.' } },
    { id: 16, tema: 'Presentar tu memoria', texto: 'Tienes que presentar los resultados de tu memoria o proyecto final…', opciones: {
      A: 'Preparo tablas, gráficos y argumentos sólidos: que nadie pueda rebatir la evidencia.',
      B: 'Ensayo varias veces, cuido el formato y tengo todo bajo control, sin sorpresas.',
      C: 'Me enfoco en conectar con la comisión: contar la historia de forma cercana.',
      D: 'Busco una apertura memorable y una gran idea que se recuerde.' } }
  ];

  const LETRAS = ['A', 'B', 'C', 'D'];

  /* ---- Motor de cálculo ----------------------------------------------------
     Entrada: conteos { A, B, C, D } (una respuesta = un punto en su cuadrante).
     Salida: perfil con porcentajes, código 1·2·3 (preferencia primaria /
     secundaria / terciaria, al estilo HBDI), dominantes y coordenadas del mapa.
     Regla: primaria (1) si el cuadrante alcanza el máximo o ≥ 37.5% de las
     respuestas; terciaria (3) si tiene ≤ 12.5%; secundaria (2) el resto.      */
  function calcularPerfil(conteos) {
    const total = LETRAS.reduce((s, k) => s + (conteos[k] || 0), 0) || 1;
    const pct = {}; LETRAS.forEach(k => { pct[k] = Math.round(100 * (conteos[k] || 0) / total); });
    const max = Math.max(...LETRAS.map(k => conteos[k] || 0));
    const nivel = {};
    LETRAS.forEach(k => {
      const v = conteos[k] || 0;
      nivel[k] = (v === max || v / total >= 0.375) ? 1 : (v / total <= 0.125 ? 3 : 2);
    });
    const primarias = LETRAS.filter(k => nivel[k] === 1);
    const dominantes = LETRAS.filter(k => (conteos[k] || 0) === max);
    const codigo = LETRAS.map(k => nivel[k]).join('·');
    // Tipo de perfil
    let tipo, titulo, subtitulo, descripcion;
    if (primarias.length === 1) {
      const q = CUADRANTES[primarias[0]];
      tipo = 'simple'; titulo = q.nombre; subtitulo = q.zona; descripcion = q.descripcion;
    } else if (primarias.length === 2) {
      const key = primarias.join('');
      const d = DOBLES[key];
      tipo = 'doble'; titulo = d.nombre; subtitulo = 'Doble dominancia · ' + d.sub + ' (' + primarias.map(k => CUADRANTES[k].nombre).join(' + ') + ')';
      descripcion = d.descripcion;
    } else if (primarias.length === 3) {
      tipo = 'triple'; titulo = 'Multidominante';
      subtitulo = 'Triple dominancia · ' + primarias.map(k => CUADRANTES[k].nombre).join(' + ');
      descripcion = 'Te mueves con comodidad en tres modos de pensar: tienes flexibilidad para entender a casi todos en un equipo. El desafío es decidir cuál “cerebro” usar en cada momento y no dispersarte.';
    } else {
      tipo = 'integral'; titulo = 'Cerebro integral';
      subtitulo = 'Cuádruple dominancia · los cuatro cuadrantes parejos';
      descripcion = 'Tu perfil es excepcionalmente equilibrado: puedes analizar, organizar, conectar e imaginar según lo pida la situación. Es el perfil típico de quien traduce entre mundos distintos.';
    }
    const principal = dominantes[0];            // cuadrante con más puntos (primero en orden A-D si empate)
    const izquierdo = (conteos.A || 0) + (conteos.B || 0);
    const derecho = (conteos.C || 0) + (conteos.D || 0);
    const cortical = (conteos.A || 0) + (conteos.D || 0);
    const limbico = (conteos.B || 0) + (conteos.C || 0);
    return {
      conteos: { A: conteos.A || 0, B: conteos.B || 0, C: conteos.C || 0, D: conteos.D || 0 }, total, pct, nivel, codigo,
      primarias, dominantes, principal, tipo, titulo, subtitulo, descripcion,
      hemisferio: { izquierdo: Math.round(100 * izquierdo / total), derecho: Math.round(100 * derecho / total) },
      modo: { cortical: Math.round(100 * cortical / total), limbico: Math.round(100 * limbico / total) },
      // Coordenadas para el mapa: x = derecho(+)/izquierdo(−), y = cortical(+)/límbico(−), rango [-1, 1]
      x: (derecho - izquierdo) / total,
      y: (cortical - limbico) / total
    };
  }

  /* Conteos a partir de una secuencia de letras (una por pregunta), p. ej. "ABDDCA…" */
  function contar(secuencia) {
    const c = { A: 0, B: 0, C: 0, D: 0 };
    String(secuencia || '').split('').forEach(l => { if (c[l] !== undefined) c[l]++; });
    return c;
  }

  /* Nombre público según la configuración de privacidad */
  function nombrePublico(nombre, apellido, modo) {
    nombre = String(nombre || '').trim(); apellido = String(apellido || '').trim();
    if (modo === 'completo') return (nombre + ' ' + apellido).trim();
    if (modo === 'no' || !apellido) return nombre;
    return nombre + ' ' + apellido.charAt(0).toUpperCase() + '.';
  }

  const AVATARES = ['🦊', '🐯', '🐼', '🦁', '🐸', '🦉', '🐙', '🦄', '🐬', '🦋', '🐢', '🐨', '🦖', '🐧', '🦜', '🐝'];

  return { CUADRANTES, DOBLES, PREGUNTAS, LETRAS, AVATARES, calcularPerfil, contar, nombrePublico };
})();
