exports.formatDate = (dateString) => {
    const d = new Date(dateString)
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    return d.getDate() + ' ' + months[d.getMonth()] + ' ' + d.getFullYear()
}
