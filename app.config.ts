export default defineAppConfig({
  ui: {
    colors: {
      // These are your semantic names
      primary: 'amber',
      secondary: 'emerald',
      tertiary: 'blue',
      
      // YOU MUST ADD THESE:
      // These tell TypeScript: "The color 'amber' is a valid option"
      amber: 'amber',
      emerald: 'emerald',
      blue: 'blue',
      gray: 'slate' 
    },
    button: {
      slots: {
        base: 'transition-all duration-300 hover:scale-105'
      }
    },
    card: {
      slots: {
        root: 'overflow-hidden rounded-xl p-6 shadow-lg'
      }
    }
  }
})