import React from "react";
import "./App.css";
import PostsList from "./PostsList";
import { withRouter } from 'react-router'


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rawQuery: "",
            query: "",
            posts: [],
            isLoading: false,
            hasError: false
        }
    }

    componentDidMount() {
        let value = this.props.q;
        this.fetchPosts(value);             
    }    

    fetchPosts = async () => {
        this.setState({
            isLoading: true
        })
        try {                  
            const result = await fetch(`https://aravindtwitter.herokuapp.com/twittersearch?${this.state.rawQuery || this.props.q}`, {           
            });                    
            let response = await result.json();            
            this.setState({
                posts: response.statuses,
                isLoading: false,
                hasError: false
            })            
            this.intervalID = setTimeout(this.fetchPosts.bind(this), 27000);
            
        } 
        catch (error) {
            this.setState({
                isLoading: false,
                hasError: true
            })
        }
    }

    handleChange = (event) => {
        this.setState({
            query:  event.target.value
        })
    }

    submitSearch = (_event, query) => {
        this.setState({
            rawQuery: `key=${query}`
        }, this.reRender)
    }

    reRender = () => {
        this.props.history.push(this.state.rawQuery);
    }

    render() {
        const { query, posts, isLoading, hasError } = this.state;
        let inputValue = query || this.props.q.split("=")[1];
        return(
            <div className="container">            
                <div className="heading-div">
                    <span className="heading">search @twitter</span>
                    <span className="autorefresh">Auto refresh in 27 seconds</span>                    
                </div>
                <hr className="bottom-hr" />
                <form className="form-div">
                    <input
                    type="text"
                    value={inputValue}
                    onChange={event => this.handleChange(event)}
                    placeholder="search..."
                    />
                    <button onClick={event => this.submitSearch(event, query)} type="submit">
                    {/* <i className="fas fa-search"></i> */}
                        SEARCH
                    </button>
                </form>      
                {hasError && <div className="error">Oh no! Something wrong... :(</div>}
                {isLoading ? (
                    <div className="loading">Loading...</div>
                ) : (
                    <PostsList list={posts} />
                )}
            </div>
        )
    }
}

export default withRouter(Home)
