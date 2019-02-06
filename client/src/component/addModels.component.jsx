import React,{Component} from 'react';

let model={};
class AddModels extends Component{
    constructor(props){
        super(props);
        this.state={
            name:'',
            attNbr:[],
            showModelAtts:false,
            project:''
        };
    }
    componentDidMount(){
        this.setState({project:JSON.parse(localStorage.getItem('project')).project});
        this.props.getTitle('ADD MODELS');
    }
    fieldChange(name,e){
        switch (name) {
            case 'name':
                this.setState({name:e.target.value});
                break;
            case 'nbr':
                this.setState({attNbr:this.createList(e.target.value)});
                break;
            default:
                break;
        }
    }
    createList(dimension){
        let list = [];
        for(let i =0;i<dimension;i++){
            list.push(i);
        }
        return list;
    }
    makesForm(e){
        e.preventDefault();
        let projectString = localStorage.getItem('projectString')!==null ? localStorage.getItem('projectString') : '';

        projectString = projectString==='' ? this.state.name+';': projectString+this.state.name+';';
        localStorage.setItem('projectString',projectString);
        this.setState({showModelAtts:true});
    }
    SaveModel(e){
        for(let i=0;i<this.state.attNbr.length;i++){
            model[document.getElementById('att'+i).value]=document.getElementById('SelAtt'+i).value
        }
        localStorage.setItem(this.state.name,JSON.stringify(model));
        model={};
    }
    render(){
        return( 
            <div className='body'>
                <form > 
                    <div className="field">
                        <label>Name</label>
                        <input type="text" placeholder="Object Name" className="form-control" onChange={(e)=>this.fieldChange('name',e)}/>
                    </div>
                    <div className="field">
                        <label>Model Properies</label>
                        <select className="form-control" onChange={(e)=>this.fieldChange('nbr',e)}>
                            <option value="1">SELECT ATTRIBUTES NBR</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>  
                    </div>
                    <div className="field">
                        <label></label>
                        <input type="submit" onClick={(e)=>this.makesForm(e)} className="btn" value="Create"/>
                    </div>
                    
                </form>
                {this.state.showModelAtts ? 
                <div className='body bg-blue'>
                    <div className='form-header'><h4>ADD ATTRIBUTES</h4></div>
                    <form > 
                        {this.state.attNbr.map(item=>{
                            return(
                                <div className='field field-3'>
                                    <label>ATT{item+1}</label>
                                    <input type="text"  id={'att'+item}/>
                                    <select  id={'SelAtt'+item}>
                                        <option value='String'>String</option>
                                        <option value='Number'>Number</option>
                                        <option value='Date'>Date</option>
                                    </select>
                                </div>
                                )
                            })}
                        <div className='field'>
                            <label></label>
                            <input type='submit' value='Save Object' className='btn' onClick={(e)=>this.SaveModel(e)}/>
                        </div>
                        
                    </form>
                </div>
                :null}
            </div>
        );
    }
}
export default AddModels;