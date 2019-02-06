import React,{Component} from 'react';
import axios from 'axios';
class ModelDisplayer extends Component{
    constructor(props){
        super(props);
        this.state = {
            projects:[],
            downloadLink:'http://localhost:4001/downloads/',
            isAddRef:false,
            objectForRef:'',
            relationType:'',
            modelRef:''
        }
    }
    componentDidMount(){
       this.loadModels();
    }
    addRef(){
        let newModel =JSON.parse(localStorage.getItem(this.state.objectForRef));
        newModel[this.state.modelRef] = this.state.relationType==='1' ? "{type: mongoose.Schema.Types.ObjectId, ref: '"+this.state.modelRef+"'}" : "[{type: mongoose.Schema.Types.ObjectId, ref: '"+this.state.modelRef+"'}]";
        localStorage.setItem(this.state.objectForRef,JSON.stringify(newModel));
        this.loadModels();
    }
    openRef(obj){
        this.setState({objectForRef:obj,isAddRef:true});
    }
    loadModels(){
        const projectList= localStorage.getItem('projectString')!==null ?localStorage.getItem('projectString').split(';') :[];
        let projects= [];
        
        for(let i = 0;i<projectList.length-1;i++){
            let model ={};
            model = JSON.parse(localStorage.getItem(projectList[i]));
            if(model!==null){
                model['MOD_NAME'] = projectList[i]
                projects.push(model);
            }
            
        }
        this.setState({projects:projects,isAddRef:false});
    }
    generate(e){
        const data={projects:this.state.projects};
        axios.request({
            method:'POST',
            url:'http://localhost:4001/routes',
            data:data
        }).then(res=>{
            alert(res.data.message);
        });
    }
    download(){
        const dowLink = this.state.downloadLink+JSON.parse(localStorage.getItem('project')).project;
        localStorage.clear();
        this.setState({downloadLink:dowLink});
    }
    relationType(e){
        this.setState({relationType:e.target.value});
    }
    objRef(e){
        this.setState({modelRef:e.target.value})
    }
    render(){
        let localString = localStorage.getItem('projectString');
        let refOptions = localString!==null ?localString.split(';').splice(0,localString.split(';').length-1) :[];
        return(
            <div>
            {this.state.projects.length>0 ? 
                <div className='model-displyer'>
                    {this.state.projects.map(item=>{
                        return(
                            <div key={item.MOD_NAME} className='model-container'>
                                <div>
                                    <div className='model-header'>{item.MOD_NAME}</div>
                                    <div className='model-body'>
                                        <ul>
                                        {Object.keys(item).map(p=>{
                                            if(p!=='MOD_NAME'){
                                                return(
                                                    <li key={p}>{p}</li>
                                                )
                                            }
                                            
                                        })}
                                        </ul>
                                    </div>
                                    <div className='model-footer'>
                                        <div className='field'>
                                            <button className="btn btn-sm" id="btnRef" onClick={(e)=>this.openRef(item.MOD_NAME)}>Add</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    </div>
                :null}
            {this.state.projects.length>0 ? 
                <div className='btn-container'>
                    <button className='btn btn-left' onClick={(e)=>this.generate(e)}>Generate</button>
                    <a target="_blank" href={this.state.downloadLink} onClick={()=>this.download()} className='btn btn-right'>Download</a>
                </div>
            :null}

            {this.state.isAddRef ? 
                <div className='field field-3'>
                    <select onChange={(e)=>this.relationType(e)}>
                        <option value='1'>ManyToOne</option>
                        <option value='2'>OneToMany</option>
                    </select>
                    <select onChange={(e)=>this.objRef(e)}>
                        <option>Select ref</option>
                            {refOptions.map(op=>{
                                if(op!==this.state.objectForRef){
                                    return(
                                        <option key={op} value={op}>{op}</option>
                                    )
                                }
                            })}
                    </select>
                    <button className='btn' onClick={(e)=>this.addRef()}> Save</button>
                </div>
            :null}
            </div>    
        );
    }
}

export default ModelDisplayer;