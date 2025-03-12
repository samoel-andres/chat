document.addEventListener('DOMContentLoaded', () => {
    const toggleTheme = document.getElementById('toggle-theme')
    const themeElement = document.getElementById('theme-icon')
    const themeDescription = document.getElementById('theme-description')

    if (!themeElement || !themeDescription) return

    const savedTheme = localStorage.getItem('theme') || 'dark'
    applyTheme(savedTheme)

    function switchTheme() {
        const currentTheme = document.documentElement.getAttribute('data-sav-theme') || 'dark'
        const newTheme = currentTheme === 'light' ? 'dark' : 'light'
        applyTheme(newTheme)
    }

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-sav-theme', theme)
        localStorage.setItem('theme', theme)

        if (theme === 'dark') {
            themeElement.classList.replace('bi-brightness-high', 'bi-moon')
            themeDescription.textContent = 'Cambiar a claro'
        } else {
            themeElement.classList.replace('bi-moon', 'bi-brightness-high')
            themeDescription.textContent = 'Cambiar a oscuro'
        }
    }

    toggleTheme?.addEventListener('click', switchTheme)
})