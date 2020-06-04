import  React, { Component } from  'react';
import  LeadsService  from  './LeadsService';

const  leadsService  =  new  LeadsService();

class  LeadsList  extends  Component {

constructor(props) {
    super(props);
    this.state  = {
        leads: [],
        nextPageURL:  ''
    };
    this.nextPage  =  this.nextPage.bind(this);
    this.handleDelete  =  this.handleDelete.bind(this);
}

componentDidMount() {
    var  self  =  this;

    leadsService.getLeads().then(function (result) {
        console.log(result);
        self.setState({ leads:  result, nextPageURL:  result.nextlink})
    });
}
handleDelete(e,id){
    var  self  =  this;
    leadsService.deleteLead({id :  id}).then(()=>{
        var  newArr  =  self.state.leads.filter(function(obj) {
            return  obj.id  !==  id;
        });

        self.setState({leads:  newArr})
    });
}

nextPage(){
    var  self  =  this;
    console.log(this.state.nextPageURL);
    leadsService.getLeadsByURL(this.state.nextPageURL).then((result) => {
        self.setState({ leads:  result, nextPageURL:  result.nextlink})
    });
}
btnStyle = {
		backgroundColor: 'lightseagreen'
	}
render() {

    return (
        <div  className="leads--list">
            <table  className="table">
            <thead  key="thead">
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>

            </tr>
            </thead>
            <tbody>
            {this.state.leads.map( c  =>
                <tr  key={c.id}>
                <td>{c.id}  </td>
                <td>{c.name}</td>
                <td>{c.email}</td>
                <td>{c.message}</td>

                <td>
                <button  onClick={(e)=>  this.handleDelete(e,c.id) }> Delete</button>
                <a  href={"/leads/" + c.id} > Update</a>
                </td>
            </tr>)}
            </tbody>
            </table>
            <button className="btn btn-primary" style={this.btnStyle} onClick=  {  this.nextPage  }>Next</button>
        </div>
        );
  }
}
export  default  LeadsList;