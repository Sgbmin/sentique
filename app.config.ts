export default defineAppConfig({
  ui: {
    colors: {
      primary: 'amber',
      secondary: 'emerald',
      tertiary: 'blue',
      amber: 'amber',
      emerald: 'emerald'
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