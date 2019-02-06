import React,{Component} from 'react';

class AddDB extends Component{
    constructor(props){
        super(props);
        this.state={
            name:'',
            user:'',
            password:'',
            port:27017,
            host:'localhost',
            isAuth:false,
        }
    }
    componentDidMount(){
        this.props.getTitle('DB Configuration');
    }
    dbConfig(e){
        e.preventDefault();
        console.log(this.state);
        const db = this.state.isAuth ?  
        'mongodb://'+this.state.user+':'+this.state.password+'@'+this.state.host+':'+this.state.port+'/'+this.state.name+'' : 
        'mongodb://'+this.state.host+':'+this.state.port+'/'+this.state.name+'';
        console.log(db);
        this.props.addDbConfig(db);
    }
    changeField(e,field){
        switch (field) {
            case 'name':
                this.setState({name:e.target.value});
                break;
            case 'user':
            this.setState({user:e.target.value});
                break;
            case 'password':
            this.setState({password:e.target.value});
                break;
            case 'port':
            this.setState({port:e.target.value});
                    break;
            case 'host':
            this.setState({host:e.target.value});
                    break;
            default:
                break;
        }
    }
    test(e,value){
        this.setState({isAuth: value=='yes' ? true : false});
    }
    render(){
        return(
            <div className='body'>
                <form>
                    <div className='field'>
                        <label>name</label>
                        <input type='text'  onChange={(e)=>this.changeField(e,'name')}/>
                    </div>
                    <div className='field'>
                        <label>Auth</label>
                        <div className='field'>
                            <div>
                                <label>Yes</label>
                                <input type='radio' name='auth' onChange={(e)=>this.test(e,'yes')}/>
                            </div>
                            <div>
                                <label>No</label>
                                <input type='radio' name='auth' onChange={(e)=>this.test(e,'non')}/>
                            </div>
                        </div>
                    </div>
                   {this.state.isAuth ?
                        <div className='field'>
                            <label>User</label>
                            <input type='text' onChange={(e)=>this.changeField(e,'user')}/>
                        </div>
                   :null}
                   {this.state.isAuth ?
                    <div className='field'>
                        <label>Password</label>
                        <input type='password' onChange={(e)=>this.changeField(e,'password')}/>
                    </div>
               
                    :null}
                    <div className='field'>
                        <label>host</label>
                        <input type='text' value={this.state.host} onChange={(e)=>this.changeField(e,'host')}/>
                    </div>
                    <div className='field'>
                        <label>port</label>
                        <input type='number' value={this.state.port} onChange={(e)=>this.changeField(e,'port')}/>
                    </div>
                    <div className='field'>
                        <label></label>
                        <input type='submit' value='save' onClick={(e)=>this.dbConfig(e)}/>
                    </div>
                </form>
            </div>
        );
    }
}
export default AddDB;