import { useEffect, useState } from "react";
import { MapPin , Plus} from "lucide-react";
import Navbar from "../components/Navbar";
import api from "../api";
import { useLocation, useNavigate } from "react-router";

export default function ExistingAddress(){
    const [customer, setCustomer] = useState();
    const [addresses, setAddresses] = useState([]);
    const [useAnotherAddress, setUseAnotherAddress] = useState(false)


    const location = useLocation();
    const {orderItems} = location.state
    const navigate = useNavigate();
    console.log(orderItems)

    useEffect(() => {
       async function getCustomer() {
            const res = await api.get("api/customers/me")        
            setCustomer(res.data)
            setAddresses(res.data.address_details.map(address => ({...address, selected:false})))

       }
       getCustomer();
    }, [])

    function selectAddress(id){
        setUseAnotherAddress(false)
        setAddresses(address => address.map(add => {
        if(add.id === id){
          return {...add, selected: true}
        } else {
          return {...add, selected:false}
        }
      }))
    }

    function handleAnotherAddress(){
        selectAddress(address => address.map(add => ({...add, selected:false})))
        setUseAnotherAddress(true)
    }

    async function handleSubmit(){
        if (useAnotherAddress){
        // change the screen to have new address input
        } else {
            const selectAddress_id = addresses.filter(address => address.selected === true)[0].id
            const order_response = await api.post("/api/orders/", {
                customer: customer.id,
                customer_address: selectAddress_id,
                delivery_date: "2024-09-21"
            })
            async function createOrderItem(item){
                await api.post("/api/orderitems/", {
                    order_id: order_response.data.id,
                    meal_id: item.id,
                    quantity: item.quantity
            })
            console.log("posted")
            }
            await orderItems.forEach(item => createOrderItem(item))
            navigate("/cart", { state: { order_id:order_response.data.id } })
        }


        // else we want the create the order with the selected 
        // delivery address


    }

//    console.log(customer) 
    // console.log(selected.length > 0 && selected[0].id)

   

    return (
    <div>
        <Navbar />
        <div className="existing-container">
            <h2>Select a Previously Used Address</h2>
            <div className="address-card-container">
            {addresses.map((address) => {
                return (
                  <AddressCard
                    id={address.id}
                    key={address.id}
                    street={address.address}
                    city={address.city}
                    postcode={address.postcode}
                    selected={address.selected}
                    selectAddress={(id) => selectAddress(id)}
                  />
                );
              })}
            </div>
            <div className="address-card" onClick={handleAnotherAddress} style={{border: useAnotherAddress ? "solid #000000 1px" : "solid transparent 1px"}}>
              <div style={{display:"flex", alignItems:"center", padding:"none", margin:"none", gap:"0.5rem"}}>
                <Plus /> <h4>Or Use Another Address</h4>
              </div>
            </div>
            <button className="existing-customer-submit" onClick={handleSubmit}>
                Next
            </button>
        </div>
    </div>

    )

}
  
function AddressCard({id, street, city, postcode, selectAddress, selected}){
  return (
    <div className="address-card" onClick={() => selectAddress(id)} style={{border: selected ? "solid #000000 1px" : "solid transparent 1px"}}>
      <div style={{display:"flex", alignItems:"center", padding:"none", margin:"none", gap:"0.5rem"}}>
          <MapPin /> 
          <h4 style={{margin:0, border:"none", height:"fit-content"}}>{street}</h4>
      </div>
      <p>{city}, {postcode}</p>
    </div>
  )

}  
  
  