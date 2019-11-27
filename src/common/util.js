function getBrowserInfo() {
    return (navigator && navigator.userAgent) ? navigator.userAgent : 'unknown';
}

export default {
    getBrowserInfo
}