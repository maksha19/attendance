import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import header from "./AC_logo.png";
import footerImage from "./AC_footer.png";


function App() {
  const [registrationId, setRegistrationId] = useState("");
  const [title, setTitle] = useState("Enter your mobile number");
  const [name, setName] = useState("")
  const [table, setTable] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  const inputOnChange = (e: any) => {
    setRegistrationId(e);
  };

  const resetForm = () => {
    setName('')
    setTable('')
    setShowSuccessMessage(false)
  }

  const submitRequest = async () => {
    setIsSubmit(true);
    const url = "https://script.google.com/macros/s/AKfycbxv-6-FT6qAuX6jPuO6fMWEbkQGM8H8bUBwQB-tuM67gss2CyBiJchpm08Prk2q1uW06Q/exec"
    const response = await axios.post(
      url,
      { id: Number(registrationId) },
      {
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
      }
    );
    if (response.status === 200) {
      const statusCode = response.data.statusCode;
      if (statusCode === "202") {
        setTimeout(() => {
          setShowSuccessMessage(true)
          setShowSuccess(true);
          setIsSubmit(true);
          setName(response.data.name)
          setTable(response.data.table)
        }, 0);
      } else if (statusCode === "208") {
        setTitle("Already Register !");
      } else if (statusCode === "404") {
        setTitle("Record not found !");
      }
    }
    setTimeout(() => {
      setTitle("Enter your mobile number");
      setIsSubmit(false);
      setRegistrationId("");
      setShowSuccess(false);
    }, 3000);
  };

  return (
    <div className="container mx-auto grid min-h-screen bg-dark-green">
      <div className="grid justify-items-center">
        <img src={header} alt="headerImage" />
      </div>
      <div className="grid my-12 grid-cols-6 gap-4 ">
        {
          !showSuccessMessage ?
            <>
              <div className="col-start-2 col-span-4">
                <span className="text-white font-bold">{title}</span>
                <div className="flex flex-col">
                  <input
                    className="border-4 lowercase my-4 h-12 border-bt-bg-color"
                    onChange={(e) => inputOnChange(e.target.value)}
                    value={registrationId}
                    type="number"
                  />
                  <div className="flex justify-center">
                    <button
                      className="text-bt-text-color font-bold w-auto py-2 px-4 m-4 rounded bg-bt-bg-color"
                      type="button"
                      disabled={isSubmit}
                      onClick={() => submitRequest()}
                    >
                      {isSubmit ? (
                        <div className="loader1">
                          <span></span>
                          <span></span>
                          <span></span>
                          <span></span>
                          <span></span>
                        </div>
                      ) : (
                        <>Submit</>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </>
            :
            <>
              <div className="col-start-2 col-span-6">
                <div className="my-2">
                  <span className="text-white font-bold">{'Welcome "' + name + '"'}</span>
                </div>
                <div>
                  <span className="text-white font-bold">{"Your Table number: " + table}</span>
                </div>
              </div>
              <div className="col-start-2 col-span-4 -my-4 ">
                <div className="flex justify-center">
                  <button
                    className="text-bt-text-color font-bold w-auto py-2 px-4 m-4 rounded bg-bt-bg-color"
                    type="button"
                    onClick={() => resetForm()}
                  >
                    Refresh
                  </button>
                </div>
              </div>
            </>
        }
      </div>

      <div>
        <div className="grid justify-items-center">
          <a style={{ color: 'white' }} href="https://github.com/maksha19">Powered by @maksha</a>
          <img src={footerImage} alt="footerImage" />
        </div>
        {showSuccess && (
          <a href="/">
            <div className="bg-white">
              <div className="container">
                <div className="action">
                  <div className="trophy">
                    <svg
                      fill="#f9bc60"
                      width="100%"
                      height="100%"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,16.5L18,9.5L16.59,8.09L11,13.67L7.91,10.59L6.5,12L11,16.5Z"></path>
                    </svg>
                  </div>
                  <div className="confetti"></div>
                  <div className="confetti two"></div>
                  <div className="confetti three"></div>
                  <div className="confetti four"></div>
                  <div className="confetti--purple"></div>
                  <div className="confetti--purple two"></div>
                  <div className="confetti--purple three"></div>
                  <div className="confetti--purple four"></div>
                </div>
              </div>
            </div>
          </a>
        )}
      </div>
    </div>
  );
}

export default App;
