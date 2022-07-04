import React, { Component } from 'react';
import { shape, func } from 'prop-types';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      inputName: '',
      isButtonDisabled: true,
      loading: false,
    };
  }

  buttonValidation = ({ target }) => {
    const minChars = 3;
    const { value } = target;
    if (value.length >= minChars) {
      this.setState({
        inputName: value,
        isButtonDisabled: false,
      });
    } else {
      this.setState({
        inputName: value,
        isButtonDisabled: true,
      });
    }
  };

  changeLoadingStatus = () => {
    this.setState((prevState) => ({ loading: !prevState.loading }));
  }

  onHandleClick = async (name) => {
    const { history } = this.props;
    this.changeLoadingStatus();
    await createUser({ name });
    history.push('/search');
  };

  render() {
    const { inputName, isButtonDisabled, loading } = this.state;
    return (
      <div data-testid="page-login">
        <form action="">
          { loading && <Loading />}
          <label htmlFor="name">
            Nome
            <input
              id="name"
              type="text"
              data-testid="login-name-input"
              onChange={ this.buttonValidation }
            />
          </label>
          <button
            type="button"
            data-testid="login-submit-button"
            disabled={ isButtonDisabled }
            onClick={ () => this.onHandleClick(inputName) }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: shape({
    push: func,
  }),
}.isRequired;

export default Login;
