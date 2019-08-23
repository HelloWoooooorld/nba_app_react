import React, { Component } from 'react';
import {firebase} from '../../firebase';

import FormFields from '../widgets/FormFields/form_fields'
import style from '../SignIn/sign_in.css'

class SignIn extends Component {

    state = {
        registerError: '',
        loading: false,
        formData: {
            email: {
                element: 'input',
                value: '',
                config: {
                    name: 'email_input',
                    type: 'email',
                    placeholder: 'enter your email'
                },
                validation: {
                    required: true,
                    email: true,
                },
                valid: false,
                touched: false,
                validationMessage: ''
            },
            password: {
                element: 'input',
                value: '',
                config: {
                    name: 'password_input',
                    type: 'password',
                    placeholder: 'enter your password'
                },
                validation: {
                    required: true,
                    password: true,
                },
                valid: false,
                touched: false,
                validationMessage: ''
            }
        }
    }

    updateForm = (element) => {
        const newFormData = {
            ...this.state.formData
        }
        const newElements = {
            ...newFormData[element.id]
        }
        newElements.value = element.event.target.value;
        if(element.blur) {
            let validData = this.validate(newElements);
            newElements.valid = validData[0]
            newElements.validationMessage = validData[1]
           
        }
        newElements.touched = element.blur;
        newFormData[element.id] = newElements;

        console.log(newFormData);

        this.setState({
            formData: newFormData
        })
    }




    validate = (element) => {
        let error = [true, '']

        if(element.validation.email){
            const valid = /\S+@\S+\.\S+/.test(element.value);
            const message = `${!valid ? 'Must be a valid email':''}`;
            error = !valid ? [valid,message] : error
        }

        if(element.validation.password){
            const valid = element.value.length >= 5 ;
            const  message = `${!valid ? 'Must be greater than 5 ': ''}`;
            error = !valid ? [valid,message] : error
        }

        if(element.validation.required){
            const valid = element.value.trim() !== '';
            const  message = `${!valid ? 'this field is reqiured': ''}`;
            error = !valid ? [valid,message] : error
        }
        return error
    }

    submitForm = (event , type) => {
        event.preventDefault();
        if(type !== null) {

            let dataToSubmit = {}
            let formIsValid =true;

            for(let key in this.state.formData){
                dataToSubmit[key] = this.state.formData[key].value
            }
            for(let key in this.state.formData){
                formIsValid = this.state.formData[key].valid && formIsValid
            }
            if(formIsValid){
                this.setState({
                    loading: true,
                    registerError: '',
                })
                if(type){
                    firebase.auth()
                    .signInWithEmailAndPassword(
                        dataToSubmit.email,
                        dataToSubmit.password
                    ).then(() => {
                        this.props.history.push('/')
                    }).catch(err => {
                        this.setState({
                            loading: false,
                            registerError: err.message,
                        })
                    }) 
                }else{
                    firebase.auth()
                    .createUserWithEmailAndPassword(
                        dataToSubmit.email,
                        dataToSubmit.password
                    ).then(() => {
                        this.props.history.push('/')
                    }).catch(err => {
                        this.setState({
                            loading: false,
                            registerError: err.message,
                        })
                    })
                    
                }
            }
        }
    }

    submitButton = () => (
        this.state.loading ? 
            'load ...'   
          :
            <div>
                <button onClick={(event) => this.submitForm(event,false)}>Register now</button>
                <button  onClick={(event) => this.submitForm(event,true)}>Sign In</button>
            </div>

    )

    render() {
        return (
            <div className={style.logContainer}>
                <form onSubmit={(event) => this.submitForm(event,null)}>
                    <h2>Register / Log In</h2>
                    <FormFields
                        id={'email'}
                        formData={this.state.formData.email}
                        change={(element) => this.updateForm(element)}
                    />

                    <FormFields
                        id={'password'}
                        formData={this.state.formData.password}
                        change={(element) => this.updateForm(element)}
                    />
                    
                    {this.submitButton()}
                </form>
            </div>
        );
    }
}

export default SignIn;