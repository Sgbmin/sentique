export default defineAppConfig({
  ui: {
    colors: {
      primary: '#0F766E', 
      secondary: '#C9A24D',  
      tertiary: '#0B1C2D' ,
    },
    button: {
      slots: {
        base: 'transition-all duration-300 hover:scale-105 rounded-lg px-6 py-2 font-medium',
      }
    },
    card: {
      slots: {
        root: 'overflow-hidden rounded-xl shadow-lg p-4 bg-[#0B1C2D] text-white',
      }
    }
  }
})