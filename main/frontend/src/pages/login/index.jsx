import React, { useContext } from "react";
import InputField from "components/inputField";
import { useHistory } from "react-router-dom";
import Button from "components/button";
import { Login } from "services/users";
import { getRoleByID } from "services/roles";
import { FormSerializer } from "helpers";
import Context from "providers/context";

const LoginPage = () => {
  const [, { initLogin }] = useContext(Context);
  const history = useHistory();
  const handleLogin = (event) => {
    event.preventDefault();
    const { username, password } = FormSerializer(event.currentTarget);
    let user, roleName;
    Promise.resolve()
      .then(async () => {
        user = await Login({
          username,
          password,
        });
      })
      .then(async () => {
        let res = await getRoleByID(user[0].role_id);
        roleName = res.name;
      })
      .then(() => {
        initLogin({
          role: roleName,
          allowLogin: true,
        });
        history.push("/users");
      })
      .catch((e) => console.error(e));
  };

  return (
    <div id="main">
      <div className="form-wrapper">
        <h1>please login to continue</h1>
        <form onSubmit={(e) => handleLogin(e)}>
          <InputField
            placeHolder="Your username"
            name="username"
            type="text"
            required
          />
          <InputField
            placeHolder="Your password"
            name="password"
            type="password"
            required
          />
          <Button>Login</Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
