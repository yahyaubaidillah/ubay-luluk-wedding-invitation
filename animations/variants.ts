export const fadeUp = {
  hidden: {
    opacity: 0,
    y: 40
  },

  show: {
    opacity: 1,
    y: 0,
    transition:{
      duration:0.8,
      ease:"easeOut"
    }
  }
}


export const fadeSlow = {
  hidden:{
    opacity:0
  },

  show:{
    opacity:1,
    transition:{
      duration:1.5
    }
  }
}


export const scaleIn = {
  hidden:{
    opacity:0,
    scale:0.8
  },

  show:{
    opacity:1,
    scale:1,
    transition:{
      duration:1
    }
  }
}