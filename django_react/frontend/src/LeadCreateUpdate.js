import React, { Component } from 'react';
import LeadsService from './LeadsService';

const leadsService = new LeadsService();

class LeadCreateUpdate extends Component {
    constructor(props) {
        super(props);
        this.name = React.createRef();
        this.email = React.createRef();
        this.message = React.createRef();


        this.handleSubmit = this.handleSubmit.bind(this);
      }


      componentDidMount(){
        const { match: { params } } = this.props;
        if(params && params.id)
        {
          leadsService.getLead(params.id).then((c)=>{

            this.name.current.value = c.name;
            this.email.current.value = c.email;
            this.message.current.value = c.message;
          })
        }
      }

      handleCreate(){
        leadsService.createLead(
          {

            "name": this.name.current.value,
            "email": this.email.current.value,
            "message": this.message.current.value,


        }
        ).then((result)=>{
          alert("Lead created!");
        }).catch(()=>{
          alert('There was an error! Please re-check your form.');
        });
      }
      handleUpdate(id){
        leadsService.updateLead(
          {
            "id": id,
            "name": this.name.current.value,
            "email": this.email.current.value,
            "message": this.message.current.value,


        }
        ).then((result)=>{
          console.log(result);
          alert("Lead updated!");
        }).catch(()=>{
          alert('There was an error! Please re-check your form.');
        });
      }
      handleSubmit(event) {
        const { match: { params } } = this.props;

        if(params && params.id){
          this.handleUpdate(params.id);
        }
        else
        {
          this.handleCreate();
        }

        event.preventDefault();
      }

      render() {

        return (
          <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>
              Name:</label>
              <input className="form-control" type="text" ref={this.name} />

            <label>
              Email:</label>
              <input className="form-control" type="text" ref={this.email} />

            <label>
              Message:</label>
              <input className="form-control" type="text" ref={this.message}/>


            <input className="btn btn-primary" type="submit" value="Submit" />
            </div>
          </form>
        );
      }
}

export default LeadCreateUpdate;