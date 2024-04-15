'use client'

import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { showToastError, showToastSuccess } from "@/utils/ToastPopups";
import CrossIcon1 from "@/icons/CrossIcon1";
import CopyIcon1 from "@/icons/CopyIcon1";
import ShareIcon1 from "@/icons/ShareIcon1";

export default function Home() {

  const [primaryURL, setprimaryURL] = useState<string>('');
  const [alias, setalias] = useState('');
  const [toSupport, settoSupport] = useState(false);

  function isValidURL(str: string) {
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlRegex.test(str);
  }

  async function shaveURL(e: { preventDefault: any; }) {
    e.preventDefault;

    const isValid = isValidURL(primaryURL);

    if (!primaryURL || !isValid) { return showToastError('Please enter valid URL!'); }

    const { data: { message, statusCode, data: { alias } } } = await axios.post('/api/ShortLink', { primaryURL, toSupport })

    setalias(alias);

    showToastSuccess(message);
  }

  const [inputCSS, setinputCSS] = useState(false);
  const manageInputButtonCSS = useCallback(() => {
    if (primaryURL) { setinputCSS(true); return; }
    setinputCSS(false);
  }, [primaryURL, setinputCSS]);

  useEffect(() => {
    manageInputButtonCSS();
    setalias('');
  }, [manageInputButtonCSS, primaryURL])

  function copyText(shortenLink: string) {
    navigator.clipboard.writeText(shortenLink);
    showToastSuccess('Link copied to clipboard.');
  }

  const shareLink = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Title of shared content',
          text: 'Description of shared content',
          url: `${process.env.DOMAIN_NAME || "https://trim.priyalraj.com"}/${alias}`,
        });
        console.log('Content shared successfully');
      } else {
        throw new Error('Web Share API not supported');
      }
    } catch (error) {
      console.error('Error sharing content:', error);
      // Fallback to some other sharing method if necessary
    }
  };


  return (
    <>
      <main className="main-box-section absolute top-1/2 left-1/2 right-0 bottom-0 -translate-x-1/2 -translate-y-1/2 max-w-[600px] lg:min-w-[600px] md:min-w-[80%] min-w-[90%]">

        <p className="uppercase text-6xl text-center font-bold mb-2">shave</p>

        <div className="bg-primary-1 border rounded-lg drop-shadow-lg px-10 py-5 flex flex-col">

          <p className="font-bold text-3xl mb-4"> Short a URL </p>

          <p className="font-bold mb-2">Enter URL</p>

          <section className="flex sm:flex-row flex-col sm:gap-4 gap-0">
            <input
              className={`w-full px-4 py-2 rounded-full bg-transparent border outline-none mb-4 ${inputCSS ? "opacity-100 border-2" : "opacity-30 focus:opacity-100"}`}
              type="text"
              value={primaryURL}
              onChange={(e) => { setprimaryURL(e.target.value); }} placeholder="https://trim.priyalraj.com/"
            />

            <section className="relative mx-auto whitespace-nowrap sm:w-fit w-full h-fit sm:mb-0 mb-2">
              <button
                className="uppercase font-bold bg-primary-2 sm:w-fit w-full mx-auto px-8 py-2 relative -top-1 -left-1 hover:top-0 hover:left-0 transition-all ease-in-out duration-200 rounded-full"
                onClick={shaveURL}>
                short it
              </button>
              <div className="absolute top-0 left-0 -right-0 -bottom-0 border mx-auto -z-50 rounded-full"></div>
            </section>
          </section>

          <section className="relative w-fit group sm:m-0 mx-auto">
            <div className="flex items-center gap-2">
              <input type="checkbox" onChange={(event) => { settoSupport(event.target.checked) }} />
              <p className="uppercase">support me?</p>
            </div>
            <p className="absolute w-72 top-[26px] sm:-right-[156px] -right-[82px] bg-gray-800 text-white text-xs rounded shadow p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              👀 Selecting this option means encountering ads when someone visits the link, which helps me out a bit. Thanks a bunch! 🙏 Rest assured, it won`t impact user experience.
            </p>
          </section>

        </div>


        {alias &&
          <>
            <section className="bg-primary-2 text-center mt-5 rounded-lg pt-10 pb-9 drop-shadow-lg relative -z-10 px-4">
              <p className="sm:text-3xl text-base"> {`${process.env.DOMAIN_NAME || "https://trim.priyalraj.com"}/${alias}`} </p>
              <div className="absolute top-1 right-1 cursor-pointer" onClick={() => { setalias(''); setprimaryURL(''); }}> <CrossIcon1 width={20} height={20} /> </div>
              <div onClick={() => { copyText(`${process.env.DOMAIN_NAME || "https://trim.priyalraj.com"}/${alias}`); }} className="absolute bottom-1 right-7 cursor-pointer"> <CopyIcon1 width={20} height={20} /> </div>
              <div onClick={shareLink} className="absolute bottom-1 right-1 cursor-pointer"> <ShareIcon1 width={20} height={20} /> </div>
            </section>
          </>
        }

      </main >

      <ToastContainer />
    </>
  );
}