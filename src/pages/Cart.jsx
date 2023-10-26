const Cart = () => {
    return (
        <>
            <h1 className="font-semibold text-4xl">Cart</h1>

            <div className="relative flex gap-4 grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-1 w-full h-full">
                <div className="absolute py-6 flex flex-row w-1/2 justify-start items-center">
                    <div>
                        <ul className="w-96">
                            <li className="w-full border-b-2 border-neutral-100 border-opacity-100 py-4 dark:border-opacity-50">
                                <div className="grid grid-cols-5 gap-4">
                                    <div className="col-span-3">Second item</div>
                                    <div className="col-span-2">
                                        <button>-</button>
                                        <span className="px-3">1</span>
                                        <button>+</button>
                                    </div>
                                </div>
                            </li>
                            <li className="w-full border-b-2 border-neutral-100 border-opacity-100 py-4 dark:border-opacity-50">
                                <div className="grid grid-cols-5 gap-4">
                                    <div className="col-span-3">Second item</div>
                                    <div className="col-span-2">
                                        <button>-</button>
                                        <span className="px-3">1</span>
                                        <button>+</button>
                                    </div>
                                </div>
                            </li>
                            <li className="w-full border-b-2 border-neutral-100 border-opacity-100 py-4 dark:border-opacity-50">
                                <div className="grid grid-cols-5 gap-4">
                                    <div className="col-span-3">Second item</div>
                                    <div className="col-span-2">
                                        <button>-</button>
                                        <span className="px-3">1</span>
                                        <button>+</button>
                                    </div>
                                </div>
                            </li>
                            <li className="w-full border-b-2 border-neutral-100 border-opacity-100 py-4 dark:border-opacity-50">
                                <div className="grid grid-cols-5 gap-4">
                                    <div className="col-span-3">Second item</div>
                                    <div className="col-span-2">
                                        <button>-</button>
                                        <span className="px-3">1</span>
                                        <button>+</button>
                                    </div>
                                </div>
                            </li>
                            <li className="w-full py-4">
                                <div className="grid grid-cols-5 gap-4">
                                    <div className="col-span-3">Second item</div>
                                    <div className="col-span-2">
                                        <button>-</button>
                                        <span className="px-3">1</span>
                                        <button>+</button>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="absolute py-6 flex flex-row w-1/2 justify-end items-center">
                    <h2>1</h2>
                    {/* <h2 className="py-3 text-2xl mb-4">Customer Information</h2> */}
                </div>
                {/* <div className="block max-w-md rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                    <form>
                        <div className="relative mb-6" data-te-input-wrapper-init>
                            <input type="text" className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0" id="t-name" placeholder="Name" />
                            <label for="t-name" className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary">Name</label>
                        </div>

                        <div className="relative mb-6" data-te-input-wrapper-init>
                            <input type="email" className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0" id="t-email" placeholder="Email address" />
                            <label for="exampleInput8" className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary">Email address</label>
                        </div>

                        <div className="relative mb-6" data-te-input-wrapper-init>
                            <textarea className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0" id="t-instru" rows="3" placeholder="Special Instruction"></textarea>
                            <label for="t-instru" className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary">Special Instruction</label>
                        </div>

                        <div className="mb-6 flex min-h-[1.5rem] items-center justify-center pl-[1.5rem]">
                            <input className="relative float-left -ml-[1.5rem] mr-[6px] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]" type="checkbox" value="" id="t-agree" />
                            <label className="inline-block pl-[0.15rem] hover:cursor-pointer" for="t-agree">
                                I agree that I will follow any rules and regulations by USM Nerds' Merchandise. USM Nerds' Merchandise will not share any of your personal details to the thid party. No refund will be taken place after I submit this form.
                            </label>
                        </div>

                        <button type="submit" className="dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]] inline-block w-full rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]" data-te-ripple-init data-te-ripple-color="light">Send</button>
                    </form>
                </div> */}
            </div>
            
        </>
    );
}

export default Cart;