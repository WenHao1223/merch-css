import { Ripple, Carousel, initTE } from "tw-elements";
import React, { useState, useEffect } from 'react';

import { isArrayEmpty } from "../components/utils";

const Home = (props) => {
    useEffect(() => {
        initTE({ Ripple, Carousel });
    }, []);

    const [data, setData] = useState(props.data);

    const generateCards = isArrayEmpty(data) ? [] : data.map((item, pos) => {
        const moreCardImages = isArrayEmpty(item.img.slice(1)) ? [] : item.img.slice(1).map((img, pos) => {
            return(
                <div key={pos} className="relative h-56 float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none" data-te-carousel-item>
                    <img src={img} className="block w-full h-full object-cover" alt="Carousel Image" />
                </div>
            );
        });

        const moreCarouselIndicators = isArrayEmpty(item.img.slice(1)) ? [] : item.img.slice(1).map((img, pos) => {
            return(
                <button key={pos} type="button" data-te-target={"#carousel"+item.id} data-te-slide-to={item.img.indexOf(img)} className="mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none" aria-label={"Slide "+(item.img.indexOf(img)+1)}></button>
            );
        });

        const add = (id) => {
            let quantity = document.getElementsByClassName("quantity"+id)[0];
            quantity.textContent = parseInt(quantity.textContent) + 1;
        }

        const sub = (id) => {
            let quantity = document.getElementsByClassName("quantity"+id)[0];
            if(quantity.textContent > 1){
                quantity.textContent = parseInt(quantity.textContent) - 1;
            }
        }

        const addCart = (id) => {
            let updatedData = data;
            let quantity = document.getElementsByClassName("quantity"+id)[0];
            updatedData[id-1]["quantity"] += parseInt(quantity.textContent);
            setData(updatedData);
            alert(quantity.textContent+" item(s) were added.")
            document.getElementsByClassName("quantity"+id)[0].textContent = "1";
            props.setQuantitySum(data.map(item => item.quantity).reduce((sum, amount) => sum + amount));
            console.log(data);
            console.log(props.data);
        }

        return (
            <div key={item.id} className="block min-w-[15rem] max-w-[22rem] rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                <div className="relative overflow-hidden bg-cover bg-no-repeat" data-te-ripple-init data-te-ripple-color="light">

                    <div id={"carousel"+item.id} className="relative" data-te-carousel-init data-te-ride="carousel">
                        <div className="absolute bottom-0 left-0 right-0 z-[2] mx-[15%] mb-4 flex list-none justify-center p-0" data-te-carousel-indicators>
                        <button type="button" data-te-target={"#carousel"+item.id} data-te-slide-to="0" data-te-carousel-active className="mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none" aria-current="true" aria-label="Slide 1"></button>

                        {moreCarouselIndicators}
                        </div>

                        <div className="relative rounded-t-lg w-full overflow-hidden after:clear-both after:block after:content-['']">
                            <div className="relative h-56 float-left -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none" data-te-carousel-item data-te-carousel-active>
                                <img src={item.img[0]} className="block w-full h-full object-cover" alt="Carousel Image" />
                            </div>

                            {moreCardImages}
                        </div>

                        {!isArrayEmpty(item.img.slice(1)) && 
                            <>
                                <button className="absolute bottom-0 left-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none" type="button" data-te-target={"#carousel"+item.id} data-te-slide="prev">
                                    <span className="inline-block h-8 w-8">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                    </svg>
                                    </span>
                                    <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Previous</span>
                                </button>

                                <button className="absolute bottom-0 right-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none" type="button" data-te-target={"#carousel"+item.id} data-te-slide="next">
                                    <span className="inline-block h-8 w-8">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                    </svg>
                                    </span>
                                    <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Next</span>
                                </button>
                            </>
                        }
                    </div>

                    
                </div>
                <div className="p-6">
                    <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">{item.title}</h5>
                    <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">RM{item.price.toFixed(2)}</p>
                    <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">{item.des}</p>

                    <div className="mb-4 flex" role="group">
                        <button onClick={() => sub(item.id)} type="button" className="inline-block rounded-none rounded-l border-2 border-secondary-600 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-secondary transition duration-150 ease-in-out hover:text-secondary-300 hover:bg-secondary-600 focus:text-secondary-300 focus:outline-none focus:ring-0 active:text-secondary-200 active:bg-secondary-700" data-te-ripple-init data-te-ripple-color="light"> - </button>
                        <button type="button" className={("quantity"+item.id)+" -ml-0.5 inline-block rounded-none border-2 border-secondary px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal bg-secondary-600 text-white transition duration-150 ease-in-out"} data-te-ripple-init data-te-ripple-color="light" disabled>1</button>
                        <button onClick={() => add(item.id)} type="button" className="-ml-0.5 inline-block rounded-none rounded-r border-2 border-secondary-600 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-secondary transition duration-150 ease-in-out hover:text-secondary-300 hover:bg-secondary-600 focus:text-secondary-300 focus:outline-none focus:ring-0 active:text-secondary-200 active:bg-secondary-700" data-te-ripple-init data-te-ripple-color="light"> + </button>
                    </div>

                    <button type="button" onClick={() => addCart(item.id)} className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] disabled:opacity-75" data-te-ripple-init data-te-ripple-color="light" disabled={!item.available}>{item.available ? "Add to Cart" : "Unavailable"}</button>
                    
                </div>
            </div>
        );
    });

    return (
        <>
            <h1 className="font-semibold text-4xl"><code className="bg-gray-800">Hello world!</code> Are you a nerd? </h1>
            <h4 className="py-3 text-xl mb-4">Grab the chance here to get nerds' product if you are USM CS student! 🤓</h4>

            <div className="flex gap-4 grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-1">
                {generateCards}
            </div>    
        </>
    );
}

export default Home;