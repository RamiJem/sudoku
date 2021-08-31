import { getServerSideSitemap } from 'next-sitemap'
import db from '../../db'
import { dateToString } from '../../utils/dates'

export const getServerSideProps = async (ctx) => {

    let day = new Date(2021, 0, 1)
    const dayNow = new Date()
    const fields = []
    fields.push({loc: `https://www.sudokucalendar.com`, lastmod: new Date().toISOString()})
    while (day <= dayNow){
        fields.push({loc: `https://www.sudokucalendar.com/${dateToString(day)}`, lastmod: new Date().toISOString()})
        day.setUTCDate(day.getUTCDate() + 1)
    }

    console.log(fields)
    
    return getServerSideSitemap(ctx, fields)
}

export default function Site() {}