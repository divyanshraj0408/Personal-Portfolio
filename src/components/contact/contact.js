import React from "react";
import './contact.css'
import { useRef as UseRef } from "react";
import emailjs from "@emailjs/browser";
function contact() {
    const refForm = UseRef();
    const sendEmail = (e) => {
      e.preventDefault();
  
      emailjs
        .sendForm(
          "service_h1366oq",
          "template_g8la4m7",
          refForm.current,
          "HVIa9kEGGP50mq1MF"
        )
        .then(
          () => {
            alert("Email sent!");
            window.location.reload(false);
          },
          () => {
            alert("Email failed!");
          }
        );
    };
    return (
        <>
            <div className="container contact-me__section">
                <div className="info-head"><h2>.contact ☎️ <span className="comments">// hit me up</span></h2></div>
                <div className="contact-section row">
                <div className="link-section">
                        <p>I am always up for talks about tech and also hardware side of things, so if you have anything in mind or have any new project idea, contact me right away.⚜️</p>
                    </div>
                    <form className="email-section" ref={refForm} onSubmit={sendEmail}>
                        <div className="one-line-input">
                            <input type="text" placeholder="Your Name" required="required" name="from_name"/>
                        </div>
                        <div className="one-line-input">
                            <input type="text" placeholder="Email" required="required" name="from_email"/>
                        </div>
                        <div className="text-area-input">
                            <textarea type="text" placeholder="Message" required="required" name="message"/>
                        </div>
                        <div className="btn-section">
                            <button className="contact-btn">send 🖊️</button>
                        </div>
                    </form>
                    
                </div>
            </div>
        </>
    );
}
export default contact;