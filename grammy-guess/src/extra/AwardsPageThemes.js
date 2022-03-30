const AwardsPageThemes = [
  {
    hasGuessed: false,
    bgImg: '',
    headerLogoSrc: '../64th-grammy-black.svg',
    spotifyLogoSrc: '../spotify-logo-black.png',
    sidebarOpenBtnColor: 'rgba(0, 0, 0, 0.6)',
    footerTextColor: '#878787',
  },
  {
    hasGuessed: true,
    bgImg: `no-repeat top/cover url('')`, //url(${nomineeChoiceImg})
    headerLogoSrc: '../64th-grammy-white.svg',
    spotifyLogoSrc: '../spotify-logo-white.png',
    sidebarOpenBtnColor: 'rgba(255, 255, 255, 0.75)',
    footerTextColor: 'rgba(255, 255, 255, 0.9)',
  }
]

export default AwardsPageThemes