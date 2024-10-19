import React from "react";

function InputForm(props) {
    return (
        <div >
            <input 
                className={props.className}
                id={props.id}
                type={props.type}
                name={props.name}
                placeholder={props.placeholder}
                required
                value={props.value || ''}
                onChange={props.onChange}
                disabled={props.disabled} 
            />
        </div>
    );
}

export default InputForm;
