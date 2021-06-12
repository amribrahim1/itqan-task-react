import React, { Component } from "react";

class NewSubscription extends Component {
    state = {
        email: "",
        subscriptions: [],
        errorMessage: "",
        alertErr: false,
        loading: false
    }

    handleChange = e => {
        this.setState({
            email: e.target.value,
            errorMessage: "",
            alertErr: false,
        })
    }
    
    handleSubmit = e =>  {
        e.preventDefault();
        this.setState({
            email: "",
            errorMessage: "",
            alertErr: false,
            loading: true
        })
        fetch(`http://localhost:4000/subscriptions/${this.state.email}`)
        .then(response => response.json())
        .then(data => {
            this.setState({
                loading: false,
                subscriptions: data.subscriptions
            })
        })
        .catch(error => {
            this.setState({
                loading: false,
                alertErr: true,
                errorMessage: error.message
            })
        })
    }

    render() {
        console.log(this.state)
        return (
            <div className="container m-4">
                <form className="row m-2 justify-content-center" onSubmit={this.handleSubmit}>
                    <div className="input-group mb-3">
                        <span className="input-group-text">Email address</span>
                        <input type="email" className="form-control" name="email" value={this.state.email} placeholder="Enter your Email address to get your subscriptions" onChange={this.handleChange} required />
                        <span className="required-indicator" role="presentation"></span>
                    </div>
                    <button type="submit" className="input-group-text btn btn-info">submit</button>
                </form>

                <div className="row m-2">
                    <div className={this.state.loading ? "spinner-border text-info m-auto" : "d-none"} role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    {this.state.subscriptions.length !== 0 && 
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Email address</th>
                                    <th scope="col">#</th>
                                    <th scope="col">Channel</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th rowSpan={this.state.subscriptions.length+1}>{this.state.subscriptions[0].email}</th>
                                </tr>
                                {this.state.subscriptions.map((sub, index) =>
                                    <tr key={sub.id}>
                                        <th scope="row" >{index+1}</th>
                                        <th>{sub.channel}</th>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    }
                </div>
                <div className={this.state.alertErr ? "alert alert-danger text-center" : "d-none"} role="alert">
                    {this.state.errorMessage}
                </div>
            </div>
        )
    }
}

export default NewSubscription