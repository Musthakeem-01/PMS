module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'dark-purple':'#081A51',
        'light-white': 'rgba(255,255,255,0.18)',
        ButtonColor: "#2563eb",
        HoverButtonColor: "#2655CC",
        activeLinkBorderColor: "#2563eb",
        activeLinkBorderColor2: "#CCE0FF",
        activeLinkTextColor: "#3b82f6",
        HeaderBottomBorder: "#EDEFF2",
        NanoBGcolor1:"#090979",
        NanoBGcolor2:"#0C5895",
        NanoBGcolor3:"#127F9F",
        ProjectHeaderBarTextColor:"#CCE0FF",
        ProjectHeaderBarBorderColor:"#9ca3af",
        projectDetailTextClr:"#CEDAE9",
        DoneSubTextClr:"#6b7280",
        projectPopupBG:"#CCE0FF",
        ShareHoveBG:"#cccccc2b",
        BoardCardBG:"#F7F8F9",
        BorderCard:"#dfdfdf"
      },
      fontSize: {
        defaultDashborderText:"1.4rem"
      },
      textTransform: {
        'lowercase': 'lowercase',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
