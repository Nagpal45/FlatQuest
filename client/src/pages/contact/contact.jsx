import { useRef, useState } from "react";
import "./contact.scss";
import emailjs from "@emailjs/browser";
import ImgContainer from "../../components/imgContainer/imgContainer";


const Contact = () => {
    const formRef = useRef();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [emailSent, setEmailSent] = useState(false);

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm(
                "service_a8fe60o",
                "template_rsqrjbf",
                formRef.current,
                "KNX39YK9pURqdKVSX"
            )
            .then(
                () => {
                    setEmailSent(true);
                    setFormData({
                        name: "",
                        email: "",
                        message: "",
                    });
                    setTimeout(() => {
                        setEmailSent(false);
                    }
                    , 2000);
                },
                (error) => {
                    console.log(error);
                }
            );
    };

    return (
        <div className="contactContainer">
            <div className="wrapper">
                <h1>Contact Us</h1>
                <p>
                    Use the form below to send a message directly.<br /> We&apos;ll get back to you as soon as possible.
                </p>
                <div className="formContainer">
                    <form
                        ref={formRef}
                        onSubmit={sendEmail}
                    >
                        <input type="text" required placeholder="Name" name="name"
                            value={formData.name}
                            onChange={(e) =>
                                setFormData({ ...formData, name: e.target.value })
                            }
                        />
                        <input type="email" required placeholder="Email" name="email"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({ ...formData, email: e.target.value })
                            }
                        />
                        <textarea rows={8} placeholder="Message" name="message"
                            value={formData.message}
                            onChange={(e) =>
                                setFormData({ ...formData, message: e.target.value })
                            }
                        />
                        <button type="submit" style={{ background: emailSent && "lightgreen" }}>
                            {emailSent ? "Thanks" : "Send"}
                        </button>
                    </form>
                </div>
            </div>
            <ImgContainer />
        </div>
    );
};

export default Contact;