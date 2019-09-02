import React, { Component } from 'react';

import FormFields from '../widgets/FormFields/form_fields'
import style from './dashboard.css'

class Dashboard extends Component {
    state = {
       postError: '',
        loading: false,
        formData: {
            author: {
                element: 'input',
                value: '',
                config: {
                    name: 'author_input',
                    type: 'text',
                    placeholder: 'Enter your name'
                },
                validation: {
                    required: true,
                   
                },
                valid: false,
                touched: false,
                validationMessage: ''
            },
            title: {
                element: 'input',
                value: '',
                config: {
                    name: 'title_input',
                    type: 'text',
                    placeholder: 'Enter your title'
                },
                validation: {
                    required: true,
                   
                },
                valid: false,
                touched: false,
                validationMessage: ''
            },
           
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

       

        this.setState({
            formData: newFormData
        })
    }
    submitButton = () => (
        this.state.loading ? 
            'load ...'   
          :
            <div>
                <button type="submit">Add Post</button>
            </div>

    )
    
    validate = (element) => {
        let error = [true, '']

        if(element.validation.required){
            const valid = element.value.trim() !== '';
            const  message = `${!valid ? 'this field is reqiured': ''}`;
            error = !valid ? [valid,message] : error
        }
        return error
    }    

submitForm = (event) => {
    event.preventDefault();

    let dataToSubmit = {}
    let formIsValid =true;

    for(let key in this.state.formData){
        dataToSubmit[key] = this.state.formData[key].value
    }
    for(let key in this.state.formData){
        formIsValid = this.state.formData[key].valid && formIsValid
    }

    console.log(dataToSubmit);

    if(formIsValid){
        console.log('submit posts')
    }else{
        this.setState({
            postError: 'Sometimes wrong'
        })
    }
}


render() {
    return (
        <div className={style.countainer}>
            <form onSubmit={this.submitForm}>
                <h2>Add Post</h2>

                <FormFields
                        id={'author'}
                        formData={this.state.formData.author}
                        change={(element) => this.updateForm(element)}
                    />
                   <FormFields
                        id={'title'}
                        formData={this.state.formData.title}
                        change={(element) => this.updateForm(element)}
                    />    
                    {this.submitButton()}

                </form>
        </div>
    );
}
}

export default Dashboard;