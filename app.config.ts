export default defineAppConfig({
  ui: {
    colors: {
      primary: 'amber', // Gold
      secondary: 'emerald', // Jade green  
      tertiary: 'blue' // Navy blue
    },
    button: {
      slots: {
        base: 'transition-all duration-300 hover:scale-105'
      }
    },
    card: {
      slots: {
        root: 'overflow-hidden'
      }
    }
  }
})
