import React,{Component} from 'react';
import {  Button } from 'antd';
import 'antd/dist/antd.css';

class LoginPage extends Component{
    constructor(){
        super()
        this.state={

        }
    }

    render(){
        return(
            <div>
                <Button type="primary">Login</Button>
            </div>
        )
    }
}

export default LoginPage;