import React, { Component } from 'react';

import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import Uploader from '../widgets/fileUploader/fileUploader';
import { fireBaseTeams } from '../../firebase'

import FormFields from '../widgets/FormFields/form_fields'
import style from './dashboard.css'

class Dashboard extends Component {
    state = {
        editorState: EditorState.createEmpty(),
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
            body: {
                element: 'textEditor',
                value: '',
                valid: true
            },
            teams: {
                element: 'select',
                value: '',
                config: {
                    name: 'teams_input',
                    option: []
                },
                validation: {
                    required: true,

                },
                valid: false,
                touched: false,
                validationMessage: ''
            }

        }
    }

    onEditorStateChange = (editorState) => {

        let contentState = editorState.getCurrentContent()
        let rawState = convertToRaw(contentState);

        let html = stateToHTML(contentState);

        this.updateForm({ id: 'body' }, html)

        this.setState({
            editorState
        })
    }

    componentDidMount() {
        this.loadTeams()
    }

    loadTeams = () => {
        fireBaseTeams.once('value')
        .then((snapshot) => {
            let teams = [];
            snapshot.forEach((childSnapshot) => {
                teams.push({
                    id: childSnapshot.val().teamId,
                    name: childSnapshot.val().city,
                })
            })
            const newFormData = {...this.state.formData}
            const newElement = {...newFormData['teams']}

            newElement.config.option = teams;
            newFormData['teams'] = newElement;
           
            this.setState({
                formData: newFormData
            })
        })
    }

    updateForm = (element, content = '') => {
        const newFormData = {
            ...this.state.formData
        }
        const newElements = {
            ...newFormData[element.id]
        }

        if (content === '') {
            newElements.value = element.event.target.value;
        } else {
            newElements.value = content
        }
        if (element.blur) {
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

        if (element.validation.required) {
            const valid = element.value.trim() !== '';
            const message = `${!valid ? 'this field is reqiured' : ''}`;
            error = !valid ? [valid, message] : error
        }
        return error
    }

    submitForm = (event) => {
        event.preventDefault();

        let dataToSubmit = {}
        let formIsValid = true;

        for (let key in this.state.formData) {
            dataToSubmit[key] = this.state.formData[key].value
        }
        for (let key in this.state.formData) {
            formIsValid = this.state.formData[key].valid && formIsValid
        }

        console.log(dataToSubmit);

        if (formIsValid) {
            console.log('submit posts')
        } else {
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
                   <Uploader/>

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
                    
                    <FormFields
                        id={'teams'}
                        formData={this.state.formData.teams}
                        change={(element) => this.updateForm(element)}
                    />
                   

                    <Editor
                        editorState={this.state.editorState}
                        wrapperClassName="myEditor-Wrapper"
                        editorClassName="myEditor-editor"
                        onEditorStateChange={this.onEditorStateChange}
                    />

                    {this.submitButton()}

                </form>
            </div>
        );
    }
}

export default Dashboard;