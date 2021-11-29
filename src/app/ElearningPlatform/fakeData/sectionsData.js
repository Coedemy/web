import sources from './videoSources'

const sectionsData = [
  {
    id: '1',
    title: 'Fundamental Ideas Around Microservices',
    lectures: [
      {
        id: '1',
        title: 'Fundametal Ideas',
        type: 'video',
        videoSrc: sources.bunnyTrailer,
        description: 'Build, deploy, and scale an E-Commerce app using Microservices built with Node, React, Docker and Kubernetes'
      },
      {
        id: '2',
        title: 'Microservice',
        type: 'video',
        videoSrc: sources.bunnyMovie,
        description: 'Build, deploy, and scale an E-Commerce app using Microservices built with Node, React, Docker and Kubernetes'
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
        videoSrc: sources.sintelTrailer,
        description: 'Build, deploy, and scale an E-Commerce app using Microservices built with Node, React, Docker and Kubernetes'
      },
      {
        id: '2',
        title: 'A Mini-Microservices App',
        type: 'video',
        videoSrc: sources.bunnyTrailer,
        description: 'Build, deploy, and scale an E-Commerce app using Microservices built with Node, React, Docker and Kubernetes'
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
        videoSrc: sources.test,
        description: 'Build, deploy, and scale an E-Commerce app using Microservices built with Node, React, Docker and Kubernetes'
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