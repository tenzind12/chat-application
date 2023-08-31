import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { userRegister } from '../store/actions/auth.action';

const Register = () => {
  const dispatch = useDispatch();

  const [formFields, setFormFields] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    image: '',
  });

  const [loadImage, setLoadImage] = useState('');

  const inputHandler = (e) => {
    setFormFields({
      ...formFields,
      [e.target.name]: e.target.value,
    });
  };

  const imageHandler = (e) => {
    if (e.target.files.length > 0) {
      setFormFields({
        ...formFields,
        image: e.target.files[0],
      });
    }

    const reader = new FileReader();
    reader.onload = () => {
      setLoadImage(reader.result);
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const register = (e) => {
    const { username, email, password, confirmPassword, image } = formFields;
    e.preventDefault();

    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('confirmPassword', confirmPassword);
    formData.append('image', image);

    dispatch(userRegister(formData));
  };

  return (
    <div className="register">
      <div className="card">
        <div className="card-header">
          <h3>Register</h3>
          <div>
            <div className="card-body">
              <form onSubmit={register}>
                <div className="form-group">
                  <label htmlFor="username">User Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="User Name"
                    id="username"
                    onChange={inputHandler}
                    name="username"
                    value={formFields.username}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    onChange={inputHandler}
                    name="email"
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    id="email"
                    value={formFields.email}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    onChange={inputHandler}
                    name="password"
                    type="password"
                    className="form-control"
                    placeholder="*********"
                    id="password"
                    value={formFields.password}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    onChange={inputHandler}
                    name="confirmPassword"
                    type="password"
                    className="form-control"
                    placeholder="*********"
                    id="confirmPassword"
                    value={formFields.confirmPassword}
                  />
                </div>

                <div className="form-group">
                  <div className="file-image">
                    <div className="image">
                      {loadImage ? <img src={loadImage} alt="user upload" /> : ''}
                    </div>
                    <div className="file">
                      <label htmlFor="image">Select image</label>
                      <input
                        name="image"
                        onChange={imageHandler}
                        type="file"
                        id="image"
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <input type="submit" value="Register" className="btn" />
                </div>

                <div className="form-group">
                  <span>
                    <Link to="/messenger/login">Already have an account? Sign in</Link>
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

export default Register;
