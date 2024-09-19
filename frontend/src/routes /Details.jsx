import { useContext, useState } from "react"
import { UseridContext } from "../App"
import { useNavigate, useLocation } from "react-router";
import Navbar from "../components/Navbar";
import api from "../api";

export default function Details(){
    const {userid} = useContext(UseridContext);
    const location = useLocation();
    // const [customer, setCustomer] = useState({})
        // const { createOrderItems } = location.state
    



    const navigate = useNavigate()
    const [customerDetails, setCustomerDetails] = useState({
        postcode:"",
        address:"",
        phone_number:"",
        county:"",
        city:""
    });
    // console.log(userid)


    //update customer details
    function handleChange(event){
        setCustomerDetails(prevDetails => {
            return {
                ...prevDetails, 
                [event.target.name]: event.target.value
            }
        })
    }
    console.log(location.state.orderItems)
    async function handleSumbit(){
        //CREATE CUSTOMER
        const customer_response = await api.post("api/customers/", {
            phone_number: customerDetails.phone_number,
            address: customerDetails.address,
            postcode: customerDetails.postcode,
            user_id: userid
        }) 
        //CREATE ORDER
        const order_response = await api.post("/api/orders/", {
            customer: customer_response.data.id,
            delivery_date: "2024-09-21",
        })
        console.log(order_response.data.id)
        //CREATE ORDER-ITEMS FROM STATE
        async function createOrderItem(item){
            await api.post("/api/orderitems/", {
                order_id: order_response.data.id,
                meal_id: item.id,
                quantity: item.quantity
            })
            console.log("posted")
        }
        await location.state.orderItems.forEach(item => createOrderItem(item))
        navigate("/cart", { state: { order_id:order_response.data.id } })
    }

    return (
      <div>
        <Navbar />
        <div className="details-container">
          <form className="details-form">
            <h2>Enter Your Details</h2>
            <label htmlFor="postcode">Postcode</label>
            <input
              type="text"
              id="postcode"
              value={customerDetails.postcode}
              name="postcode"
              onChange={handleChange}
            />
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              value={customerDetails.address}
              name="address"
              onChange={handleChange}
            />
            <label htmlFor="county">County</label>
            <input
              type="text"
              id="county"
              value={customerDetails.county}
              name="county"
              onChange={handleChange}
            />            
            <label htmlFor="city">City/Town</label>
            <input
              type="text"
              id="city"
              value={customerDetails.city}
              name="city"
              onChange={handleChange}
            /> 
            <label htmlFor="phone_number">Phone Number</label>
            <input
              type="tel"
              id="phone_number"
              value={customerDetails.phone_number}
              name="phone_number"
              onChange={handleChange}
            />
          </form>
          <button className="details-submit" onClick={handleSumbit}>
            Next
          </button>
        </div>
      </div>
    );
    


}

