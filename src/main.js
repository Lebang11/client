import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import ShowBlogs from "./blogs";
import NewBlog from "./new-blog";
import { Link } from "react-router-dom";

function MainPage() {
    const [username, setUser] = useState('');
    const [showBlogs, setShowBlogs] = useState(false);
    const [email, setEmail] = useState('');
    const [newBlog, setNewBlog] = useState(false);
    const [id, setId] = useState('');
    
    useEffect(() => {
                
        setUser(Cookies.get(`token_name`));
        setEmail(Cookies.get(`token_email`));
        setId(Cookies.get(`token_id`));
    }, []);
    
    if (!Cookies.get(`token_name`) || !Cookies.get(`token_email`)){
        return (
            <div>
                <h1>Please Login</h1>
                <Link to='/login'>Login</Link> 
            </div>
            
        )
    } 
    
    
    const getInfo = async () => {

        if (showBlogs === true) {
            setShowBlogs(false);
        } else {
            setShowBlogs(true);
            setNewBlog(false)
        } 
    }

    const createBlog = () => {
        if (newBlog === true) {
            setNewBlog(false);
        } else {
            setNewBlog(true);
            setShowBlogs(false)
        } 
    }
    
    
    
    
    
    
    // const username = getInfo('name')
    // const email = getInfo('email')
    // const id = getInfo('id')

    return (
        <div>
            <div className="main-header">
                <h1>
                    Welcome to Team-Hub
                </h1>
            </div>
            <div className="blogs-box">
                <h1 className="blogs-title">Blogs</h1>
                <div>
                    <button onClick={getInfo} className="blogs-button">view blogs</button>
                    <button onClick={createBlog} className="blogs-button">new blog</button>
                    <Link to="/problems">
                        <button onClick={createBlog} className="blogs-button">view problems</button>
                    </Link>
                    <Link to={`/user/${id}`}>
                        <button className="blogs-button">view profile</button>
                    </Link>
                </div>
                    {newBlog && <NewBlog />}
                <div>

                    {showBlogs && <ShowBlogs/>}
                </div>
            </div>
        </div>
    )
}

export default MainPage;