import '../Assests/Styles/loading.css';
const Loading = ({pageCenter}) => {
  return(
    <div className="text-center">
        <div className={`loading-panel-wrap ${pageCenter? "page-center": null}`}>
            <div className="loading-panel">
                <span><h3>Loading</h3></span> 
            </div>
            <div className="shadow"></div>
        </div>
    </div>
)
}
export default Loading;