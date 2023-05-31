import React, { useState, useEffect, useRef} from 'react'
import { createRoot } from 'react-dom/client'
import SearchModal from 'js/search-modal'

export default function MySearchForm() {
    const [show, setShow] = useState(false)
    const openModal = () => {
        setShow(true)
    }
    const closeModal = () => {
        setShow(false)
    }
    return (
        <div>
        <a className="block text-center no-underline text-on-primary py-2 px-2 font-normal cursor-pointer hover:font-bold"  onClick={openModal}>
            <i className="fa-solid fa-magnifying-glass"></i>
        </a>
        <SearchModal show={show} close={closeModal} >
        </SearchModal>
        </div>
    )
}

const container = document.getElementById('search_menu')
const root = createRoot(container)
root.render(<MySearchForm />)