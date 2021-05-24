import React from 'react'
const reader = require("g-sheets-api");
import * as B from 'react-bootstrap'
const Form = B.Form
const readerOptions = {
  sheetId: "1UKdAL7kjiJls-2Jmji1H4zfsC_WCvz0E41uXKoJ0wBw",
  returnAllResults: false
};

const orderProp = 'Заказ'
const statusProp = 'СТАТУС'
export const sleep = async (time: number) =>
    new Promise(resolve =>
        setTimeout(resolve, time),
    )

export default () => {
    const [data, setData] = React.useState(undefined as any);
    const [tempOrderId, setTempOrderId] = React.useState(undefined as string)
    const [orderId, setOrderId] = React.useState(undefined as string)
    const [loading, setLoading] = React.useState(false)
    React.useEffect(() => {
        reader(readerOptions, (results) => {
    
            let map = {}
            results.forEach( obj => map[obj[orderProp]] = obj)
            console.log(map)
            setData(map);
        });

    }, []);

    let inner
    if(!data)
        inner =  <Frame >Загрузка</Frame>
    else {
        const input =   <Form.Group  controlId="formBasicEmail">
            <Form.Label>Номер заказа</Form.Label>
            <Form.Control size={'lg'} type="text" disabled={orderId !== undefined} placeholder="Введите номер заказа из договора"  value={tempOrderId} onChange={e => setTempOrderId(e.target.value)}/>
        </Form.Group>
        const check = <B.Button style={{width:' 100%', opacity: loading ? 0.6: 1}} disabled={loading} size={'lg'} type="button" className="btn btn-primary" onClick={async () => {
            setLoading(true)
            await sleep(500)
            setOrderId(tempOrderId)
            setLoading(false)
        }}>Проверить заказ</B.Button>
        const back = <B.Button  style={{width:' 100%'}} size={'lg'} type="button" className="btn btn-secondary" onClick={() => {
            setOrderId(undefined)
            setTempOrderId(undefined)
        }
        }>Попробовать другой</B.Button>

        if (orderId) {
            const order = data[orderId]
                inner = <Frame>

                                {input}
                                { order ?<B.Alert  style={{width:' 100%'}}  size={'lg'} variant={'info'} >
                                        {order[statusProp] ? order[statusProp] : 'статус не известен'}
                                    </B.Alert>
                                    : <B.Alert  style={{width:' 100%'}} size={'lg'} variant={'danger'} >
                                    Заказ не найден
                                </B.Alert>
                                }
                                {back}

                        </Frame>
        } else {
            inner = <Frame>{input}{check}</Frame>
        }
    }
    return <B.Form className="container"><B.Row  style={{height: '120px'}}></B.Row>{inner}</B.Form>
}

const Frame = ({children}) => {
    return  <B.Row >
        <B.Col>

        </B.Col>

        <B.Col className={'col-10'}>
            {children}
        </B.Col>


        <B.Col>

        </B.Col>
    </B.Row>
}