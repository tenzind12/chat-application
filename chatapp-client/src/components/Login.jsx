import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userLogin } from '../store/actions/auth.action';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { ERROR_MESSAGE_CLEAR, SUCCESS_MESSAGE_CLEAR } from '../store/type/auth.types';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState({ email: '', password: '' });

  // redux store
  const { loading, authenticated, error, successMessage, myInfo } = useSelector(
    (state) => state.auth
  );

  console.log(useSelector((state) => state.auth));

  const inputHandler = (e) => {
    setFormFields({
      ...formFields,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(userLogin(formFields));
  };

  useEffect(() => {
    if (authenticated) {
      navigate('/');
    }

    if (successMessage) {
      toast.success(successMessage);
      dispatch({ type: SUCCESS_MESSAGE_CLEAR });
    }

    if (error) {
      error.map((err) => toast.error(err));
      dispatch({ type: ERROR_MESSAGE_CLEAR });
    }
  }, [authenticated, successMessage, error]);

  return (
    <div className="register">
      <div className="card">
        <div className="card-header">
          <h3>Login</h3>
          <div>
            <div className="card-body">
              <form onSubmit={submitHandler}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    id="email"
                    name="email"
                    value={formFields.email}
                    onChange={inputHandler}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="*********"
                    id="password"
                    name="password"
                    value={formFields.password}
                    onChange={inputHandler}
                  />
                </div>

                <div className="form-group">
                  <input type="submit" value="Login" className="btn" />
                </div>

                <div className="form-group">
                  <span>
                    <Link to="/messenger/register">Create a new account?</Link>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
