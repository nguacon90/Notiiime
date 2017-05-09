import DeviceInfo from 'react-native-device-info'

export default Constants = {
    sizeIcon: 15,
    appName: 'Notiii.me',
    loginMethods: {
        facebook: "facebook",
        google: "google"
    },
    facebookAvartarUri: 'https://graph.facebook.com/{userId}/picture?type=large',
    accessToken: 'AccessToken',
    fcmTokenKey: 'fcmTokenKey',
    fcmNotiServer: 'http://notiii.com',
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
    },{
        label: 'Cắt Xuống',
        value: 'CX'
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
            label: 'Khối lượng'
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
    UNIT: 10,

    menu: {
        noti: 'Notiii',
        watchList: 'Watchlist',
        screener: 'Lọc mã',
        template: 'Template',
        rating: 'Đánh giá',
        feedback: 'Góp ý',
        inviteFriends: 'Mời bạn bè'
    }
}
