// rssFeeds.ts

export interface RSSFeed {
  name: string;
  url: string;
}

export interface RSSGroup {
  publisher: string;
  feeds: RSSFeed[];
  singleFeed?: boolean;
}

export const rssGroups: RSSGroup[] = [
  {
    publisher: 'Libertad Digital',
    feeds: [
      {
        name: 'Portada',
        url: 'https://feeds2.feedburner.com/libertaddigital/portada',
      },
      {
        name: 'Opinión',
        url: 'https://feeds2.feedburner.com/libertaddigital/opinion',
      },
      {
        name: 'Nacional',
        url: 'https://feeds2.feedburner.com/libertaddigital/nacional',
      },
      {
        name: 'Internacional',
        url: 'https://feeds2.feedburner.com/libertaddigital/internacional',
      },
      {
        name: 'Economía',
        url: 'https://feeds2.feedburner.com/libertaddigital/economia',
      },
      {
        name: 'Cultura',
        url: 'https://feeds2.feedburner.com/libertaddigital/cultura',
      },
      {
        name: 'El Candelabro',
        url: 'https://feeds2.feedburner.com/libertaddigital/el-candelabro',
      },
      {
        name: 'Internet',
        url: 'https://feeds2.feedburner.com/libertaddigital/internet',
      },
      {
        name: 'Deportes',
        url: 'https://feeds2.feedburner.com/libertaddigital/deportes',
      },
      {
        name: 'Opinión Federico Jiménez Losantos',
        url: 'https://www.libertaddigital.com/opinion/federico-jimenez-losantos/rss.xml',
      },
      {
        name: 'Opinión Amando de Miguel',
        url: 'https://www.libertaddigital.com/opinion/amando-de-miguel/rss.xml',
      },
      {
        name: 'Opinión José García Domínguez',
        url: 'https://www.libertaddigital.com/opinion/jose-garcia-dominguez/rss.xml',
      },
      {
        name: 'Opinión Cristina Losada',
        url: 'https://www.libertaddigital.com/opinion/cristina-losada/rss.xml',
      },
      {
        name: 'Opinión Carlos Rodríguez Braun',
        url: 'https://www.libertaddigital.com/opinion/carlos-rodriguez-braun/rss.xml',
      },
      {
        name: 'Opinión Pablo Molina',
        url: 'https://www.libertaddigital.com/opinion/pablo-molina/rss.xml',
      },
      {
        name: 'Opinión Emilio Campmany',
        url: 'https://www.libertaddigital.com/opinion/emilio-campmany/rss.xml',
      },
      {
        name: 'Opinión Editorial',
        url: 'https://www.libertaddigital.com/opinion/editorial/rss.xml',
      },
    ],
  },
  {
    publisher: 'El Español',
    feeds: [{ name: 'Portada', url: 'https://www.elespanol.com/rss/' }],
    singleFeed: true,
  },
  {
    publisher: 'El País',
    feeds: [
      {
        name: 'España',
        url: 'https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/portada',
      },
      {
        name: 'América',
        url: 'https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/section/america/portada',
      },
      {
        name: 'En inglés',
        url: 'https://feeds.elpais.com/mrss-s/pages/ep/site/english.elpais.com/portada',
      },
      {
        name: 'México',
        url: 'https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/section/mexico/portada',
      },
      {
        name: 'América colombia',
        url: 'https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/section/america-colombia/portada',
      },
      {
        name: 'Chile',
        url: 'https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/section/chile/portada',
      },
      {
        name: 'Argentina',
        url: 'https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/section/argentina/portada',
      },
      {
        name: 'Ultimas noticias',
        url: 'https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/section/ultimas-noticias/portada',
      },
      {
        name: 'Lo más visto',
        url: 'https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/section/lo-mas-visto/portada',
      },
      {
        name: 'Sociedad',
        url: 'https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/section/sociedad/portada',
      },
      {
        name: 'Internacional',
        url: 'https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/section/internacional/portada',
      },
      {
        name: 'Opinión',
        url: 'https://feeds.elpais.com/mrss-s/list/ep/site/elpais.com/section/opinion',
      },
      {
        name: 'España',
        url: 'https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/section/espana/portada',
      },
      {
        name: 'Economía',
        url: 'https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/section/economia/portada',
      },
      {
        name: 'Ciencia',
        url: 'https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/section/ciencia/portada',
      },
      {
        name: 'Tecnología',
        url: 'https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/section/tecnologia/portada',
      },
      {
        name: 'Cultura',
        url: 'https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/section/cultura/portada',
      },
      {
        name: 'Estilos',
        url: 'https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/section/estilo/portada',
      },
      {
        name: 'Deportes',
        url: 'https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/section/deportes/portada',
      },
      {
        name: 'Televisión',
        url: 'https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/section/television/portada',
      },
      {
        name: 'Gente',
        url: 'https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/section/gente/portada',
      },
      {
        name: 'Clima y medio ambiente',
        url: 'https://feeds.elpais.com/mrss-s/list/ep/site/elpais.com/section/clima-y-medio-ambiente',
      },
      {
        name: 'Educación',
        url: 'https://feeds.elpais.com/mrss-s/list/ep/site/elpais.com/section/educacion',
      },
      {
        name: 'Gastronomía',
        url: 'https://feeds.elpais.com/mrss-s/list/ep/site/elpais.com/section/gastronomia',
      },
      {
        name: 'El Comidista',
        url: 'https://feeds.elpais.com/mrss-s/list/ep/site/elpais.com/section/gastronomia/subsection/el-comidista',
      },
      {
        name: 'S Moda',
        url: 'https://feeds.elpais.com/mrss-s/list/ep/site/elpais.com/section/smoda',
      },
      {
        name: 'Eps',
        url: 'https://feeds.elpais.com/mrss-s/list/ep/site/elpais.com/section/eps',
      },
      {
        name: 'Babelia',
        url: 'https://feeds.elpais.com/mrss-s/list/ep/site/elpais.com/section/babelia',
      },
      {
        name: 'El Viajero',
        url: 'https://feeds.elpais.com/mrss-s/list/ep/site/elpais.com/section/elviajero',
      },
      {
        name: 'Icon',
        url: 'https://feeds.elpais.com/mrss-s/list/ep/site/elpais.com/section/icon',
      },
      {
        name: 'Planeta Futuro',
        url: 'https://feeds.elpais.com/mrss-s/list/ep/site/elpais.com/section/planeta-futuro',
      },
      {
        name: 'Mamás y Papas',
        url: 'https://feeds.elpais.com/mrss-s/list/ep/site/elpais.com/section/mamas-papas',
      },
      {
        name: 'Escaparate',
        url: 'https://feeds.elpais.com/mrss-s/list/ep/site/elpais.com/section/escaparate',
      },
      {
        name: 'Ideas',
        url: 'https://feeds.elpais.com/mrss-s/list/ep/site/elpais.com/section/ideas',
      },
      {
        name: 'Quadern',
        url: 'https://feeds.elpais.com/mrss-s/list/ep/site/elpais.com/section/quadern/',
      },
      {
        name: 'Cinco Días',
        url: 'https://feeds.elpais.com/mrss-s/pages/ep/site/cincodias.elpais.com/portada',
      },
      {
        name: 'Motor',
        url: 'https://elpais.com/arc/outboundfeeds/rss/tags_slug/deportes-motor-a/?outputType=xml',
      },
      {
        name: 'Negocios',
        url: 'https://feeds.elpais.com/mrss-s/list/ep/site/elpais.com/section/economia/subsection/negocios',
      },
    ],
  },
  {
    publisher: 'El Mundo',
    feeds: [
      {
        name: 'Portada',
        url: 'https://www.elmundo.es/rss/googlenews/portada.xml',
      },
      {
        name: 'Internacional',
        url: 'https://www.elmundo.es/rss/googlenews/internacional.xml',
      },
      {
        name: 'España',
        url: 'https://www.elmundo.es/rss/googlenews/espana.xml',
      },
      {
        name: 'Economía',
        url: 'https://www.elmundo.es/rss/googlenews/economia.xml',
      },
      {
        name: 'Tecnología',
        url: 'https://www.elmundo.es/rss/googlenews/tecnologia.xml',
      },
      {
        name: 'Cultura',
        url: 'https://www.elmundo.es/rss/googlenews/cultura.xml',
      },
      {
        name: 'Deportes',
        url: 'https://www.elmundo.es/rss/googlenews/deportes.xml',
      },
      {
        name: 'Sociedad',
        url: 'https://www.elmundo.es/rss/googlenews/sociedad.xml',
      },
    ],
  },
  {
    publisher: 'ABC',
    feeds: [
      {
        name: 'Portada',
        url: 'https://www.abc.es/rss/2.0/portada/',
      },
      {
        name: 'Última hora',
        url: 'https://www.abc.es/rss/2.0/ultima-hora/',
      },
      {
        name: 'Opinión',
        url: 'https://www.abc.es/rss/2.0/opinion/',
      },
      {
        name: 'Madrid',
        url: 'https://www.abc.es/rss/2.0/espana/madrid/',
      },
      {
        name: 'Casa Real',
        url: 'https://www.abc.es/rss/2.0/espana/casa-real/',
      },
      {
        name: 'España',
        url: 'https://www.abc.es/rss/2.0/espana/',
      },
      {
        name: 'Internacional',
        url: 'https://www.abc.es/rss/2.0/internacional/',
      },
      {
        name: 'Economía',
        url: 'https://www.abc.es/rss/2.0/economia/',
      },
      {
        name: 'Motor',
        url: 'https://www.abc.es/rss/2.0/motor/',
      },
      {
        name: 'Sociedad',
        url: 'https://www.abc.es/rss/2.0/sociedad/',
      },
      {
        name: 'Ciencia',
        url: 'https://www.abc.es/rss/2.0/ciencia/',
      },
      {
        name: 'Tecnología',
        url: 'https://www.abc.es/rss/2.0/tecnologia/',
      },
      {
        name: 'Gente',
        url: 'https://www.abc.es/rss/2.0/gente/',
      },
      {
        name: 'Antropía',
        url: 'https://www.abc.es/rss/2.0/antropia/',
      },
      {
        name: 'Cultura',
        url: 'https://www.abc.es/rss/2.0/cultura/',
      },
      {
        name: 'Play',
        url: 'https://www.abc.es/rss/2.0/play/',
      },
      {
        name: 'Historia',
        url: 'https://www.abc.es/rss/2.0/historia/',
      },
      {
        name: 'Archivo ABC',
        url: 'https://www.abc.es/rss/2.0/archivo/',
      },
      {
        name: 'Deportes',
        url: 'https://www.abc.es/rss/2.0/deportes/',
      },
      {
        name: 'Estilo',
        url: 'https://www.abc.es/rss/2.0/estilo/',
      },
      {
        name: 'Bienestar',
        url: 'https://www.abc.es/rss/2.0/bienestar/',
      },
      {
        name: 'Summum',
        url: 'https://www.abc.es/rss/2.0/summum/',
      },
      {
        name: 'ABC Cultural',
        url: 'https://www.abc.es/rss/2.0/cultura/cultural/',
      },
      {
        name: 'XL Semanal',
        url: 'https://www.abc.es/rss/2.0/xlsemanal/',
      },
    ],
  },
];
