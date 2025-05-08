import styles from './index.module.scss';
import LoginComponents from "@components/LoginComponents/index.jsx";

const LoginPage = ({page}) => {
  if (page === "login"){
    return (
      <div className={styles.root}>
        <div className="App">
          <LoginComponents/>
        </div>
      </div>
    )
  }
  else if (page === "register"){
    return (
      <></>
    )
  }
  else {
    return (
      <></>
    )
  }
}

export default LoginPage;