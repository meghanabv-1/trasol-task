import React from 'react'; 
import style from './Items.css'
import { useFetch } from './useFetch.js'


  export default function UserList() {
    const res = useFetch('https://api.delta.exchange/v2/products');

    if(!res.response.results) {
        return <div>Loading...</div>
    }

    const data = res.response.results;
    console.log(data);

    return (
        <table className="table table-striped table-dark">
        <thead>
          <tr>
            <th scope="col">Symbol</th>
            <th scope="col">Description</th>
            <th scope="col">Underlying</th>
            <th scope="col">Mark Price</th>
          </tr>
        </thead>
        <tbody>
        {data && data.map(row => {
        return (
            <tr>
                <th scope="row" key={row.id}>{row.id}</th>
                    <td>{row.symbol}</td>
                    <td>{row.description}</td>
                    <td>{row.underlying_asset.symbol }</td>
            </tr>
         );
            })}    
        </tbody>
      </table>
    )
}


