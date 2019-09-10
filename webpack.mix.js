const mix = require('laravel-mix');

mix .js('resources/js/app.js', 'docs/build')
    .postCss('resources/css/main.css', 'docs/build', [
        require('postcss-import'),
        require('tailwindcss'),
        require('postcss-nested'),
        // Reduces the weight of outputed CSS files
        // To avoid cache issues while developping, better activate this before
        // launching to production
        // require('@fullhuman/postcss-purgecss')({
        //     content: [
        //         './templates/**/*.blade.php',
        //         './assets/js/**/*.vue'
        //     ]
        // }),
        require('autoprefixer')({}),
    ]);