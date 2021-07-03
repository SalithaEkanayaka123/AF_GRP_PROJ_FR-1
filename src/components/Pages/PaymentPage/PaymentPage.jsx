import React, {useState, useEffect} from 'react';
import './payment.css'
import StripeCheckout from 'react-stripe-checkout';
import axios from "axios";
import {useSelector} from "react-redux";
import emailjs from 'emailjs-com';
import {useHistory} from "react-router";


const PaymentPage = (props) => {

    //Default price
    console.log(props.match.params.value)
    const [price, setPrice] = useState("$ " + 50.00);

    //Getting Auth from the user state.
    const users = useSelector((state) => state.users);
    const token = users.userToken;
    const [flag, setFlag] = useState(null)
    const [tokenKey, setTokenKey] = useState("");
    const [paymentResponse, setPaymentResponse] = useState(null);
    const history = useHistory();

    //Creating  Authorization Header for Axios Requests
    axios.interceptors.request.use(
        config => {
            config.headers.authorization = `Bearer ${token}`;
            return config;
        },
        error => {
            return Promise.reject(error);
        }
    )

    const navigation = () => {
        history.push("/loginpage");
    }

    //Constructor - Validate the approaching user.
    useEffect(() => {
        if (users.userName === null) {
            navigation()
        } else {
            setFlag(true);
        }
    }, [])

    //Flag update for the user. If Null Do not show the page.
    if (!flag) {
        return null;
    }


    //Save the transaction to the backend.
    const saveTheTransaction = async (body) => {
        console.log(body.id);
        setTokenKey(body.id)
        await axios.post("https://application-framework-database.herokuapp.com/api/v1/charge", "", {
            headers: {
                token: body.id,
                amount: 50,
            }
        }).then((res) => {setPaymentResponse(res)});
    }

    //Emails Invoker method.
    const sendEmailsToCustomers = (email) => {
        //Send Email to the customer.
        const userID = 'user_vjTwqbgkFdhOFYeJufJxC';
        const templateId = 'template_7my6c7z';
        const serviceID = 'service_5zkxkh9';
        sendFeedback(serviceID, templateId, {
            from_name: "Team WE19",
            message: "Payment is done successfully",
            to_name: email
        }, userID)
    }

    //Send Emails to the customers.
    const sendFeedback = (serviceID, templateId, variables, id) => {

        emailjs.send(
            serviceID, templateId,
            variables, id
        ).then(res => {
            alert(`Email sent sucessfully`);
        })
            .catch(err => console.error('There has been an error.  Here some thoughts on the error that occured:', err))
    }

    //Generate the payment token.
    const handleToken = (token, address) => {
        //Calling The DB Method.
        saveTheTransaction(token, price);
        //Printing the Token Testing.
        console.log(token.email)

        if(paymentResponse != null){
            sendEmailsToCustomers(token.email);
            alert("Payment Successfull!, Email Sent")
        } else {
            alert("Payment Error!");
        }
    }


    return (
        <div className="container payment-container">
            <div id="Checkout" className="inline">
                <h1>Pay Invoice</h1>
                <div className="card-row">
                    <span className="visa"></span>
                    <span className="mastercard"></span>
                    <span className="amex"></span>
                    <span className="discover"></span>
                </div>
                <form>
                    <div className="form-group">
                        <label htmlFor="PaymentAmount">Payment amount</label>
                        <div className="amount-placeholder">
                            <span>$</span>
                            <span>500.00</span>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="Event Name">Event Name</label>
                        <div className="amount-placeholder">
                            <span>{props.match.params.value}</span>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="Event Name">User Token</label>
                        <div className="amount-placeholder">
                            <span>{tokenKey}</span>
                        </div>
                    </div>
                    <div className="form-group">
                        <label or="NameOnCard">User Name</label>
                        <input id="NameOnCard" className="form-control" type="text" maxLength="255"></input>
                    </div>

                    <div className="phone-number form-group">
                        <label htmlFor="PhoneNumber">Phone Number</label>
                        <div className="input-container">
                            <input id="PhoneNum" className="form-control" type="text" />
                            {/*<a tabIndex="0" role="button" data-toggle="popover" data-trigger="focus"*/}
                            {/*   data-placement="left"*/}
                            {/*   data-content="Enter the ZIP/Postal code for your credit card billing address."><i*/}
                            {/*    className="fa fa-question-circle"></i></a>*/}
                        </div>
                    </div>
                    <br/>
                </form>
                <div className="stripe-payment-ui">
                    <StripeCheckout
                        stripeKey="pk_test_51J8R13E0pZfHtqeOwbTMbjIavkjjILqevpElHxiuWopUuznA7SzlW2kjYV1z5PeFN6X3CZxX1OMrgTmiS4Eu0AgQ00XitZCzFs"
                        token={handleToken}
                        amount={10 * 100}
                        name={"upfront"}
                    />
                </div>
            </div>
        </div>


    );
}
export default PaymentPage;
