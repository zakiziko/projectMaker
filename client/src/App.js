import React, { Component } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import StartProject from './component/startProject.component.jsx';
import AddModels from './component/addModels.component.jsx';
import ModelDisplayer from './component/modelDisplayer.component.jsx';
import AddRoute from './component/addRoutes.component.jsx';
import AddDB from './component/addDBConfig.component.jsx';
import axios from 'axios';
import './App.css';
class App extends Component {
    constructor(){
        super();
        this.state={
            showProj:true,
            showModel:false,
            showAddDB:false,
            title:'PROJECT INFO',
        }
    }
    componentDidMount(){
        if(localStorage.getItem('project')==null){
            this.setState({
                showProj:true,
                showModel:false,
                showAddDB:false,
            });
        }
        else if(localStorage.getItem('db')==null){
            this.setState({showAddDB:true,showProj:false});
        }else if(localStorage.getItem('projectString')!==null) {
            this.setState({showModel:true,showProj:false})
        }
    }
    saveProject(data){
        axios.request({
            method:'POST',
            url:'http://localhost:4001/',
            data:data
        }).then(res=>{
            console.log(res);
        });
        localStorage.setItem('project',JSON.stringify(data));
        localStorage.setItem('projectString','');
        this.setState({showAddDB:true,showProj:false});
    }
    getTitle(title){
        this.setState({title:title});
    }
    addDbConfig(db){
        localStorage.setItem('db',JSON.stringify(db));
        this.setState({showModel:true,showProj:false,showAddDB:false});
    }
    render() {
        return (
        <div className='myContainer'>
            <div className='myContainer-header'>
                <h2>PROJECT MAKER</h2>   
            </div>
            <div className='project-start'>
                <div className='section-head'>
                    <h3>{this.state.title}</h3>
                </div>
                {this.state.showProj ? <StartProject saveProject={(e)=>this.saveProject(e)}/> : null}
                {this.state.showAddDB ? <AddDB  getTitle={(e)=>this.getTitle(e)}  addDbConfig= {(e)=>this.addDbConfig(e)}/> :null}
                {this.state.showModel ?  <AddModels showModel={this.state.showModel} getTitle={(e)=>this.getTitle(e)}/> :null}
                <ModelDisplayer/>
            </div>
           <div className='myContainer-footer'>
               @ Version 1.0
           </div>
        </div>
        );
    }
}

export default App;
