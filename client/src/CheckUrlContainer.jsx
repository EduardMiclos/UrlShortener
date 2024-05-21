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

                                <div className="flex text-sm">
                                    <a href={url} target='_blank'>{url.length > 50 ? url.slice(0, 50) + '...' : url}</a>
                                    
                                    <div className='bg-gray-300 rounded-sm text-center ml-1 cursor-pointer' onClick={() => {navigator.clipboard.writeText(url)}}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="p-1 w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z" />
                                        </svg>
                                    </div>
                                </div>

                            </div>
                        </>
                    ) 
                }

                {
                    shortURL && (
                        <>
                            <div className='mt-3'>
                                Short URL<br/> 
                                
                                <div className="flex text-sm">
                                    <a href={shortURL} target='_blank'>{shortURL}</a>
                                    
                                    <div className='bg-gray-300 rounded-sm text-center ml-1 cursor-pointer' onClick={() => {navigator.clipboard.writeText(shortURL)}}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="p-1 w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z" />
                                        </svg>
                                    </div>
                                </div>

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