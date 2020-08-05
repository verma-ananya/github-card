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
            <div className="card text-white bg-dark" style={{width: '25rem'}}>
                <div className="card-body">
                    <Search fetchProfile={this.fetchProfile.bind(this)}/>
                    {/* <img className="card-img" src={anu} alt="Card image cap" />
                    <h5 className="card-title">Dark card title</h5>
                    <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eu sem tempor, varius quam at.</p>
                    <a href="#" className="btn btn-primary">View Github Profile</a> */}
                    <Profile data={this.state}/>
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
                    {/* <form onSubmit={ () => this.handleform(this) }>
                        <input class="form-control border-secondary py-2" ref="username" type="search" placeholder="search user" />
                            <div class="input-group-append">
                                <button class="btn btn-outline-secondary" type="button">
                                    <i class="fa fa-search"></i>
                                </button>
                            </div>
                    </form> */}
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
 


// class GithubCard extends React.Component{

//     constructor(props){
//         super(props)
//         this.state = {
//             username: 'verma-ananya',
//             name:'',
//             avatar:'',
//             location:'',
//             repos:'',
//             followers: '',
//             following:'',
//             homeUrl:'',
//             notFound:''
//         }
//     }

//     profileFetch(username) {  //function declaration which is used to fetch user data by the url

//         let url = '${API}/${username}';
//         fetch(url)
//         .then((res) => res.json())
//         .then((data) => {
//             this.setState({
//                 username: data.login,
//                 name: data.name,
//                 avatar: data.avatar_url,
//                 location: data.location,
//                 repos: data.public_repos,
//                 followers: data.followers,
//                 following: data.following,
//                 homeUrl: data.html_url,
//                 notFound: data.message
//             })
//         })
//         .catch((err) => console.log('Problem occured while fetching the user profile'))
//     }

//     //componentDidMount = This is where AJAX requests and DOM or state updates should occur. 
//     componentDidMount(){
//         this.profileFetch(this.state.username);
//     }
//     render(){
//         return (
            
//         )
//     }





// }
