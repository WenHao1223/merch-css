import { useEffect } from "react";
import { Outlet, useNavigate } from 'react-router-dom';
import 'boxicons';

const SharedLayout = (props) => {
    const navigate = useNavigate();
    const cart = () => {
        return navigate("/merch-css/cart");
    }
    const home = () => {
        return navigate("/merch-css");
    }

    return (
        <div className="h-[13]">
            <nav className="absolute md:sticky sm:sticky xs:sticky inset-x-0 top-0 navbar flex min-h-[6rem] px-6 md:px-12 z-30 bg-theme-800 text-white transition-all items-center bg-gradient-to-r from-slate-900 to-slate-600">
                <div className="absolute left-20 2xl:left-20 xl:left-20 lg:left-20 md:left-10 sm:left-10 xs:left-5 left-5 flex md:flex md:flex-grow flex-row w-1/2 justify-start items-center">
                    <div className="flex items-center gap-4 z-10 cursor-pointer" onClick={home}>
                        <img className="flex justify-center gap-4"  src="https://merch.cssocietyusm.com//assets/logos/cs-soc-official.svg" alt="CSS Logo" width="64px"/>
                        <span className='text-left font-normal tracking-wider 2xl:text-xl xl:text-xl lg:text-xl md:text-xl sm:text-sm xs:text-sm -z-10'>
                            USM NERDS' <br />
                            MERCHANDISE :&#x29;
                        </span>
                    </div>
                </div>
                <div className="absolute right-20 2xl:right-20 xl:right-20 lg:right-20 md:right-10 sm:right-10 xs:right-5 right-5 flex md:flex md:flex-grow flex-row w-1/2 justify-end items-center">
                    <button onClick={cart} className="flex justify-end items-center 2xl::text-xl xl:text-xl lg:text-xl md:text-xl sm:text-sm xs:text-sm">
                        <box-icon name='cart' type='solid' color='#ffffff'></box-icon>
                        &nbsp;&nbsp;CART&nbsp;({props.quantitySum})</button>
                </div>
            </nav>

            <div className="px-6 md:px-12 py-6">
                <Outlet/>
            </div>

            <footer className="hidden z-20 2xl:static xl:static lg:static md:sticky sm:sticky xs:sticky sticky inset-x-0 bottom-0 right-0 flex flex-col items-center bg-neutral-100 text-center dark:bg-neutral-600 lg:text-left">
                <div className="2xl:block xl:block lg:block md:hidden sm:hidden xs:hidden hidden container p-6 text-neutral-800 dark:text-neutral-200">
                    <div className="grid gap-12 lg:grid-cols-2">
                        <div className="mb-6 md:mb-0">
                            <h5 className="mb-2 font-medium uppercase">Website Purpose</h5>
                            <p className="mb-4">This website is to revamp the design of the CSS Society USM Merch website at <a href="https://merch.cssocietyusm.com/" target="_blank">https://merch.cssocietyusm.com/</a> for technical evaluation purpose. Images used in this website are not for commercialized purpose but with educational intention. All products sold here are solely fake and not sold in real life.</p>
                            <h5 className="mb-2 font-medium uppercase">Small Introduction</h5>
                            <p className="mb-4">As a web developer whose focuses more on code implementation, I prefer to use frameworks and libraries to design UI. In this website, I have used <a href="https://tailwindcss.com/docs/" target="_blank">Tailwind CSS</a> and <a href="https://tw-elements.com/" target="_blank">TW elements</a> along with ReactJS for fast development. </p>
                        </div>

                        <div className="mb-6 md:mb-0">
                            <h5 className="mb-2 font-medium uppercase">Time Constraint</h5>
                            <p className="mb-4">This is just a small demonstration, of my web development skills. I believe, my talent and potential in web development can be volumed up if given more time. However, due to time constraint that I also take part in DevDojo Hackathon 2023, I have to develop this website in a fast manner. Apologise for any incovenience caused.</p>

                            <p className="mb-4">Thank you for visiting my website.</p>

                            <div className="flex justify-left">
                                <a href="https://wenhao1223.github.io/WenHao1223" target="_blank" className="mr-9 text-neutral-800 dark:text-neutral-200">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 640 512">
                                            <path d="M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z"/>
                                        </svg>
                                </a>
                                <a href="https://www.facebook.com/WenHao1223/" target="_blank" className="mr-9 text-neutral-800 dark:text-neutral-200">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" /></svg>
                                </a>
                                <a href="https://twitter.com/Hao1223Wen" target="_blank" className="mr-9 text-neutral-800 dark:text-neutral-200">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                                    </svg>
                                </a>
                                <a href="mailto:wenhaojshs@gmail.com" target="_blank" className="mr-9 text-neutral-800 dark:text-neutral-200">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M7 11v2.4h3.97c-.16 1.029-1.2 3.02-3.97 3.02-2.39 0-4.34-1.979-4.34-4.42 0-2.44 1.95-4.42 4.34-4.42 1.36 0 2.27.58 2.79 1.08l1.9-1.83c-1.22-1.14-2.8-1.83-4.69-1.83-3.87 0-7 3.13-7 7s3.13 7 7 7c4.04 0 6.721-2.84 6.721-6.84 0-.46-.051-.81-.111-1.16h-6.61zm0 0 17 2h-3v3h-2v-3h-3v-2h3v-3h2v3h3v2z" fillRule="evenodd" clipRule="evenodd" />
                                    </svg>
                                </a>
                                <a href="https://www.instagram.com/limwenhao1223/" target="_blank" className="mr-9 text-neutral-800 dark:text-neutral-200">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                    </svg>
                                </a>
                                <a href="https://www.linkedin.com/in/wenhao1223/" target="_blank" className="mr-9 text-neutral-800 dark:text-neutral-200">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                                    </svg>
                                </a>
                                <a href="https://github.com/WenHao1223/" target="_blank" className="text-neutral-800 dark:text-neutral-200">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full bg-neutral-200 p-4 text-center text-neutral-700 dark:bg-neutral-700 dark:text-neutral-200">
                    © Lim Wen Hao 2023 <a href="https://github.com/WenHao1223/merch-css" target="_blank">@github/merch-css</a>
                </div>
            </footer>

        </div>
    );
};
export default SharedLayout;
