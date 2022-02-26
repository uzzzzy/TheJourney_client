exports.formatDate = (dateString) => {
    const d = new Date(dateString)
    const months = [
        'Januari',
        'Februari',
        'Maret',
        'April',
        'Mei',
        'Juni',
        'Juli',
        'Agustus',
        'September',
        'Oktober',
        'November',
        'Desember',
    ]
    const days = [
        'Minggu',
        'Senin',
        'Selasa',
        'Rabu',
        'Kamis',
        'Jumat',
        'Sabtu',
    ]
    return (
        days[d.getDay()] +
        ', ' +
        d.getDate() +
        ' ' +
        months[d.getMonth()] +
        ' ' +
        d.getFullYear()
    )
}
