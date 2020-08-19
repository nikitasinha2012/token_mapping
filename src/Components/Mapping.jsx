import React, { Component } from 'react';
import 'antd/dist/antd.css';
import axios from 'axios';
import './Mapping.css';

class Mapping extends Component {
    constructor() {
        super();
        this.state = {
            dataArray: []
        }
    }
    componentDidMount() {
        axios.get(`https://tokenmapper.api.matic.today/api/v1/mapping/?map_type=POS&symbol=`)
        .then(res => {
          this.setState({dataArray:res.data.data.mapping})
        })

    }
    toMap = () => {
        this.props.history.push('/form');
    }
    toAdmin = () => {
        this.props.history.push('/admin');
    }
    onPos = () => {
        axios.get(`https://tokenmapper.api.matic.today/api/v1/mapping/?map_type=PLASMA&symbol=`)
        .then(res => {
          this.setState({dataArray:res.data.data.mapping})
        })
    }
    onPlasma = () => {
        axios.get(`https://tokenmapper.api.matic.today/api/v1/mapping/?map_type=PLASMA&symbol=`)
        .then(res => {
          this.setState({dataArray:res.data.data.mapping})
        })
    }


    render() {
        console.log('here', this.state.dataArray)
        return (
            <div>
                <div className="topnav">
                    <a>Matic Token Mapping</a>
                    <div className="nav-buttons">
                        <button className="map-button" onClick={this.toMap}>Map new token</button>
                        <button className="admin-button" onClick={this.toAdmin}>Admin</button>
                    </div>
                    <div className="wrapper">
                        <h1>Map your mainnet token to sidechain token</h1>
                        <p>Choose bridge type</p>
                        <button className="pos-button" onClick={this.onPos}>Pos</button>
                        <button className="plasma-button" onClick={this.onPlasma}>Plasma</button>
                    </div>
                    <table>
                        <tbody>
                        <tr>
                            <th>Symbols</th>
                            <th>Root chain address</th>
                            <th>Child chain address</th>
                        </tr>
                        
                        {
                            this.state.dataArray.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.symbol}</td>
                                        <td>{item.root_token}</td>
                                        <td>{item.child_token}</td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>

                </div>

            </div>
        )
    }
}


export default Mapping;