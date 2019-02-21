import styles from './index.css';
import Header from '../components/Header/index'

function BasicLayout(props) {
  console.log(props.location.pathname)
  return (
    <div className={styles.normal}>
      {/* <Header></Header> */}
      {props.children}
    </div>
  );
}

export default BasicLayout;

