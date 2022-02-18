import React, { useState, useEffect, useReducer } from "react";
import './Product.css'

const symbols = ["BTCUSD", "BTCUSDT"];

const Product = () => {
  const [products, setProducts] = useState();
  const [data, setData] = useState({});

  const apiGet = () => {
    fetch("https://api.delta.exchange/v2/products?page_size=5")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      });
  };

  useEffect(() => {
    apiGet();
  }, []);

  useEffect(() => {
    let ws = new WebSocket("wss://production-esocket.delta.exchange");

    ws.onopen = function(){
        const params = {
            "type": "subscribe",
            "payload": {
                "channels": [
                    {
                        "name": "v2/ticker",
                        "symbols": [
                            "BTCUSD", "BTCUSDT"
                        ]
                    }
                ]
            }
        }
        //Subscribe to the channel
        ws.send(JSON.stringify(params))
    }    

    ws.onmessage = function(msg) {
        const data = JSON.parse(msg.data);
        const { mark_price, symbol } = data;

        let mp = {[symbol] : mark_price}

        if (mark_price && symbol) {
            setData(data => ({...data, ...mp}));
        }   
    }

    return () => {
        ws.onopen = function(){
            const params = {
                "type": "unsubscribe",
                "payload": {
                    "channels": [
                        {
                            "name": "v2/ticker",
                            "symbols": symbols
                        }
                    ]
                }
            }
            //UnSubscribe to the channel
            ws.send(JSON.stringify(params))
        } 
    }
  }, [])

  return (
    <div>
        <table className="table">
            <thead>
                <tr>
                    <th>Symbol</th>
                    <th>Description</th>
                    <th>Underlying Asset</th>
                </tr>
            </thead>
            <tbody>
            {products?.result?.map((item) => (
                <tr key={item.id}>
                    <td>{item.symbol}</td>
                    <td>{item.description}</td>
                    <td>{item.underlying_asset.symbol}</td>
                </tr>    
            ))}
        </tbody>
      </table>
                
      <div>
          {Object.keys(data).map(d => (
              <React.Fragment key={d}>
                <p>Mark Price: {data[d]} {d}</p>
              </React.Fragment>
          ))}
      </div>
    </div>
  );
};

export default Product ;
