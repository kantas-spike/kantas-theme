import * as React from 'react'
import { createRoot } from 'react-dom/client';

export function MyModal({show, close, children}) {
    if (show) {
        return (
            <div id="modal-overlay" onClick={close} className='fixed top-0 left-0 w-full h-full bg-black/70 flex flex-col justify-center items-center z-10'>
                <div onClick={(e) => e.stopPropagation() } className='bg-slate-100 w-2/6 h-4/6 shadow-lg rounded-md flex flex-col items-center content-center justify-center'>
                    {children}
                    <p><button onClick={close} className='hover:bg-blue-500 bg-blue-700 text-white font-bold py-2 px-4 rounded m-4 outline-none shadow-lg active:scale-95 transition-transform'>Close</button></p>
                </div>

            </div>
        );
    } else {
        return null;
    }
}

export default function MyApp() {
    const [show, setShow] = React.useState(false)
    const openModal = () => {
        setShow(true)
    }
    const closeModal = () => {
        setShow(false)
    }
    return (
        <div className="bg-stone-200 rounded-md m-4 p-2 text-center">
        <h1>Welcom to my modal window!!!</h1>
        <button onClick={openModal} className="hover:bg-blue-500 bg-blue-700 text-white font-bold py-2 px-4 rounded m-4 outline-none shadow-lg active:scale-95 transition-transform">Open</button>
        <MyModal show={show} close={closeModal} >
            <h1 className='text-lg font-bold'>これがモーダルウィンドウです!!</h1>
            <p className=''>"Close"ボタンをクリックとモーダルウィンドウを閉じます。<br/>また、半透明の背景をクリックしてもモーダルウィンドウを閉じます。</p>
        </MyModal>
        </div>
    )
}

const container = document.getElementById('modal-point')
const root = createRoot(container)
root.render(<MyApp />)