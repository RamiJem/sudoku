const siteUrl = "https://www.sudokucalendar.com"

module.exports = {
    siteUrl,
    generateRobotsTxt: true,
    robotsTxtOptions: {
        additionalSitemaps: [`${siteUrl}/server-sitemap.xml`]
    }
}