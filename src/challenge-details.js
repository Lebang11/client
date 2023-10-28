import { useEffect, useState,  } from "react";
import { uploadBytes, getStorage, ref, getDownloadURL, getBlob } from "firebase/storage";
import { storage } from "./firebase";
import { v4 } from "uuid";
import Problem from "./problem";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import ChallengeAnswers from "./answers-challenge";

const ChallengeDetails = () => {
    const [dbChallenges, setDbChallenges] = useState([]);
    const [refresh, setRefresh] = useState('refresh')
    const [fileDownload, setFileDownload] = useState();
    const [downloadMessage, setDownloadMessage] = useState('Get File');
    const [showAnswers, setShowanswers] = useState(false)

    const getChallenges =  async () => {
        
        await fetch('https://team-hub.onrender.com/api/challenges')
        .then(response => response.json())
        .then(res => {
            setDbChallenges(res)
            setRefresh('refresh');
            
        }
            )
        .catch(err => console.log(err));

        
        }

        
    
    useEffect(()=> {
        try {
            getChallenges();
        } catch(err) {
            console.log(err);
        }
        
    }, [])



    function refreshBlogs() {
        setRefresh('Refreshing...')
        getChallenges();
        
    }
    
    const { id } = useParams();

    return ( 
        <div>
            <div>
            {
            dbChallenges.map((blo) => {
                console.log(blo._id)
                
                if (blo._id === id) {

                return (
                    <div>
                        
                        <div>
                            <Link to="/challenges">
                                <button className="ms-4 btn btn-secondary rounded-pill">Back</button>
                            </Link>
                        
                        </div>
                        <h3 className="display-4 text-center">
                            {blo.title}
                        </h3>
                        <div className="container-lg blog-box w-100 rounded-0 border border-bottom">
                        <p className="lead text-muted">{blo.description}</p>
                        <Link className='author-link' to={`/user/${blo.authorID}`}>
                            <h3 className="display-6">Written by  <span className="author_name">{blo.author}</span></h3>
                        </Link>
                        <div className="blog-date">
                            <div >{blo.date}</div>
                        </div>
                        {/* <button className="btn btn-success mx-1" onClick={(atag) => {
                            setDownloadMessage('Loading...')
                
                            getDownloadURL(ref(storage, `files/${blo.filename}`))
                            .then((url) => {
                                setFileDownload(url)
                                setDownloadMessage('View '+ blo.filename)   
                            })
                            .then(res => {
                                const downloadLink = document.getElementById('atag')
                                downloadLink.setAttribute(
                                    'download',
                                    blo.filename,
                                  );
                            })
                            .catch(err => console.log(err))
                        }}>
                            <a id="atag" href={fileDownload}>{downloadMessage}</a>
                        </button> */}
                        <button className="btn btn-info text-light" onClick={()=> {
                            if (showAnswers===false) {
                                setShowanswers(true)}
                            else {
                                setShowanswers(false)
                            }    
                                }}>
                            Show Answers (<span>{blo.answerCount}</span>)
                        </button>
                        
                        <div>
                                    {showAnswers && <ChallengeAnswers answerCount={blo.answerCount} challengeID={blo._id} challengeAuthorID={blo.authorID}/>}
                        </div>
                    </div> 
                    </div>
                )}
            }) }   
            </div>
        </div>
    );
}
 
export default ChallengeDetails;