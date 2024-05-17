import './Forms.css';

function Field({ name, children }) {
  return <fieldset className='form-fieldset'>
    <label>{name}</label>
    <div className='inputs'>{children}</div>
  </fieldset>;
}

export default { Field };
