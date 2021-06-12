import React, { Component } from "react";

class Subscriptions extends Component {
    state = {
        email: "",
        emailValid: null,
        emailErr: "",
        channel: "",
        channelValid: null,
        channelErr: "",
        errorMessage: "",
        alertErr: false,
        alertSuccess: false,
        loading: false,
        valid: false,
        subscription: {}
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        })
        if (e.target.name === "email") {
            this.state.valid && this.checkValidation(e.target.value,this.state.channel)
        }
        if (e.target.name === "channel") {
            this.state.valid && this.checkValidation(this.state.email, e.target.value)
        }
    }

    checkValidation = (email, channel) => {
        if (channel === "") {
            this.setState({
                channelValid: false,
                channelErr: "Channel is required!"
            })
        }
        else {
            this.setState({
                channelValid: true,
            })
        }
        if (email === "") {
            this.setState({
                emailValid: false,
                emailErr: "Email is required!"
            })
        }
        else if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))) {
            this.setState({
                emailValid: false,
                emailErr: "An invalid email address!"
            })
        } 
        else {
            this.setState({
                emailValid: true,
            })
        }
    }
    
    handleSubmit = async e =>  {
        e.preventDefault();
        await this.setState({
            valid: true,
        })
        this.checkValidation(this.state.email, this.state.channel)
        if (this.state.emailValid && this.state.channelValid) {
            this.setState({
                errorMessage: "",
                alertErr: false,
                loading: true,
            })
            console.log(this.state)
            fetch("https://itqan-task-server.herokuapp.com/subscriptions/new", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: this.state.email,
                    channel: this.state.channel
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    this.setState({
                        loading: false,
                        alertErr: true,
                        errorMessage: data.error.message,
                        email: "",
                        channel: "",
                        valid: false,
                        emailValid: null,
                        channelValid: null,
                    })
                } else {
                    console.log(data)
                    this.setState({
                        loading: false,
                        alertSuccess: true,
                        subscription: data.subscription,
                        email: "",
                        channel: "",
                        valid: false,
                        emailValid: null,
                        channelValid: null,
                    })
                }
                
            })
            .catch(error => {
                this.setState({
                    loading: false,
                    alertErr: true,
                    errorMessage: error.message
                })
            })
        }
    }

    render() {
        console.log(this.state)
        const { valid, emailValid, emailErr, channelErr, channelValid, subscription, loading, alertErr, alertSuccess, errorMessage } = this.state;
        return (
            <div className="container m-4">
                <form className="row m-2 text-center justify-content-center" onSubmit={this.handleSubmit}>
                    <div className="mb-3">
                        <div className="input-group mb-0">
                            <span className="input-group-text">Email address</span>
                            <input type="text" className={valid ? emailValid ? "form-control is-valid" : "form-control is-invalid" : "form-control"} name="email" value={this.state.email} placeholder="Email address" onChange={this.handleChange} />
                            <span className="required-indicator" role="presentation"></span>
                        </div>
                        <div className={emailValid === false ? "alert alert-danger text-center mt-0 p-1" : "d-none"} role="alert">
                            {emailErr}
                        </div>
                    </div>
                    <div className="mb-3">
                        <div className="input-group mb-3">
                            <span className="input-group-text">Channel</span>
                            <input type="text" className={valid ? channelValid ? "form-control is-valid" : "form-control is-invalid" : "form-control"} name="channel" value={this.state.channel} placeholder="Channel" onChange={this.handleChange} />
                            <span className="required-indicator" role="presentation"></span>
                        </div>
                        <div className={channelValid === false ? "alert alert-danger text-center mt-0 p-1" : "d-none"} role="alert">
                            {channelErr}
                        </div>
                    </div>
                    <button type="submit" className="input-group-text btn btn-info">submit</button>
                </form>

                <div className="row m-2">
                    <div className={loading ? "spinner-border text-info m-auto" : "d-none"} role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
                <div className={alertErr ? "alert alert-danger text-center" : "d-none"} role="alert">
                    {errorMessage}
                </div>
                <div className={alertSuccess ? "alert alert-success" : "d-none"} role="alert">
                    The subscription added successfully: <br/>
                    Email: {subscription.email} <br/>
                    Channel: {subscription.channel}
                </div>
            </div>
        )
    }
}

export default Subscriptions