import React, { Component } from 'react';
import { Button, Card, Modal } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import './Admin.css';

class Form extends Component {
    constructor() {
        super();
        this.state = {
            dataArray: [],
            dataStatus: "",
            authToken: "",
            visible: false,
            newArray: []
        }
    }
    componentDidMount() {
        axios.post(
            "https://tokenmapper.api.matic.today/api/v1/admin/login",
            {
                "address": process.env.REACT_APP_ADDRESS,
                "signature": process.env.REACT_APP_SIGNATURE
            },
            {
                headers: {
                    "Content-Type": "application/json"
                },
            },
        )
            .then(res => {
                console.log(res.data.auth_token)
                localStorage.setItem('token', res.data.auth_token);
                localStorage.setItem('status', res.data.status);
                localStorage.setItem('child_token', res.data.child_token);
            })

            .catch(error => {
                console.log(error)
            })
        const token = localStorage.getItem('token');
        axios.get(`https://tokenmapper.api.matic.today/api/v1/mapping/requests?map_type=POS&status=[0,1,2,3]&symbol=`, { headers: { "Authorization": token } })
            .then(res => {
                this.setState({ dataArray: res.data.data.mapping })
            })
    }
    toMap = () => {
        this.props.history.push('/form');
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };
    handleEntry = (id, status) => {
        const token = localStorage.getItem('token');
        const childToken = localStorage.getItem('child_token');
        console.log('the id', id, childToken, status)
        axios.patch(`https://tokenmapper.api.matic.today/api/v1/mapping/${id}`,
            {
                "status": 2,
                "child_token": childToken
            },
            { headers: { "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZGRyZXNzIjoiMHhmODkxNTRkN2E0MmM1ZTlmNzc4ODQ1MTE1ODZhOWRiNDYxODY4M2M1IiwiaWF0IjoxNTk3ODE2MjI5LCJleHAiOjE1OTc5MDI2Mjl9.4Oqm1kb-RCi-WiGAzVnFfx8nvbc6XgkCzUPq9nfG8w4" } })
            .then(res => {
                console.log('ptach response', res)
            })

    }

    onPos = () => {
        axios.get(`https://tokenmapper.api.matic.today/api/v1/mapping/requests?map_type=POS&status=[0,1,2,3]&symbol=`)
            .then(res => {
                this.setState({ dataArray: res.data.data.mapping })
            })
    }
    onPlasma = () => {
        axios.get(`https://tokenmapper.api.matic.today/api/v1/mapping/requests?map_type=Plasma&status=[0,1,2,3]&symbol=`)
            .then(res => {
                this.setState({ dataArray: res.data.data.mapping })
            })
    }
    handleNewStatus = () => {
        console.log('get datat', event.target.value)
        this.setState({
            dataArray: this.state.dataArray.filter(o => Object.values(o).includes(0))
        })
        console.log('working?', this.state.dataArray)
    }

    handleOnHoldStatus = () => {
        console.log('get datat', event.target.value)
        this.setState({
            dataArray: this.state.dataArray.filter(o => Object.values(o).includes(1))
        })
        console.log('working?', this.state.dataArray)
    }
    handleMappedStatus = () => {
        this.setState({
            dataArray: this.state.dataArray.filter(o => Object.values(o).includes(2))
        })
    }
    handleRejectedStatus = () => {
        this.setState({
            dataArray: this.state.dataArray.filter(o => Object.values(o).includes(3))
        })
    }






    render() {
        return (
            <div>
                <div className="topnav">
                    <a href="#">Matic Token Mapping</a>
                    <div className="nav-buttons">
                        <button className="map-button" onClick={this.toMap}>Map new token</button>
                    </div>
                    <div className="wrapper">
                        <h1>Map your mainnet token to sidechain token</h1>
                        <p>Choose bridge type</p>
                        <button className="pos-button" onClick={this.onPos}>Pos</button>
                        <button className="plasma-button" onClick={this.onPlasma}>Plasma</button>
                    </div>
                    <Card title="Default size card">
                        <button className="status-button" onClick={this.handleNewStatus} value={0}>New requests</button>
                        <button className="status-button" onClick={this.handleOnHoldStatus} value={1}>On hold</button>
                        <button className="status-button" onClick={this.handleMappedStatus} value={2}>Mapped</button>
                        <button className="status-button" onClick={this.handleRejectedStatus} value={3} >Rejected</button>
                    </Card>
                    <div>
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
                                                <td onClick={this.showModal}>{item.root_token}</td>
                                                <Modal
                                                    title="Details"
                                                    visible={this.state.visible}
                                                    onOk={this.handleOk}
                                                    onCancel={this.handleCancel}
                                                >
                                                    <h3>Symbol : {item.symbol}</h3>
                                                    <h3>Root token : {item.root_token}</h3>
                                                    <h3>Child token : {item.child_token}</h3>
                                                    <h3>Owner : {item.owner}</h3>
                                                    <h3>Name : {item.name}</h3>
                                                    <h3>Email : {item.email}</h3>
                                                    <h3>Token type : {item.token_type}</h3>
                                                    <h3>Map type : {item.map_type}</h3>
                                                    <div className="modal-button">
                                                        <Button className="accept-button" type="primary" onClick={this.handleEntry.bind(this, item.id, item.status, item.child_token)}>Accept</Button>
                                                        <Button className="reject-button" type="primary">Reject</Button>
                                                    </div>
                                                </Modal>
                                                <td>{item.child_token}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}


export default Form;