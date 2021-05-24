import React from 'react'
const reader = require("g-sheets-api");
const readerOptions = {
  sheetId: "1UKdAL7kjiJls-2Jmji1H4zfsC_WCvz0E41uXKoJ0wBw",
  returnAllResults: false
};

const orderProp = 'Заказ'
const statusProp = 'СТАТУС'


export default () => {
    const [data, setData] = React.useState(undefined as any);
    const [orderId, setOrderId] = React.useState(undefined as string)
    React.useEffect(() => {
        reader(readerOptions, (results) => {
    
            let map = {}
            results.forEach( obj => map[obj[orderProp]] = obj)
            console.log(map)
            setData(map);
        });

    }, []);
    
    if(!data)
        return <div>Loading</div>

    const input = <input value={orderId} onChange={e => setOrderId(e.target.value)}/>
    let result = <div>Номер заказа не введён</div>
    if(orderId) {
        const order = data[orderId]
        if(order)
            result= <div>{order[statusProp] ? order[statusProp] : 'статус не известен'}</div>
         else
            result= <div>Заказ не найден</div>
    }
    return <div>{input}<br/>{result}</div>
}