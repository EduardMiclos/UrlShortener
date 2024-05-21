import axios from 'axios';
import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router';

export function CheckUrlContainer() {
    const {shortURLCode} = useParams();

    const [url, setURL] = useState("");
    const [clicks, setClicks] = useState(null);
    const [shortURL, setShortURL] = useState(null);
    const [checkURL, setCheckURL] = useState("");

    const navigate = useNavigate();

    useEffect(() => {

        if (shortURLCode != null) {
            axios.get('/url/' + shortURLCode).then((urlMapping) => {
                setURL(urlMapping.data.URL);
                setClicks(urlMapping.data.clicks);
                setShortURL(axios.defaults.baseURL + '/' + urlMapping.data.shortURL);
            })  
        }
    });

    function isValidURL(string) {
        var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        return (res !== null)
      };

    async function checkShortURL(ev) {
        ev.preventDefault();

        if (isValidURL(checkURL)) {
            let urlPieces = checkURL.split('/');
            let urlCode = urlPieces[urlPieces.length - 1];


            navigate('/url/' + urlCode);
        }
        
    }

    return (
        <>
        <div className="flex items-center justify-center min-h-screen font-sans">
          <div className="url-submit-form-container container max-w-lg p-5 bg-white bg-opacity-90 rounded-lg shadow-lg flex items-center justify-center flex-col relative">
            <img src="../smallURL.png" width="120vw" className="absolute top-7"></img>

            {
                shortURLCode == null && (
                    <>
                    <form className="flex items-center gap-2" onSubmit={checkShortURL}>
                        <input
                            type="text"
                            value={checkURL} 
                            onChange={ev => setCheckURL(ev.target.value)} 
                            placeholder="Paste short URL.."
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
                    </>
                )
            }

            <div className='text-black text-start'>
                
                {
                    url && (
                        <>
                            <div className='mt-20'>
                                URL<br/> 
                                <a href={url} target='_blank'>{url}</a> <br/>
                            </div>
                        </>
                    ) 
                }

                {
                    shortURL && (
                        <>
                            <div className='mt-3'>
                                Short URL<br/> 
                                <a href={shortURL} target='_blank'>{shortURL}</a> <br/>
                            </div>
                        </>
                    )
                }

                {
                    clicks != null && (
                        <>
                            <div className='mt-3'>
                                Total number of clicks<br/> 
                                {clicks}
                            </div>
                        </>
                    )
                }

                <div className="container mt-5  cursor-pointer">
                    <a href="/" className="text-green-600 hover:text-gray-400">Shorten a URL </a>
                     or 
                    <a href="/url" className="text-green-600 hover:text-gray-400"> check another short URL</a></div>
            </div>


            <img src="../miclosedi.png" width="53px" className="absolute bottom-5 left-7"></img>
            <span className="absolute bottom-7 left-24 text-gray-500">Powered by <a href="https://www.miclosedi.com" target="_blank" className="text-gray-500">miclosedi.com</a></span>
          </div> 
        </div>
            </>
    )
}