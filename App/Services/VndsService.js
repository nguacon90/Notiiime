import apisauce from 'apisauce'

const finfoService = (baseURL = 'https://finfoapi-hn.vndirect.com.vn/') => {
    const api = apisauce.create({
        baseURL,
        headers: {
            'Cache-Control': 'no-cache'
        },
        timeout: 30000
    })
    if (__DEV__ && console.tron) {
        api.addMonitor(console.tron.apisauce)
    }

    const getStocks = () => api.get('stocks')

    return {
        getStocks
    }
}

// let's return back our create method as the default.
export default {
    finfoService
}
