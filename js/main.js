
const API = "0ae70435bee6018977309790ecd23cb6"

class App extends React.Component{

    state = {
        country: '',
        city: '',
        temp: '',
        humidity: '',
        icon: '',
        description: ''
    }

    getdata = async (e) =>{
        e.preventDefault();
        const city = document.getElementById('city').value;
        const country = document.getElementById('country').value;
        const api = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${API}`);
        const data = await api.json();

        console.log(data)

        if(city && country){
            document.getElementById('temp').style.visibility = 'visible';
            document.getElementById('icon').style.visibility = 'visible';
            this.setState({
                country: data.sys.country,
                city: data.name,
                temp: data.main.temp,
                humidity: data.main.humidity,
                icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
                description: data.weather[0].description
            })
        }else{
            this.setState({
                country: '',
                city: '',
                temp: '',
                humidity: '',
                description: ''
            })
        }

    }
    render(){
        return(
            <div>
                <Display getdata={this.getdata} 
                    country = {this.state.country}
                    city = {this.state.city}
                    temp = {this.state.temp}
                    humidity = {this.state.humidity}
                    icon = {this.state.icon}
                    description = {this.state.description}
                />
            </div>
        )
    }
}




const Display = (props) =>{
    return(
        <div id="App">
            <main>
                <h1 id="top"><i class="fas fa-cloud"></i> Weather App <i class="fas fa-cloud"></i></h1>
                <div className="Search-box">
                    <center>
                        <input
                            type="text"
                            className="Search-input"
                            id="country"
                            placeholder="Country....."
                        />
                        <input
                            type="text"
                            className="Search-input"
                            id="city"
                            placeholder="City....."
                        />
                        <button onClick={props.getdata}>Search <i class="fas fa-search"></i></button>
                    </center>
                </div>
                <div className="display">
                    <h1 className="country-city">
                        {
                            props.country && <i>Country: {props.country}</i>
                        }
                    </h1>
                    <h1 className="country-city">
                        {
                            props.city && <i>City: {props.city}</i>
                        }
                    </h1>
                    <div className="fix">
                        <div id="icon">
                            {
                                props.icon && <img width="100px" src={props.icon}/>
                            }
                            <br/>
                            {
                                props.description && <span>Description: {props.description}</span>
                            }
                        </div>
                        <div id="temp">
                            {
                                props.temp &&  <span>Temperature: {props.temp}&deg;<sup>c</sup></span>
                            }
                            <br/>
                            {
                                props.humidity && <span>Humidity: {props.humidity}%</span>
                            }
                        </div>
                        <div className="clearfix"></div>
                    </div>
                </div>
            </main>
        </div>
    );  

}

ReactDOM.render(<App/>, document.getElementById('all'))