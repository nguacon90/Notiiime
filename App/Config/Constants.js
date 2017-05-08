import DeviceInfo from 'react-native-device-info'

export default Constants = {
    loginMethods: {
        facebook: "facebook",
        google: "google"
    },
    accessToken: 'AccessToken',
    // notiiServer: 'http://notiii.com',
    notiiServer: 'http://notiii.com:8080/',
    priceServer: 'https://price-hn04.vndirect.com.vn/priceservice/',
    finfoServer: 'https://finfoapi-hn.vndirect.com.vn/',
    deviceId: DeviceInfo.getUniqueID(),
    relations: [{
        label: '>=',
        value: 'GTEQ'
    }, {
        label: '<=',
        value: 'LTEQ'
    }],
    MARelations: [{
        label: 'Cắt lên',
        value: 'CT'
    }],
    operators: {
        'LTEQ': '<=',
        'GTEQ': '>='
    },
    logicals: {
        'and': ' và ',
        'or': ' hoặc '
    },
    conditions: {
        matchedPrice: {
            key: 'matchedPrice',
            label: 'Giá khớp'
        },
        accumulatedVol: {
            key: 'accumulatedVol',
            label: 'Khối lượng AAA '
        },
        MA20: {
            key: 'MA20',
            label: 'MA20'
        },
        MA50: {
            key: 'MA50',
            label: 'MA50'
        },
        MA100: {
            key: 'MA100',
            label: 'MA100'
        }
    },

    MAConditions: [
        {
            key: 'MA20',
            label: 'MA20'
        },
        {
            key: 'MA50',
            label: 'MA50'
        },
        {
            key: 'MA100',
            label: 'MA100'
        }
    ],
    types: {
        'STOCK': 'STOCK',
        'LOGIC': 'LOGIC'
    },
    UNIT: 10
}
