import Cookies from "js-cookie";
import axios from "axios";
import { useState } from "react";

const NewProblem = () => {
    // const [text, setText] = useState('');
    const [done, setDone] = useState('Done');
    const today = new Date();

    const createProblem= async () => {
        const author = Cookies.get('token_name');
        const textName = document.querySelector('.new-blog-text-box');
        const text = textName.value;
        const titleName = document.querySelector('.title-text-box');
        const title = titleName.value;
        const languageName = document.getElementById('language');
        const language = languageName.value;
        const date = `${today.getDate()} ${today.toLocaleString('default', { month: 'long' })} ${today.getFullYear()}, ${today.getHours()}:${today.getMinutes()}`;

        console.log(title);
        console.log(text);
        console.log(author);
        console.log(language);
        console.log(date);

        setDone('Loading...');
        
        await axios.post('https://team-hub.onrender.com/api/problems',
        {
            author,
            text,
            title,
            language,
            date
        }).then((res)=> console.log('Posted!', 'by', author)).catch(err=>console.log(err));
        setDone('Done')
        clearText()
    }

    function clearText() {
        const textarea = document.querySelector('.new-blog-text-box');
        textarea.value = '';

        const titlearea = document.querySelector('.title-text-box');
        titlearea.value = '';
    }


    return ( 
        <div className="new-blog-blox">
            <div>
            </div>
            <div>
                <div>
                    <h2>Post problem</h2>
                </div>
                
                <div>
                    <input placeholder="Title" className="title-text-box"></input>
                </div>
                <div>
                    <textarea name="blog" placeholder="text here" className="new-blog-text-box" ></textarea>
                </div>
                <div className="language-div">
                    <label>Pick a language:_ 
                        <select id="language" defaultValue="python">
                            <option value="python">python</option>
                            <option value="javascript">javascript</option>
                            <option value="java">java</option>
                            <option value="other">other</option>
                        </select>
                    </label>
                </div>
            </div>
            <div>
                <button className="done-button" onClick={createProblem}>{done}</button>
                <button className="done-button clear-button" onClick={clearText}>clear</button>
            </div>
        </div>
    );
}
 
export default NewProblem;