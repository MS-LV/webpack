function createAnalytics() {
    let counter = 0,
        destroy = false,
        listener = () => counter++
    document.addEventListener('click', listener)
    return {
        destroy() {
            document.removeEventListener('click', listener)
            destroy = true
        },
        getClick() {
            if (destroy) {
                return `Analytics is Destroy`
            }
            return counter
        }
    }
}

window.analytics = createAnalytics()