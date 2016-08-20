var React=require("react");
var rows=[];
var MainComponent = React.createClass({
 /*INITIAL STATE*/
 getInitialState: function() {
   return {data: [],city:''};
 },
 all: function()
 {
 $.ajax({
   url:'http://api.openweathermap.org/data/2.5/weather?q='+this.state.city+'&appid=5f1da6128a807b99bd3625d84cc3ac98',
   dataType: 'json',
   type: 'GET',
   success: function(data)
   {
     //this.setState({data:data});
     console.log(data);
     $.ajax({
           url: 'http://localhost:8080/data',
           dataType: 'json',
           type: 'POST',
           data:{temp:data.main.temp,pressure:data.main.pressure ,humidity:data.main.humidity,temp_min:data.main.temp_min,temp_max:data.main.temp_max },
           success: function(data)
           {
             rows.push(<tr><td>Temprature</td><td>{data.temp}</td></tr>,
               <tr><td>Pressure</td><td>{data.pressure}</td></tr>,
               <tr><td>Humidity</td><td>{data.humidity}</td></tr>,
               <tr><td>Minimum Temprature</td><td>{data.temp_min}</td></tr>,
               <tr><td>Maximum Temprature</td><td>{data.temp_max}</td></tr>);
             this.setState({data:data});
             console.log(data);
           }.bind(this),
           error: function (xhr, status, err) {
             console.error(this.props.url, status, err.toString());
           }.bind(this)
       });
   }.bind(this),
   error: function(xhr, status, err) {
     console.error(err.toString());
   }.bind(this)
 });
},
handleToState: function(e)
 {
   this.setState({city:e.target.value});
 },
 render: function() {
   return(
         <div>
            <input type="text" onChange={this.handleToState}/>
            <button className="btn btn-default" onClick={this.all}>
            Add
          </button>
          <table className="table table-bordered table-inverse">
          <tbody>{rows}</tbody>
          </table>
         </div>
   );
 }
});
module.exports=MainComponent;
