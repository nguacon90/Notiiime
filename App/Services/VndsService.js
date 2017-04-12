import apisauce from 'apisauce'
import {Client, Message} from 'react-native-paho-mqtt'
import Constants from '../Config/Constants'

const messageUnmashaller = () => {
    return {
        map: {
            //default message type
            //"STOCK", "MARKETINFO", "TRANSACTION", "PUT", "PUTEXEC"
            STOCK: function (mess){
                if (!mess) {
                    return;
                }
                var arr = mess.split("|");
                if (arr.length < 40){
                    console.error("StockInfo message structre is change. ");
                    //return;
                }
                itemInfo = {};
                itemInfo.floorCode = arr[0];
                itemInfo.tradingDate = arr[1];
                itemInfo.time = arr[2];
                itemInfo.code = arr[3];
                itemInfo.companyName = arr[4];
                itemInfo.stockType = arr[5];
                itemInfo.totalRoom = arr[6];
                itemInfo.currentRoom = arr[7];
                itemInfo.basicPrice = arr[8];
                itemInfo.openPrice = arr[9];
                itemInfo.closePrice = arr[10];
                itemInfo.currentPrice = arr[11];
                itemInfo.currentQtty = arr[12];
                itemInfo.highestPrice = arr[13];
                itemInfo.lowestPrice = arr[14];
                itemInfo.ceilingPrice = arr[15];
                itemInfo.floorPrice = arr[16];
                itemInfo.totalOfferQtty = arr[17];
                itemInfo.totalBidQtty = arr[18];
                itemInfo.matchPrice = arr[19];
                itemInfo.matchQtty = arr[20];
                itemInfo.matchValue = arr[21];
                itemInfo.averagePrice = arr[22];
                itemInfo.bidPrice01 = arr[23];
                itemInfo.bidQtty01 = arr[24];
                itemInfo.bidPrice02 = arr[25];
                itemInfo.bidQtty02 = arr[26];
                itemInfo.bidPrice03 = arr[27];
                itemInfo.bidQtty03 = arr[28];
                itemInfo.offerPrice01 = arr[29];
                itemInfo.offerQtty01 = arr[30];
                itemInfo.offerPrice02 = arr[31];
                itemInfo.offerQtty02 = arr[32];
                itemInfo.offerPrice03 = arr[33];
                itemInfo.offerQtty03 = arr[34];
                itemInfo.accumulatedVal = arr[35];
                itemInfo.accumulatedVol = arr[36];
                itemInfo.buyForeignQtty = arr[37];
                itemInfo.sellForeignQtty = arr[38];
                itemInfo.projectOpen = arr[39];
                itemInfo.sequence = arr[40];
                return itemInfo;
            },
            MARKETINFO: function (mess){
                var arr = mess.split(MessageUnmarshaller.SEPARATOR);
                itemInfo = {};
                itemInfo.marketID = arr[0];
                itemInfo.totalTrade = arr[1];
                itemInfo.totalShareTraded = arr[2];
                itemInfo.totalValueTraded = arr[3];
                itemInfo.advance = arr[4];
                itemInfo.decline = arr[5];
                itemInfo.noChange = arr[6];
                itemInfo.indexValue = arr[7];
                itemInfo.changed = arr[8];
                itemInfo.tradingTime = arr[9];
                itemInfo.tradingDate = arr[10];
                itemInfo.floorCode = arr[11];
                itemInfo.marketIndex = arr[12];
                itemInfo.priorMarketIndex = arr[13];
                itemInfo.highestIndex = arr[14];
                itemInfo.lowestIndex = arr[15];
                itemInfo.shareTraded = arr[16];
                itemInfo.status = arr[17];
                itemInfo.sequence = arr[18];
                itemInfo.predictionMarketIndex = arr[19];
                return itemInfo;
            },
            PT_ORDER: function (mess){
                var arr = mess.split(MessageUnmarshaller.SEPARATOR);
                itemInfo = {};

                itemInfo.floorCode = arr[0];
                itemInfo.symbol = arr[1];
                itemInfo.price = parseFloat(arr[2]);
                itemInfo.volume = parseFloat(arr[3]);
                itemInfo.time = arr[4];
                itemInfo.sequence = arr[5];
                itemInfo.basicPrice = arr[6];
                itemInfo.ceilingPrice = arr[7];
                itemInfo.floorPrice = arr[8];

                return itemInfo;
            },
            AD_ORDER: function (mess){
                var arr = mess.split(MessageUnmarshaller.SEPARATOR);
                itemInfo = {};

                itemInfo.floorCode = arr[0];
                itemInfo.stockSymbol = arr[1];
                itemInfo.price = arr[2];
                itemInfo.vol = arr[3];
                itemInfo.type = arr[4];
                itemInfo.status = arr[5];
                itemInfo.time = arr[6];
                itemInfo.sequence = arr[7];
                itemInfo.basicPrice = arr[8];
                itemInfo.ceilingPrice = arr[9];
                itemInfo.floorPrice = arr[10];

                return itemInfo;
            },
            TRANSACTION: function(mess){
                var arr = mess.split(MessageUnmarshaller.SEPARATOR);
                itemInfo = {};

                itemInfo.floorCode = arr[0];
                itemInfo.symbol = arr[1];
                itemInfo.highest = arr[2];
                itemInfo.last = arr[3];
                itemInfo.lastVol = arr[4];
                itemInfo.lowest = arr[5];
                itemInfo.matchType = arr[6];
                itemInfo.openPrice = arr[7];
                itemInfo.time = arr[8];
                itemInfo.sequence = arr[9];
                itemInfo.basicPrice = arr[10];
                return itemInfo;
            }
        },
        regist: function(messType, unmashaller){
            if (typeof unmashaller == "function"){
                this.map[messType] = unmashaller;
            }
        },
        unmashall: function(messType, mess){
            if (typeof this.map[messType] == "undefined" ){
                return mess;
            }
            return this.map[messType](mess);
        }
    }
};

const priceService = (baseURL = Constants.priceServer) => {
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

    const getStockBy = (symbol) => api.get('secinfo/snapshot/q=codes:'+symbol)

    return {
        getStockBy
    }
}


const finfoService = (baseURL = Constants.finfoServer) => {
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

const notiService = (baseURL = Constants.notiiServer) => {
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

    const register = (notiData) => {
        var path = "users/{userId}/notiii/new_notiii_requests".replace('{userId}', Constants.deviceId);
        return api.post(path, notiData);
    }
    return {
        register
    }
}

const myStorage = {
    setItem: (key, item) => {
        myStorage[key] = item;
    },
    getItem: (key) => myStorage[key],
    removeItem: (key) => {
        delete myStorage[key];
    },
};

const clientMQTT = (clientId, signal, callbackSuccess, callbackError) => {
    var client = new Client({ uri: 'ws://notiii.com:1884/ws', clientId: clientId, storage: myStorage });

    // set event handlers
    client.on('connectionLost', (responseObject) => {
        if (responseObject.errorCode !== 0) {
            if(typeof  callbackError == 'function') {
                callbackError(responseObject.errorMessage);
            } else {
                console.log(responseObject.errorMessage);
            }
        }
    });

    client.on('messageReceived', (message) => {
        if(typeof  callbackSuccess == 'function') {
            callbackSuccess(message.payloadString);
        } else {
            console.log(message.payloadMessage);
        }
    });

    const  start = () => {
        client.connect()
        .then(() => {
            // Once a connection has been made, make a subscription and send a message.
            console.log('onConnect');
            return client.subscribe(signal);
        })
        .catch((responseObject) => {
            if (responseObject.errorCode !== 0) {
                if(typeof  callbackError == 'function') {
                    callbackError(responseObject.errorMessage);
                } else {
                    console.log('onConnectionLost:' + responseObject.errorMessage);
                }
            }
        })
    }

    return {
        start
    }
}



// let's return back our create method as the default.
export default {
    finfoService,
    priceService,
    notiService,
    messageUnmashaller,
    clientMQTT
}
