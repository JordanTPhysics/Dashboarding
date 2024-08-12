"use client"

export const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
]

export const SEASON = [
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
]

export type Weather = {
    date: Date
    description: string
    tempmax: number
    tempmin: number
    temp: number
    feelslike: number
    humidity: number
    precipitation: number
    windspeed: number
    cloudcover: number
    solarradiation: number
    [key: string]: any 
}



export const weatherColors = {
    "Max Temp": '#FF1111',
    "Min Temp": '#1199FF',
    "Avg Temp": '#5511FF',
    "Feels Like": '#DD7777',
    "Humidity": '#8888FF',
    "Precipitation": '#5555FF',
    "Wind Speed": '#118811',
    "Cloud Cover": '#BBCCFF',
    "Solar Radiation": '#FFFF55',
    

}

export const GroupByMonthTotal = (data: Weather[], field: string): Map<string, number> => {
    const grouped = new Map<string, number>()
    data.forEach(d => {
        const month = MONTHS[d.date.getMonth()]
        const value = d[field]
        if (!grouped.has(month) && month !== undefined) {
            grouped.set(month, value)
        } else {
            const current = grouped.get(month)
            if (current) {
                grouped.set(month, value + current)
            
        }
    }
    })
    return grouped
}

export const GroupByMonthAverage = (data: Weather[], field: string): Map<string, number> => {
    const grouped = new Map<string, number>()
    data.forEach(d => {
        const month = MONTHS[d.date.getMonth()]
        const value = d[field]
        if (!grouped.has(month) && month !== undefined) {
            grouped.set(month, value)
        } else {
            const current = grouped.get(month)
            if (current) {
                grouped.set(month, (value + current) / 2)
            }
        }
    })
    return grouped
}

export const NormalizeData = (data: number[]): Number[] => {
    const max = Math.max(...data)
    const min = Math.min(...data)
    return data.map(d => (d - min) / (max - min))
}

export const NormalizeDataMap = (data: Map<string, number>): Map<string, number> => {
    const values = [...data.values()]
    const max = Math.max(...values)

    const normalized = new Map<string, number>()
    data.forEach((v, k) => {
        normalized.set(k, v / max)
    })
    return normalized
}

export const MonthAverageNormalized = (data: Weather[], field: string): Map<string, number> => {
    return NormalizeDataMap(GroupByMonthAverage(data, field))
}

export const GetDataFromCSV = async (url: string): Promise<Weather[]> => {
    const response = await fetch(url)
    const data = await response.text()
    const rows = data.split('\n').slice(1)
    const weatherData = rows.map(row => {
        const cols = row.split(',')
        return {
            date: new Date(cols[1]),
            description: cols[30],
            tempmax: parseFloat(cols[2]),
            tempmin: parseFloat(cols[3]),
            temp: parseFloat(cols[4]),
            feelslike: parseFloat(cols[7]),
            humidity: parseFloat(cols[9]),
            precipitation: parseFloat(cols[10]),
            windspeed: parseFloat(cols[17]),
            cloudcover: parseFloat(cols[20]),
            solarradiation: parseFloat(cols[22]),
        }
    })
    return weatherData
}