import React from 'react';

import style from './form_fields.css'

const FormFields = ({formData,change,id}) => {

    const showError = () => {
        let errorMessage = null;

        if(formData.validation && !formData.valid){
            errorMessage = (
                <div className={style.labelError}>
                    {formData.validationMessage}
                </div>
            )
        }

        return errorMessage;
    }


    const renderTemplate = () => {
        let formTemplate = null;

        switch(formData.element){
            case('input'):
                formTemplate = (
                    <div>
                        <input
                            {...formData.config}
                            value={formData.value}
                            onBlur={(event) => change({event,id,blur:true})}
                            onChange={(event) => change({event,id,blur:false})}
                        />
                        { showError() }
                    </div>
                )
                break;
            case('select'):
                formTemplate = (
                    <div>
                        <select
                            value={formData.value}
                            name={formData.config.name}
                            onBlur={(event) => change({event,id,blur:true})}
                            onChange={(event) => change({event,id,blur:false})}
                        >
                            { formData.config.options.map((item,i)=>(
                                <option key={i} value={item.id}>{item.name}</option>
                            ))}
                        </select>
                    </div>
                )
                break;
            default:
                formTemplate = null;
        }
        return formTemplate;
    }

    return(
        <div>
            {renderTemplate()}
        </div>
    )
};

export default FormFields;