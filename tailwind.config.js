module.exports = {
    purge: [],
    darkMode: 'class', // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                darkpurple: '#151515',
                pink: '#f25287',
                lightpink: '#f7d9d9',
            },
        },
    },
    variants: {
        extend: {
            typography: ['dark'],
        },
    },
    plugins: [require(`@tailwindcss/typography`)],
};
