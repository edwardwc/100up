module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      backGroundImage: {
        'hero-pattern': "url('/topography.svg')",
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}
