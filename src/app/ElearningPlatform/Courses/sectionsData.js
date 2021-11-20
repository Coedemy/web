const sources = {
  sintelTrailer: 'http://media.w3.org/2010/05/sintel/trailer.mp4',
  bunnyTrailer: 'http://media.w3.org/2010/05/bunny/trailer.mp4',
  bunnyMovie: 'http://media.w3.org/2010/05/bunny/movie.mp4',
  test: 'http://media.w3.org/2010/05/video/movie_300.webm'
}

const sectionsData = [
  {
    id: '1',
    title: 'Fundamental Ideas Around Microservices',
    lectures: [
      {
        id: '1',
        title: 'Fundametal Ideas',
        type: 'video',
        videoSrc: sources.sintelTrailer
      },
      {
        id: '2',
        title: 'Microservice',
        type: 'video',
        videoSrc: sources.bunnyTrailer
      },
      {
        id: '3',
        title: 'Fundametal Ideas',
        type: 'quiz',
        quizId: 121412
      },
      {
        id: '4',
        title: 'Microservice',
        type: 'article',
        articleId: 415
      }
    ]
  },
  {
    id: '2',
    title: 'A Mini-Microservices App',
    lectures: [
      {
        id: '1',
        title: 'Fundametal Ideas',
        type: 'video',
        videoSrc: 'https://r4---sn-npoe7n7y.googlevideo.com/videoplayback?expire=1636715119&ei=D_aNYfz3MOaI6dsPmIaTgAM&ip=3.69.254.237&id=o-AKfyXwnwjtsZ9C0bxItEt8tHOxGDTZ61pXVQq-gDMlm-&itag=18&source=youtube&requiressl=yes&vprv=1&mime=video%2Fmp4&ns=TlbKe8ujVpPtnZAQdzUVTIMG&gir=yes&clen=12298617&ratebypass=yes&dur=466.581&lmt=1574274087827155&fexp=24001373,24007246&c=WEB&txp=2211222&n=47YZEEpk6tq6Lg&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cns%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&sig=AOq0QJ8wRgIhAI6BvhgZ07SNmLDRPfUSWpBXwJcOPcGJDIWlvbuJb-DdAiEA0omyVw6BnUYb1o7279eMj1A-uradob5U0GN2ka4VhZQ%3D&redirect_counter=1&cm2rm=sn-1gie67s&req_id=a445ce50e854a3ee&cms_redirect=yes&mh=gO&mip=113.185.81.10&mm=34&mn=sn-npoe7n7y&ms=ltu&mt=1636693252&mv=m&mvi=4&pl=24&lsparams=mh,mip,mm,mn,ms,mv,mvi,pl&lsig=AG3C_xAwRgIhAO92IlmPv6TOx7GwYIgW8jAPa_alCQsHivyvjZXWDpdiAiEAk6m9eT9cWiAMMTYHoZE-wkXK4PwQo9FEYZ8SC9XvhHI%3D'
      },
      {
        id: '2',
        title: 'A Mini-Microservices App',
        type: 'video',
        videoSrc: 'https://r4---sn-npoe7n7y.googlevideo.com/videoplayback?expire=1636715119&ei=D_aNYfz3MOaI6dsPmIaTgAM&ip=3.69.254.237&id=o-AKfyXwnwjtsZ9C0bxItEt8tHOxGDTZ61pXVQq-gDMlm-&itag=18&source=youtube&requiressl=yes&vprv=1&mime=video%2Fmp4&ns=TlbKe8ujVpPtnZAQdzUVTIMG&gir=yes&clen=12298617&ratebypass=yes&dur=466.581&lmt=1574274087827155&fexp=24001373,24007246&c=WEB&txp=2211222&n=47YZEEpk6tq6Lg&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cns%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&sig=AOq0QJ8wRgIhAI6BvhgZ07SNmLDRPfUSWpBXwJcOPcGJDIWlvbuJb-DdAiEA0omyVw6BnUYb1o7279eMj1A-uradob5U0GN2ka4VhZQ%3D&redirect_counter=1&cm2rm=sn-1gie67s&req_id=a445ce50e854a3ee&cms_redirect=yes&mh=gO&mip=113.185.81.10&mm=34&mn=sn-npoe7n7y&ms=ltu&mt=1636693252&mv=m&mvi=4&pl=24&lsparams=mh,mip,mm,mn,ms,mv,mvi,pl&lsig=AG3C_xAwRgIhAO92IlmPv6TOx7GwYIgW8jAPa_alCQsHivyvjZXWDpdiAiEAk6m9eT9cWiAMMTYHoZE-wkXK4PwQo9FEYZ8SC9XvhHI%3D'
      },
      {
        id: '3',
        title: 'A Quiz App',
        type: 'quiz',
        quizId: 121412
      },
      {
        id: '4',
        title: 'A Nodejs App',
        type: 'article',
        articleId: 415
      }
    ]
  },
  {
    id: '3',
    title: 'Running Services with Docker',
    lectures: [
      {
        id: '1',
        title: 'Fundametal Ideas',
        type: 'video',
        videoSrc: 'https://r4---sn-npoe7n7y.googlevideo.com/videoplayback?expire=1636715119&ei=D_aNYfz3MOaI6dsPmIaTgAM&ip=3.69.254.237&id=o-AKfyXwnwjtsZ9C0bxItEt8tHOxGDTZ61pXVQq-gDMlm-&itag=18&source=youtube&requiressl=yes&vprv=1&mime=video%2Fmp4&ns=TlbKe8ujVpPtnZAQdzUVTIMG&gir=yes&clen=12298617&ratebypass=yes&dur=466.581&lmt=1574274087827155&fexp=24001373,24007246&c=WEB&txp=2211222&n=47YZEEpk6tq6Lg&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cns%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&sig=AOq0QJ8wRgIhAI6BvhgZ07SNmLDRPfUSWpBXwJcOPcGJDIWlvbuJb-DdAiEA0omyVw6BnUYb1o7279eMj1A-uradob5U0GN2ka4VhZQ%3D&redirect_counter=1&cm2rm=sn-1gie67s&req_id=a445ce50e854a3ee&cms_redirect=yes&mh=gO&mip=113.185.81.10&mm=34&mn=sn-npoe7n7y&ms=ltu&mt=1636693252&mv=m&mvi=4&pl=24&lsparams=mh,mip,mm,mn,ms,mv,mvi,pl&lsig=AG3C_xAwRgIhAO92IlmPv6TOx7GwYIgW8jAPa_alCQsHivyvjZXWDpdiAiEAk6m9eT9cWiAMMTYHoZE-wkXK4PwQo9FEYZ8SC9XvhHI%3D'
      },
      {
        id: '2',
        title: 'A Mini-Microservices App',
        type: 'quiz',
        quizId: 121412
      },
      {
        id: '3',
        title: 'A Nodejs App',
        type: 'article',
        articleId: 415
      }
    ]
  },
]

export default sectionsData