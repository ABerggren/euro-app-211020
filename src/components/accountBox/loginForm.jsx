import React, { useContext, useEffect, useState } from "react";
import { Marginer } from "../marginer";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";

import { AccountContext } from "./context";
import Axios from "axios";
import { useHistory } from "react-router";

export function LoginForm(props) {
  const { switchToSignup } = useContext(AccountContext);
  const [isLoaded, setIsLoaded] = useState(false);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState('');
  const [error, setError] = useState(null);
  const [Loading, setLoading] = useState(false)

//useContext(() => {
//  fetch("https://my-json-server.typicode.com/proactivehealth/work-test-sample/users")
//    .then(res => res.json())
//    .then(
//      (data) => {
//        setIsLoaded(true);
//        setUsers(data);
//      },
//      (error) => {
//        setIsLoaded(true);
//        setError(error);
//      }
//  )
//}, [])
  
    const fetchUsers = async () => {
    setLoading(true);
    const response = await Axios.get("https://my-json-server.typicode.com/proactivehealth/work-test-sample/users").catch(
      (err) => {
        console.log("Error: ", err);
      }
    );

    if (response) {
      setUsers(response.data);
      console.log(response.data);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleLogin = event => {
    setUser(event.target.value)
  };
  
  console.log(user);
  const history = useHistory();

  const handleSubmit = () => {
    history.push({ pathname:'/customeAccessPage', user:{ user } });
  }

  return (
    <BoxContainer>
      <FormContainer>
        <Input name="userName" placeholder="Användarnamn" onChange={handleLogin}/>
      </FormContainer>
      <MutedLink href="#">Glömt lösenord?</MutedLink>
      <Marginer direction="vertical" margin="1em" />
      <SubmitButton onClick={handleSubmit}>Login</SubmitButton>
      <Marginer direction="vertical" margin={5} />
      <MutedLink href="#">
        Saknar du konto?
        <BoldLink href="#" onClick={switchToSignup}>
          Registrera dig
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
