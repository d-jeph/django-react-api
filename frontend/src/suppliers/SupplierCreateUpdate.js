import React, { Component } from 'react';
import  SuppliersService  from  './SuppliersService';
import { Redirect } from 'react-router'

const  suppliersService  =  new  SuppliersService();

class SupplierCreateUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectToIndex: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
      }

      componentDidMount(){
        const { match: { params } } = this.props;
        //console.log(params.pk);
        if(params && params.pk && !isNaN(parseInt(params.pk)))
        {

          suppliersService.getSupplier(params.pk).then((c)=>{
            console.log(c);
            console.log('REFS', this.refs.name);
            this.refs.name.value = c.name;
          })
        }
      }

      handleCreate(){
        suppliersService.createSupplier(
          {
            "name": this.refs.name.value
        }          
        ).then((result)=>{
          alert("supplier created!");
          this.setState({
                redirectToIndex: true,
                notify:true
            })
        }).catch(()=>{
          alert('There was an error! Please re-check your form.');
        });
      }
      handleUpdate(pk){
        suppliersService.updateSupplier(
          {
            "pk": pk,
            "name": this.refs.name.value
        }          
        ).then((result)=>{
          //console.log(result);
          alert("supplier updated!");
           this.setState({
                redirectToIndex: true,
                notify:true
            })
        }).catch(()=>{
          alert('There was an error! Please re-check your form.');
        });
      }
      handleSubmit(event) {
        const { match: { params } } = this.props;

        if(params && params.pk && !isNaN(parseInt(params.pk))){
          this.handleUpdate(params.pk);
        }
        else
        {
          this.handleCreate();
        }

        event.preventDefault();
      }

      render() {
        const redirectToIndex = this.state.redirectToIndex;
        if (redirectToIndex === true) {
            return <Redirect to="/suppliers/" />
        }
        return (
          <form onSubmit={this.handleSubmit}>
          <div className="form-group">
             <label>
              Supplier Name:</label><input className="form-control" type="text" ref='name' />
             <input className="btn btn-primary mt-2" type="submit" value="Submit" />

            </div>
          </form>
        );
      }  
}

export default SupplierCreateUpdate;