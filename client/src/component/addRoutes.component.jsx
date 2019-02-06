import React,{Component} from 'react';

class AddRoute extends Component{
    constructor(props){
        super(props);
        this.state={
            projects:[]
        }
    }
    componentDidMount(){
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
        console.log(projects);
        this.setState({projects:projects});
    }
    selectedProj(e){
        let projects = this.state.projects;
        let myProj = {};
        for(let pr in projects){
           myProj = projects[pr]['MOD_NAME'] === e.target.value ? projects[pr] : myProj;
        }
        let listObject = [];
        let listAtts = [];
        for(let tr in myProj){
            const value = myProj[tr];
            if(value.startsWith('{type')){
                listObject.push(tr);
            }else if(tr!=='MOD_NAME'){

                listAtts.push(tr);
            }
        }
        console.log(listObject);
        console.log(listAtts);
    }
    render(){
        return(
            <div className='project-start'>
                <div className='section-head'>
                    <h3>PROJECT  ROUTS PATH</h3>
                </div>
                <div className='body'>
                    <form > 
                        <div className="field">
                            <label>Route api/</label>
                            <input type="text" className="form-control" placeholder="Route"/>
                        </div> 
                        <div className="field">
                            <label>list of projects/</label>
                            <select onChange={(e)=>this.selectedProj(e)}>
                                <option>objects</option>
                                {this.state.projects.map(item=>{
                                    return(
                                        <option key={item.MOD_NAME} value={item.MOD_NAME}>{item.MOD_NAME}</option>
                                    )
                                })}
                            </select>
                        </div> 
                    </form>
                </div>
            </div>
        );
    }
}
export default AddRoute;