import React, { useState, useEffect, useRef, useCallback} from 'react'
import { createRoot } from 'react-dom/client'
import axios from 'axios'
const lunr = require("lunr")
require("lunr-languages/lunr.stemmer.support")(lunr)
require("lunr-languages/tinyseg")(lunr)
require("lunr-languages/lunr.ja")(lunr)

function debounce(fn, delay) {
    let timer
    const debouncd = (e) => {
        if (timer) {
            // console.log("clear timer", timer)
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fn(e)
        }, delay)
    }
    return debouncd
}

export default function SearchModal({show, close}) {

    const inputRef = useRef(null);

    const [searchResults, setSearchResults] = useState([])
    const [mySearchInfo, setMySearchInfo] = useState({
        searchData: {},
        searchIndex: {}
    })

    const keywordUpdated = (keyword) => {
        console.log(`keyword updated: ${keyword}`)
        if (keyword.trim().length == 0) {
            setSearchResults([])
        } else {
            const list = mySearchInfo.searchIndex.search(keyword).map((entry) => {
                // console.log(entry)
                const obj = mySearchInfo.searchData.results.filter(d => entry.ref == d.href)[0]
                return { 'href': obj.href, 'title': obj.title }
            })
            setSearchResults(list)
        }
    }

    const handleInput = debounce((e) => {
            keywordUpdated(e.target.value)
        }, 900)

    const handleKeydown = (e) => {
        // console.log("keyCode:", e.keyCode)
        if (e.keyCode === 27) { // ESC
            close()
        }
    }

    useEffect(() => {
        axios
            .get('/portfolio/search/index.json')
            .then(res => {
                const searchInfo = {
                    searchData: {},
                    searchIndex: {}
                }
                searchInfo.searchData = res.data
                searchInfo.searchIndex = lunr(function() {
                    this.ref('href')
                    this.field('title')
                    this.use(lunr.ja)
                    searchInfo.searchData.results.forEach(e => {
                        this.add(e);
                    })
                })
                setMySearchInfo(searchInfo)
            })
    }, [])

    useEffect(() => {
        if (show) {
            if (inputRef.current) {
                inputRef.current.focus()
            }
        }
    }, [show])

    if (show) {
        const list = searchResults.map((result, idx) => {
            return (
                <div key={idx} className="pt-4 pb-2 px-6 border-b border-primary-dark w-full hover:bg-primary/60 hover:text-on-primary text-left">
                    <a className="block" href={result.href}>{result.title}</a>
                </div>
            )
        })
        return (
            <div id="modal-overlay" onClick={close} className='fixed top-0 left-0 w-full h-full bg-black/70 flex flex-col justify-start items-center z-50'>
                <div onClick={(e) => e.stopPropagation() } className='flex flex-col items-center border border-primary-dark mt-4 md:mt-12 w-72 md:w-[500px] rounded-lg bg-primary-light text-primary-dark mx-auto'>
                    <div className="flex items-center w-full border-b border-primary-dark">
                        <div className="flex-none"><i className="fa-solid fa-magnifying-glass text-3xl mx-2"></i></div>
                        <input type="text" ref={inputRef} onInput={handleInput} onKeyDown={handleKeydown} className="grow bg-primary-light text-on-primary-light
                        text-sm rounded-lg focus:outline-none block p-2.5 w-full" placeholder="Search this blog" required />
                    </div>
                    <div className="flex flex-col items-start mb-4 overflow-y-auto h-[580px] md:h-[800px] w-full">
                        {list}
                    </div>
                </div>
            </div>
        );
    } else {
        return null;
    }
}
