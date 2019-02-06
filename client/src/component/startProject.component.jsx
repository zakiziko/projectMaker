import React,{Component} from 'react';

class StartProject extends Component{
    constructor(props){
        super(props);
        this.state={
            project:'',
            desc:'',
            author:''
        }
    }
    fieldChange(name,e){
        switch (name) {
            case 'project':
                this.setState({project:e.target.value});
                break;
            case 'desc':
                this.setState({desc:e.target.value});
                break;
            case 'author':
                this.setState({author:e.target.value});
                break;
            default:
                break;
        }
        
    }
    save(e){
        e.preventDefault();
        this.props.saveProject(this.state);
    }
    render(){
        return(
            <div className='body'>
                <form > 
                    <div className="field">
                        <label>Name</label>
                        <input type="text" className="form-control" placeholder="Project name" onChange={(e)=>this.fieldChange('project',e)}/>
                    </div>
                    <div className="field">
                        <label>Description</label>
                        <input type="text" className="form-control" placeholder="Description" onChange={(e)=>this.fieldChange('desc',e)}/>
                    </div>
                    <div className="field">
                        <label>Author</label>
                        <input type="text" className="form-control" placeholder="Author" onChange={(e)=>this.fieldChange('author',e)}/>
                    </div>
                    <div className="field">
                        <label></label>
                        <button className='btn' onClick={(e)=>this.save(e)}>NEXT</button>
                    </div>
                    
                </form>
                 {/* <div className='project-start'>
                <div className='section-head'>
                    <h3>PROJECT INFO</h3>
                </div>
               
            </div> */}
            </div>
           
        );
    }
}
export default StartProject;