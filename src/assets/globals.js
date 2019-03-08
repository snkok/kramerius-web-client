var APP_GLOBAL = {
  share_url: "http://localhost:4200/${KRAMERIUS}/uuid/${UUID}",
  ga: 'UA-65303593-14',
  enablePeriodicalVolumesYearsLayout: true, 
  enablePeriodicalIsssuesCalendarLayout: true,
  defaultPeriodicalVolumesLayout: "years", // grid | years
  defaultPeriodicalIssuesLayout: "calendar", // grid | calendar
  publicFilterDefault: false,
  dnnt: false,
  bigHomeLogo: false,
  aboutPage: {
    cs: '/assets/pages/about.cs.html',
    en: '/assets/pages/about.cs.html',
  },
  krameriusList: [
    {
      title: 'Slovenská národná knižnica',
      code: 'snk',
      logo: 'http://www.snk.sk/images/websnk-vlavo-180x115.png',
      richCollections: true,
      joinedDoctypes: true,
      lemmatization: false,
      iiif: true,
      doctypes: ['monograph', 'periodical', 'map', 'graphic', 'archive', 'manuscript', 'soundrecording', 'sheetmusic'],
      filters: ['accessibility', 'doctypes', 'authors', 'keywords', 'geonames', 'collections', 'locations', 'languages']
    }
  ]

};
