import axios from 'axios';
import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';

export function ShortenUrlContainer() {
    const {redirectURLCode} = useParams();

    const [url, setURL] = useState("");
    const navigate = useNavigate();

    function isValidURL(string) {
        var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        return (res !== null)
      };

    async function shortenURL(ev) {
        ev.preventDefault();
        
        if (isValidURL(url)) {
            axios.post('/shorten', {
                url: url
            }).then((urlMapping) => {
                navigate('/url/' + urlMapping.data.shortURL);
            });
        }
    }

    if (redirectURLCode) {
        axios.get('/url/' + redirectURLCode).then((urlMapping) => {
            window.location.href = urlMapping.data.URL;
        })

        return null;
    }
    else {
        return (
            <>
            <div className="flex items-center justify-center min-h-screen font-sans">
            <div className="url-submit-form-container container max-w-lg p-20 bg-white bg-opacity-90 rounded-lg shadow-lg flex items-center justify-center flex-col relative">
                <img src="smallURL.png" width="120vw" className="absolute top-7"></img>
                <form className="flex items-center gap-2" onSubmit={shortenURL}>
                <input
                    type="text"
                    value={url} 
                    onChange={ev => setURL(ev.target.value)} 
                    placeholder="Paste URL..."
                    className="flex-grow bg-gray-100 border border-gray-300 rounded-xl pr-5 pl-5 py-3 text-gray-500 focus:outline-none focus:border-green-500"
                />
                <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-400 border-none text-white p-3 rounded-lg flex items-center justify-center"
                >
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-6 h-6"
                    >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                    </svg>
                </button>
                </form>
            
                <div className="text-gray-500 mt-3">
                or<br/>
                <span className="container mt-5  cursor-pointer"><a href="/url" className="text-green-600 hover:text-gray-400">Check a short URL</a></span>
                </div>
                <img src="miclosedi.png" width="53px" className="absolute bottom-5 left-7"></img>
                <span className="absolute bottom-7 left-24 text-gray-500">Powered by <a href="https://www.miclosedi.com" target="_blank" className="text-gray-500">miclosedi.com</a></span>
            </div> 
            </div>
                </>
        )   
    }
}