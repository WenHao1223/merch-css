import { Ripple, Input, Select, Modal, initTE } from "tw-elements";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { isArrayEmpty } from "../components/utils";

import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAJ8hW8s050q_Em46c38BAXM5SO7Ukl3Ro",
    authDomain: "css-merch.firebaseapp.com",
    projectId: "css-merch",
    storageBucket: "css-merch.appspot.com",
    messagingSenderId: "508574451436",
    appId: "1:508574451436:web:c4f1daf6c8d6945b80c7c9",
    measurementId: "G-750WGL1JKQ"
};

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);
const db = getFirestore(firebaseApp);

const Cart = (props) => {
    useEffect(() => {
        initTE({ Ripple, Input, Select, Modal });
    }, []);
    
    const [data, setData] = useState(props.data);
    const [file, setFile] = useState(null);

    const [quantitySum, setQuantitySum] = useState(props.quantitySum);

    const navigate = useNavigate();

    const sub = (id) => {
        let quantity = document.getElementById("quantity"+id);
        if(quantity.textContent > 0){
            quantity.textContent = parseInt(quantity.textContent) - 1;
            let updatedData = data;
            updatedData[id-1]["quantity"] = parseInt(quantity.textContent);
            setData(updatedData);
            setQuantitySum(data.map(item => item.quantity).reduce((sum, amount) => sum + amount));
            props.setQuantitySum(data.map(item => item.quantity).reduce((sum, amount) => sum + amount));
        }
        console.log(data);
        console.log(props.data);
    }

    const add = (id) => {
        let quantity = document.getElementById("quantity"+id);
        quantity.textContent = parseInt(quantity.textContent) + 1;
        let updatedData = data;
        updatedData[id-1]["quantity"] = parseInt(quantity.textContent);
        setData(updatedData);
        setQuantitySum(data.map(item => item.quantity).reduce((sum, amount) => sum + amount));
        props.setQuantitySum(data.map(item => item.quantity).reduce((sum, amount) => sum + amount));
        console.log(data);
        console.log(props.data);
    }

    const totalPrice = data.map(item => item.quantity*item.price).reduce((sum, amount) => sum + amount).toFixed(2);

    const listItem = isArrayEmpty(data) ? [] : data.map((item, pos) => {
        return(
            <li key={pos} className="w-full border-b-2 border-neutral-100 border-opacity-100 py-4 dark:border-opacity-50">
                <div key={item.id} className="grid grid-cols-5 gap-4">
                    <div className="col-span-3">
                        <p className="text-lg">{item.title}</p>
                        <p className="text-sm text-gray-500">RM {item.price.toFixed(2)} {!item.available && "(unavailable)"}</p>
                    </div>
                    <div className="col-span-2">
                        <button disabled={!item.available} className="disabled:opacity-50 disabled:pointer-events-none" onClick={() => sub(item.id)}>-</button>
                        <span id={"quantity"+item.id} className="px-3">{item.quantity}</span>
                        <button disabled={!item.available} className="disabled:opacity-50 disabled:pointer-events-none" onClick={() => add(item.id)}>+</button>
                    </div>
                </div>
            </li>
        );
    });

    const fileAdded = (e) => {
        console.log(e.target.files[0]);
        setFile(e.target.files[0]);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const submitForm = (e) => {
        console.log(e);
        if(quantitySum > 0){
            if(document.getElementById("t-name").value !== "" && document.getElementById("t-email").value !== "" && document.getElementById("t-phone").value !== "" && document.getElementsByClassName("t-gender")[0].value !== "" && document.getElementsByClassName("t-year")[0].value !== "" && document.getElementsByClassName("t-delivery")[0].value !== "" && document.getElementById("t-file").value !== "" && document.getElementById("t-agree-rules").checked && document.getElementById("t-agree-refund").checked){
                if(document.getElementById("t-matric").value.match(/(\d{8})/gm) || document.getElementById("t-matric").value == ""){
                    if(document.getElementById("t-email").value.match(/[a-zA-Z0-9\.]+@(?:student\.usm\.my|usm\.my)\b/gm)){
                        if(document.getElementById("t-phone").value.match(/^(\+601)[02-46-9]-*[0-9]{7}$|^(\+601)[1]-*[0-9]{8}$/gm)){
                            let storageRef = ref(storage, document.getElementById("t-phone").value.slice(1,));
                            uploadBytes(storageRef, file).then((snapshot) => {
                                console.log("Uploaded a file: ", snapshot);
                                getDownloadURL(storageRef).then(async (url) => {
                                    console.log("File uploaded at url ", url);
                                    await setDoc(doc(db, "Payment", document.getElementById("t-phone").value.slice(1,)), {
                                        user: {
                                            name: document.getElementById("t-name").value,
                                            matricNo: document.getElementById("t-matric").value,
                                            email: document.getElementById("t-email").value,
                                            phone: document.getElementById("t-phone").value,
                                            gender: document.getElementsByClassName("t-gender")[0].value,
                                            studyYear: document.getElementsByClassName("t-year")[0].value,
                                            deliveryMethod: document.getElementsByClassName("t-delivery")[0].value,
                                            paymentScreenshotUrl: url,
                                            specialNeed: document.getElementById("t-special").value
                                        },
                                        order: data.map(({title, quantity}) => ({title, quantity}))
                                    }).then(() => {
                                        confirm("Your form has been submitted and waiting to be reviewed by the team!");
                                        navigate("/merch-css/")
                                    }).catch((error) => {
                                        console.log(error);
                                        alert("File upload failed. Please submit the form again.");
                                    });
                                }).catch((error) => {
                                    switch (error.code) {
                                        case 'storage/object-not-found':
                                            console.log("File doesn't exist");
                                            break;
                                        case 'storage/unauthorized':
                                            console.log("User doesn't have permission to access the object")
                                            break;
                                        case 'storage/canceled':
                                            console.log("User cancelled the upload")
                                            break;
                                        case 'storage/unknown':
                                            console.log("Unknown error occured")
                                            break;
                                    }
                                });
                            }).catch((error) => {
                                console.log(error);
                                alert("File upload failed. Please submit the form again.");
                            });
                        } else {
                            alert("Wrong Phone Number format");
                        }
                    } else {
                        alert("Wrong USM Email format");
                    }
                } else {
                    alert("Wrong USM Matric Number format");
                }
            } else {
                alert("Please fill in all information required before submit.");
            }
        } else {
            alert("Please add some items into cart.");
        }
    };

    return (
        <>
            <div className="relative flex gap-4 grid 2xl:grid-cols-5 xl:grid-cols-5 grid-cols-1 h-full">
                <div className="2xl:col-span-2 xl:col-span-2">
                    <div className="py-6 px-6 flex flex-row w-full items-center grid justify-items-center border border-slate-700 rounded-xl mb-4">
                    <h1 className="font-semibold text-4xl mb-6">Cart</h1>
                        <ul className="w-96">
                            {listItem}
                            <li className="w-full py-4">
                                <div className="grid grid-cols-5 gap-4">
                                    <div className="col-span-3 text-lg font-bold">Total</div>
                                    <div className="col-span-2">
                                        <span className="text-xl font-bold text-danger">RM {totalPrice}</span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="py-6 px-6 flex flex-row w-full items-center grid justify-items-center border border-slate-700 rounded-xl">
                        <button type="button" className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]" data-te-toggle="modal" data-te-target="#exampleModal" data-te-ripple-init data-te-ripple-color="light">Click here for QR Code Payment</button>

                        <div data-te-modal-init className="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div data-te-modal-dialog-ref className="pointer-events-none relative w-auto translate-y-[-50px] opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[500px]">
                                <div className="min-[576px]:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
                                <div className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
                                    <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200" id="exampleModalLabel">
                                    Scan QR code for payment.
                                    </h5>
                                    <button type="button" className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none" data-te-modal-dismiss aria-label="Close">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    </button>
                                </div>

                                <div className="relative flex-auto p-4" data-te-modal-body-ref>
                                    <img className="h-full" src="/merch-css/src/assets/tng.JPG" alt="payWithQR" />
                                </div>

                                <div className="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
                                    <button type="button" className="ml-1 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]" data-te-modal-dismiss data-te-ripple-init data-te-ripple-color="light">Close</button>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="py-6 2xl:col-span-3 xl:col-span-3 items-center grid justify-items-center border border-slate-700 rounded-xl">
                    <h1 className="font-semibold text-2xl mb-4 px-12">Customer Information</h1>
                    <p className="font-thin text-lg mb-4 px-12">By clicking "Send" button, cart items will be sent to CS society for ordering process. Further action or latest info will be contacted by USM Nerds' Merchandise via WhatsApp no. USM Nerds' Merchandise will not share any of your personal details to the thid party. </p>
                    <div className="block max-w-md rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                        <form onSubmit={handleSubmit} id="customerForm">
                            <div className="relative mb-6" data-te-input-wrapper-init>
                                <input type="text" className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 uppercase" id="t-name" placeholder="Full Name *" required/>
                                <label htmlFor="t-name" className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary">Full Name *</label>
                            </div>

                            <div className="relative mb-6" data-te-input-wrapper-init>
                                <input type="number" className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0" id="t-matric" placeholder="Matric Number"/>
                                <label htmlFor="t-matric" className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary">Matric Number</label>
                            </div>

                            <div className="relative mb-6" data-te-input-wrapper-init>
                                <input type="email" className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0" id="t-email" placeholder="USM Email *" required/>
                                <label htmlFor="t-email" className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary">USM Email *</label>
                            </div>

                            <div className="relative mb-6" data-te-input-wrapper-init>
                                <input type="tel" className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0" id="t-phone" placeholder="Phone Number (e.g.+601158606808) *" required/>
                                <label htmlFor="t-phone" className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary">Phone Number (e.g.+60xxxxxxxxx) *</label>
                            </div>

                            <div className="relative mb-6">
                                <select name="gender" className="t-gender" data-te-select-init data-te-select-placeholder="Gender *" required>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>

                            <div className="relative mb-6">
                                <select name="year" className="t-year" data-te-select-init data-te-select-placeholder="Year of Study *" required>
                                    <option value="1">Year 1</option>
                                    <option value="2">Year 2</option>
                                    <option value="3">Year 3</option>
                                    <option value="4">Year 4</option>
                                    <option value="O">Other</option>
                                    <option value="L">Lecturer</option>
                                </select>
                            </div>

                            <div className="relative mb-6">
                                <select name="delivery" className="t-delivery" data-te-select-init data-te-select-placeholder="Delivery Method *" required>
                                    <option value="pickup">Pick-up within USM Campus</option>
                                    <option value="delivery-w">Delivery (West Malaysia)</option>
                                    <option value="delivery-e">Delivery (East Malaysia)</option>
                                </select>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="t-file" className="mb-2 inline-block text-neutral-700 dark:text-neutral-200">Payment Screenshot *</label>
                                <input onChange={fileAdded} className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary" type="file" accept="image/*" id="t-file" required/>
                            </div>

                            <div className="relative mb-6" data-te-input-wrapper-init>
                                <textarea className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0" id="t-special" rows="3" placeholder="Special Need"></textarea>
                                <label htmlFor="t-special" className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary">Special Need</label>
                            </div>

                            <div className="mb-6 flex min-h-[1.5rem] items-center justify-center pl-[1.5rem]">
                                <input className="relative float-left -ml-[1.5rem] mr-[6px] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]" type="checkbox" value="" id="t-agree-rules" required/>
                                <label className="inline-block pl-[0.15rem] hover:cursor-pointer" htmlFor="t-agree-rules">
                                    I agree that I will follow any rules and regulations by USM Nerds' Merchandise.
                                </label>
                            </div>

                            <div className="mb-6 flex min-h-[1.5rem] items-center justify-center pl-[1.5rem]">
                                <input className="relative float-left -ml-[1.5rem] mr-[6px] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]" type="checkbox" value="" id="t-agree-refund" required/>
                                <label className="inline-block pl-[0.15rem] hover:cursor-pointer" htmlFor="t-agree-refund">
                                    No refund will be taken place after I submit this form.
                                </label>
                            </div>

                            <button onClick={submitForm} id="b-submit" className="dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]] inline-block w-full rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]" data-te-ripple-init data-te-ripple-color="light">Send</button>
                        </form>
                    </div>
                </div>
            </div>
            
        </>
    );
}

export default Cart;