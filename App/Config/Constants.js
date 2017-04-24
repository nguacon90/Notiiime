import DeviceInfo from 'react-native-device-info'

export default Constants = {
    loginMethods: {
        facebook: "facebook",
        google: "google"
    },
    accessToken: 'AccessToken',
    // notiiServer: 'http://notiii.com',
    notiiServer: 'http://103.63.109.80:8080/',
    priceServer: 'https://price-hn04.vndirect.com.vn/priceservice/',
    finfoServer: 'https://finfoapi-hn.vndirect.com.vn/',
    deviceId: DeviceInfo.getUniqueID(),

    operators: {
        'LTEQ': '<=',
        'GTEQ': '>='
    },
    logicals: {
        'and': ' và ',
        'or': ' hoặc '
    },
    conditions: {
        'matchedPrice': 'Giá khớp ',
        'accumulatedVol': 'Khối lượng '
    },
    types: {
        'STOCK': 'STOCK',
        'LOGIC': 'LOGIC'
    },
    UNIT: 10
}
