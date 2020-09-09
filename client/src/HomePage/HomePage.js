import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';


class HomePage extends React.Component {
    
    constructor(props) {
        super(props);
        let usersd = JSON.parse(localStorage.getItem('user'));
        this.state = {
            todos: {
                title: '',
                userId: ''+usersd.userResult.id
            },
            submitted: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        const { todos } = this.state
        this.setState({
            todos: {
                ...todos,
                [name]: value
            }
        });
       
    }
    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const{ todos } =this.state;
        if(todos.title){
            this.props.addTodos(todos);
            this.props.getTodos();
        }
    }
    componentDidMount() {
        this.props.getTodos();
    }

    handleDeleteUser(id) {
        return (e) => this.props.deleteUser(id);
    }

    render() {
        const { adding } = this.props;
        const { users } = this.props;
        const { todos, submitted } =  this.state;
        
        return (
            <div className="col-md-6 col-md-offset-3">
                
                <h2>Login</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !todos.title ? ' has-error' : '')}>
                        <label htmlFor="title">Title</label>
                        <input type="text" className="form-control" name="title" value={todos.title} onChange={this.handleChange} />
                        {submitted && !todos.title &&
                            <div className="help-block">Title is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Add</button>
                        {adding &&
                            <img alt="My Awesome" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                        
                    </div>
                </form>
                ---------Todo List-------------
                {users.items &&
                    <ul>
                        {users.items.map((todo, index) =>
                            <li key={todo.id}>
                                {todo.title}
                            </li>
                        )}
                    </ul>
                }
                <p>
                    <Link to="/login">Logout</Link>
                </p>
            </div>
        );
    }
}

function mapState(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    const { adding } = authentication;
    return { user, users, adding };
}

const actionCreators = {
    getTodos: userActions.getTodos,
    addTodos: userActions.addTodos,
    deleteUser: userActions.delete
}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };