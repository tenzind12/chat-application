import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div className="register">
      <div className="card">
        <div className="card-header">
          <h3>Register</h3>
          <div>
            <div className="card-body">
              <form action="">
                <div className="form-group">
                  <label htmlFor="username">User Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="User Name"
                    id="username"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" className="form-control" placeholder="Email" id="email" />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="*********"
                    id="password"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="*********"
                    id="confirmPassword"
                  />
                </div>

                <div className="form-group">
                  <div className="file-image">
                    <div className="image"></div>
                    <div className="file">
                      <label htmlFor="image">Select image</label>
                      <input type="file" id="image" className="form-control" />
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
