import styles from './Styles/jumbotron.module.css';
const JumbotronComponent = () =>{
    return (
        <div className='container'>
            <div className={`${styles.wrapper} row`}>
                <div className="col-12">
                <div className={`col-12 col-md-6 ${styles.home_cover}`}>
                    <img src="https://res.cloudinary.com/dstmsi8qv/image/upload/v1642103532/Supply%20Chain/20945860_uqyjno.jpg" width="100%"/>
                </div>
                <div className={`col-12 col-md-6 ${styles.about_wrapper}`}>
                    <span className={styles.title}>
                    Global Food Supply Chain Solutions
                    </span>
                    <br/>
                    <span className={styles.about}>
                    The supply chain has been extended geographically involving many more stakeholders, making the supply chain longer and complicated and thus involving many challenges.
                    </span>
                    <br/>
                    <span className={styles.connect}>
                    <a href="https://github.com/lakshya-20/supply-chain" target="blank">Know More</a>
                    </span>            
                </div>
                </div>
            </div>
        </div>
    )
}

export default JumbotronComponent;