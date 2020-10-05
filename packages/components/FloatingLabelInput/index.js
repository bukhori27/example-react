import React from 'react'
import PropTypes from 'prop-types'
import {Form, Input} from 'antd'
import './style.scss'

const FormItem = Form.Item

const FloatingLabelInput = ({form, defaultValue, fieldName, label, onkeyup, message, limitCharacter,autocomplete, placeholder}) => {

    let rules = []
    if(limitCharacter){
        rules = [
            { max: limitCharacter.max, message: limitCharacter.messageMax },
            { min: limitCharacter.min, message: limitCharacter.messageMin },
        ]
    }
    rules.push({ required: true, message: message })
    return (
        <FormItem label={label}>
            {form.getFieldDecorator(fieldName, {
                initialValue: defaultValue,
                rules: rules
            })(<Input autoComplete={autocomplete} size="default" onChange={onkeyup} placeholder={placeholder}/>)}
        </FormItem>
    )
}

FloatingLabelInput.propTypes = {
    form: PropTypes.object,
    defaultValue: PropTypes.string,
    fieldName: PropTypes.string
}

export default FloatingLabelInput