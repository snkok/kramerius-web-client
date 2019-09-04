var APP_GLOBAL = {
//  share_url: "http://localhost:4200/${KRAMERIUS}/uuid/${UUID}",
  share_url: "http://onk.snk.tempest.test/uuid/${UUID}",
  ga: 'UA-11111111-14',
  enablePeriodicalVolumesYearsLayout: true,
  enablePeriodicalIsssuesCalendarLayout: true,
  defaultPeriodicalVolumesLayout: "years", // grid | years
  defaultPeriodicalIssuesLayout: "calendar", // grid | calendar
  publicFilterDefault: false,
  dnnt: false,
  bigHomeLogo: false,
  aboutPage: {
    cs: '/assets/pages/about.cs.html',
    en: '/assets/pages/about.en.html',
    sk: '/assets/pages/about.sk.html',
  },
  krameriusList: [
    {
      title: 'Slovenská národná knižnica',
      code: 'snk',
      logo: 'http://www.snk.sk/images/websnk-vlavo-180x115.png',
      url: 'http://onk.snk.tempest.test',
      richCollections: true,
      joinedDoctypes: true,
      lemmatization: false,
      iiif: true,
      doctypes: ['monograph', 'periodical', 'map', 'graphic', 'archive', 'manuscript', 'soundrecording', 'sheetmusic'],
      filters: ['accessibility', 'doctypes', 'authors', 'keywords', 'geonames', 'collections', 'locations', 'languages']
    }
  ]
};
