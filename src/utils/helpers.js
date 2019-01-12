import { navigate } from 'gatsby'

export const animateAndNavigateTo = (e, slug) => {
    const $target = e.currentTarget
    $target.parentElement.style.transform = 'translateY(-32px)'
    // 15px rather than 16px as entry has a 1px top border
    const distanceToTop = $target.getBoundingClientRect().top - 15
    const spacerHeight = document.querySelector('.spacer').offsetHeight;
    $target.style.transitionDuration = "0.7s"
    if (Math.abs(distanceToTop - spacerHeight) < 16) {
        $target.style.boxSizing = 'content-box'
        $target.previousElementSibling.style.transitionDuration = "0.7s"
        $target.previousElementSibling.style.transform = `translateY(-${distanceToTop}px)`
    } else {
        $target.style.transform = `translateY(-${distanceToTop}px)`
        $target.style.paddingTop = `${spacerHeight}px`
    }
    $target.style.height = `${window.innerHeight}px`
    setTimeout(() => {
        navigate(slug)
    }, 700)
}

