'use client'

import CopyIcon1 from "@/icons/CopyIcon1";
import CrossIcon1 from "@/icons/CrossIcon1";
import ShareIcon1 from "@/icons/ShareIcon1";
import { GetClicksCountFunction } from "@/server/GetClicksCountFunction";
import { showToastSuccess } from "@/utils/ToastPopups";
import Link from "next/link";
import { useState, useCallback, useEffect } from "react";

const ClicksCountPage = () => {

    const [alias, setalias] = useState<string>('');
    const [inputCSS, setinputCSS] = useState<boolean>(false);

    const [showCount, setshowCount] = useState<boolean>(false);
    const [showMessage, setshowMessage] = useState<string>('');

    const manageInputButtonCSS = useCallback(() => {
        if (alias) { setinputCSS(true); return; }
        setinputCSS(false);
    }, [alias, setinputCSS]);

    useEffect(() => {
        manageInputButtonCSS();
        setshowCount(false);
        setshowMessage('');
    }, [manageInputButtonCSS, alias])

    async function fetchCount(e: { preventDefault: () => void; }) {
        e.preventDefault();
        const { message, statusCode } = await GetClicksCountFunction(alias);

        setshowMessage(message);
        setshowCount(true);

        if (statusCode === 404) { return; }
    }

    return (
        <>
            <main className="clicks-counter-section absolute top-1/2 left-1/2 right-0 bottom-0 -translate-x-1/2 -translate-y-1/2 max-w-[600px] lg:min-w-[600px] md:min-w-[80%] min-w-[90%] flex flex-col justify-center">

                <div className="bg-primary-1 border rounded-lg drop-shadow-lg px-10 py-5 flex flex-col">

                    <Link href={'/'} className="relative whitespace-nowrap sm:w-fit w-full h-fit flex -z-50">
                        <button
                            className="uppercase font-bold bg-primary-2 sm:w-fit w-full px-8 py-2 relative -top-1 -left-1 hover:top-0 hover:left-0 transition-all ease-in-out duration-200 rounded-full text-2xl">
                            back
                        </button>
                        <div className="absolute top-0 left-0 -right-0 -bottom-0 border mx-auto -z-50 rounded-full"></div>
                    </Link>

                    <p className="font-bold text-3xl my-4"> Get Clicks Count </p>

                    <p className="font-bold mb-2"> Enter Alias </p>

                    <section className="flex sm:flex-row flex-col sm:gap-4 gap-0">
                        <input
                            className={`w-full px-4 py-2 rounded-full bg-transparent border outline-none mb-4 ${inputCSS ? "opacity-100 border-2" : "opacity-30 focus:opacity-100"}`}
                            type="text"
                            value={alias}
                            onChange={(e) => setalias(e.target.value)}
                            placeholder="enter alias"
                        />

                        <section className="relative mx-auto whitespace-nowrap sm:w-fit w-full h-fit sm:mb-0 mb-2">
                            <button onClick={fetchCount} className="uppercase font-bold bg-primary-2 sm:w-fit w-full mx-auto px-8 py-2 relative -top-1 -left-1 hover:top-0 hover:left-0 transition-all ease-in-out duration-200 rounded-full"                            >
                                get count
                            </button>
                            <div className="absolute top-0 left-0 -right-0 -bottom-0 border mx-auto -z-50 rounded-full"></div>
                        </section>
                    </section>

                    {!showCount &&
                        <>
                            <section className="relative w-fit sm:m-0 mx-auto z-50">
                                <div className="flex flex-col gap-2">
                                    <p className="text-xl font-bold"> What is <span className="font-bold text-primary-2">alias</span>?</p>
                                    <p> For example:</p>
                                    <p> <span className="font-bold text-primary-2"> URL: </span> https://shave.priyalraj.com/vFWMmI </p>
                                    <p> So you <span className="font-bold"> alias </span> will be <span className="font-bold text-primary-2">vFWMmI</span>.</p>
                                </div>
                            </section>
                        </>
                    }

                    {showMessage &&
                        <>
                            <section className="bg-primary-2 text-center mt-5 rounded-lg pt-10 pb-9 drop-shadow-lg relative -z-10 px-4 font-bold">
                                <p className="text-3xl"> {showMessage} </p>
                                <div className="absolute top-1 right-1 cursor-pointer" onClick={() => { setshowCount(false); setshowMessage(''); setalias(''); }}> <CrossIcon1 width={20} height={20} /> </div>
                            </section>
                        </>
                    }
                </div>
            </main>
        </>
    )
}

export default ClicksCountPage