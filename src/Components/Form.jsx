import React, { Component } from 'react';
import { Card, Button } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import './Form.css';
class Form extends Component {
    constructor() {
        super();
        this.state = {
            rootToken: "",
            ownerToken: "",
            tokenSymbol: "",
            tokenName: "",
            emailID: "",
            decimalValue: 0,
            mapType: "",
            tokenType: "",
            ercOneValue: "",
            ercTwoValue: "",
            ercThreeValue: ""
        }
    }


    handleTokenAddress = (event) => {
        this.setState({
            rootToken: event.target.value
        })
        console.log('even', event.target.value)
    }
    handleAccount = (event) => {
        this.setState({
            ownerToken: event.target.value
        })
        console.log('even', event.target.value)
    }
    handleSymbol = (event) => {
        this.setState({
            tokenSymbol: event.target.value
        })
    }
    handleTokenName = (event) => {
        this.setState({
            tokenName: event.target.value
        })
    }
    handleDecimalValue = (event) => {
        this.setState({
            decimalValue: event.target.value
        })
    }
    handleEmail = (event) => {
        this.setState({
            emailID: event.target.value
        })
    }
    handleMapType = (event) => {
        this.setState({
            mapType: event.target.value
        })

    }
    handleTokenType = (event) => {
        this.setState({
            tokenType: event.target.value
        })

    }
    handleSubmit = (event) => {
        console.log('hereeee')
        event.preventDefault();
        axios.post(
            "https://tokenmapper.api.matic.today/api/v1/mapping/",
            {
                "root_token": this.state.rootToken,
                "owner": this.state.ownerToken,
                "map_type": this.state.mapType,
                "token_type": this.state.tokenType,
                "decimals": this.state.decimalValue,
                "symbol": this.state.tokenSymbol,
                "name": this.state.tokenName,
                "email": this.state.emailID
            },

            {
                headers: {
                    "Content-Type": "application/json"
                },
            },
        )
            .then(res => {
                console.log(res)
            })
            .catch(error => {
                console.log(error)
            })
        console.log('value??', this.state.emailID)
    }


    render() {
        return (
            <div>
                <div className="topnav">
                    <a href="#">Matic Token Mapping</a>
                    <div className="wrapper">
                        <h1>Map your mainnet token to sidechain token</h1>
                        <p>Choose bridge type</p>
                        <button className="pos-button" onClick={this.handleMapType} value="POS">PoS</button>
                        <button className="plasma-button" onClick={this.handleMapType} value="PLASMA">Plasma</button>
                    </div>
                    <Card title="Details of Root token">
                        <span>Choose type of token</span>
                        <div>
                            <button className="token-type-button" value="ERC20" onClick={this.handleTokenType}>ERC20</button>
                            <button className="token-type-button" value="ERC721" onClick={this.handleTokenType} >ERC721</button>
                            <button className="token-type-button" value="ERC1155" onClick={this.handleTokenType}>ERC1155</button>
                        </div>
                        <form onSubmit={this.handleSubmit}>
                            <div>
                                <label className="input-fields">
                                    <span>Root token address</span>
                                    <input type="text" placeholder="" onChange={this.handleTokenAddress} value={this.state.rootToken}></input>
                                </label>
                                <label className="input-fields">
                                    <span>Enter account of the token </span>
                                    <input type="text" placeholder="" value={this.state.ownerToken} onChange={this.handleAccount} ></input>
                                </label>
                            </div>
                            <div>
                                <label className="input-fields">
                                    <span>Choose the token symbol</span>
                                    <input type="text" placeholder="MATIC" value={this.state.tokenSymbol} onChange={this.handleSymbol} ></input>
                                </label>
                                <label className="input-fields">
                                    <span>Enter name of the token</span>
                                    <input type="text" placeholder="Matic" value={this.state.tokenName} onChange={this.handleTokenName} ></input>
                                </label>
                            </div>
                            <div>
                                <label className="input-fields">
                                    <span>Enter the decimals</span>
                                    <input type="number" placeholder="18" value={this.state.decimalValue} onChange={this.handleDecimalValue}  ></input>
                                </label>
                                <label className="input-fields">
                                    <span>Enter your email for mapping notification</span>
                                    <input type="email" placeholder="john@example.com" value={this.state.emailID} onChange={this.handleEmail} ></input>
                                </label>
                            </div>
                           <button className="submit-button" onSubmit={this.handleSubmit}>Submit</button>
                        </form>
                    </Card>
                </div>

            </div>
        )
    }
}


export default Form;