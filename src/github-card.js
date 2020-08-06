import React, {Component} from 'react';
import {Card, CardTitle} from 'reactstrap';
import './github.css';
import anu from './assets/img/anu.png';
import Particles from 'react-particles-js';

const API = 'https://api.github.com/users/';

class githubcard extends Component {
    constructor(props){
        super(props)

        this.state = {

            username: 'verma-ananya',
            name:'',
            avatar:'',
            location:'',
            repos:'',
            followers: '',
            following:'',
            homeUrl:'',
            notFound:'',

        }
    }

    fetchProfile(username){

        let url = API + username;

        console.log(url);

        fetch(url)
        .then( (response) => response.json())
        .then((data) => {

            this.setState({
                username: data.login,
                name: data.name,
                avatar:data.avatar_url,
                location: data.location,
                repos: data.public_repos,
                followers: data.followers,
                following: data.following,
                homeUrl: data.html_url,
                notFound: data.message,
            })
        })
        .catch((err) => console.log('error occured while fetching the user profile'))
        

        console.log("Contents");
        console.log(this.state);
    
    }

    componentDidMount(){
        this.fetchProfile(this.state.username);
    }
    
    render() { 
        return ( 
        <div className="container">
            <div className="row">
                <div className="col-12" style={{height: '100vh'}}>
                    <div className="card text-white bg-dark" style={{width: '25rem'}}>
                        <div className="card-body">
                            <Search fetchProfile={this.fetchProfile.bind(this)}/>
                            <Profile data={this.state}/>
                        </div>
                    </div>
                </div>
            </div>
        </div> );
    }
}
 
export default githubcard;

class Search extends Component {
    
    //this keyword in the event handlers within the javascript is undefined. 

    constructor(props){

        super(props);

        this.input = React.createRef();
    }

    handleform(e){
        e.preventDefault(); //preventDefault() is used with input & button elements to prevent a browser reload/refresh. //event handlers
        console.log("there there there",this.input.current.value)
        
        let username = this.input.current.value;

        console.log(username)

        this.props.fetchProfile(username);
        this.input.current.value=''

    }

    render() { 
        return ( 
                <div className="search-profile">
                    <form className="navbar-form" role="search" onSubmit={this.handleform.bind(this)}>
                        <div className="input-group add-on">
                            <input className="form-control" ref={this.input} placeholder="Search" name="srch-term" id="srch-term" type="text"/>
                            <div className="input-group-btn">
                                <button className="btn btn-outline-secondary" type="submit"><i class="fa fa-search"></i></button>
                            </div>
                        </div>
                    </form>
                </div>
         );
    }

}

class Profile extends Component {
    state = {  }
    render() { 

        console.log("Profile ");
        console.log(this.props);

        var data = this.props.data;
        var followers = data.homeUrl + "?tab=followers";
        var repositories = data.homeUrl + "?tab=repositories";
        var following = data.homeUrl  + "/?tab=following";
        if (data.notFound === 'Not Found')
        return (
            <div className="notfound">
                <h4>Oops !!!</h4>
                <p>Username not found.<br/> Try Again </p>
            </div>
        );
        else
        return (

            <section className="user-profile">
                <div className="github-profile-info">
                    <a href={data.homeUrl} target="_blank" title={data.name || data.username}><img className="mx-auto d-block" src={data.avatar} alt={data.username}/></a>
                    <h5><a href={data.homeUrl} target="_blank" title={data.name || data.username}> {data.name || data.username }</a></h5>
                    <h6>{data.location || "I'm YOU, so I live within you"}</h6>
                </div>
                <div className="github-profile-state">
                    <ul>
                        <li>
                            <a href={followers} target="_blank" title="Number Of Followers"><b>{data.followers}</b> <span> Followers</span></a>
                        </li>
                        <li>
                            <a href={following} target="_blank" title="Number Of Following"><b>{data.following}</b> <span> Following</span></a>
                        </li>
                        <li>
                            <a href={repositories} target="_blank" title="Number Of Repositoriy"><b>{data.repos}</b> <span> Repository</span></a>
                        </li>
                    </ul>
                </div>
            </section>

        );

    }
}
 