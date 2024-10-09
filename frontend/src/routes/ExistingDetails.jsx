import { useEffect, useState } from "react";
import { MapPin, Plus, ArrowLeft } from "lucide-react";
import Navbar from "../components/Navbar";
import api from "../api";
import { useLocation, useNavigate } from "react-router";

export default function ExistingAddress() {
  const [customer, setCustomer] = useState();
  const [addresses, setAddresses] = useState([]);
  const [useAnotherAddress, setUseAnotherAddress] = useState(false);
  const [hasSubmit, sethasSubmit] = useState(false);

  const location = useLocation();
  const { orderItems } = location.state;
  const navigate = useNavigate();

  useEffect(() => {
    async function getCustomer() {
      const res = await api.get("api/customers/me");
      setCustomer(res.data);
      setAddresses(
        res.data.address_details.map((address) => ({
          ...address,
          selected: false,
        })),
      );
    }
    getCustomer();
  }, []);

  function selectAddress(id) {
    setUseAnotherAddress(false);
    setAddresses((address) =>
      address.map((add) => {
        if (add.id === id) {
          return { ...add, selected: true };
        } else {
          return { ...add, selected: false };
        }
      }),
    );
  }

  function handleAnotherAddress() {
    selectAddress((address) =>
      address.map((add) => ({ ...add, selected: false })),
    );
    setUseAnotherAddress(true);
  }

  function deliveryDate(daysToAdd){
    const currentDate = new Date();
    let addedDays = 0;

    while (addedDays < daysToAdd) {
      currentDate.setDate(currentDate.getDate() + 1);

      // Check if the current day is a weekday (Monday to Friday)
      if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
        addedDays++;
      }
    }
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }


  async function handleSubmit() {
    if (useAnotherAddress) {
      // change the screen to have new address input
      sethasSubmit(true);
    } else {
      const selectAddress_id = addresses.filter(
        (address) => address.selected === true,
      )[0].id;
      const order_response = await api.post("/api/orders/", {
        customer: customer.id,
        customer_address: selectAddress_id,
        delivery_date: deliveryDate(4),
        total_amount: 59.99
      });
      async function createOrderItem(item) {
        await api.post("/api/orderitems/", {
          order_id: order_response.data.id,
          meal_id: item.id,
          quantity: item.quantity,
        });
        console.log("posted");
      }
      await Promise.all(orderItems.map((item) => createOrderItem(item)));
      navigate("/cart", { state: { order_id: order_response.data.id } });
    }
  }

  const [newAddressDetails, setNewAddressDetails] = useState({
    postcode: "",
    city: "",
    county: "",
    address: "",
  });

  function handleNewAddressChange(event) {
    setNewAddressDetails((prevAddressDetails) => {
      return { ...prevAddressDetails, [event.target.name]: event.target.value };
    });
  }

  async function handleNewAddressSubmit() {
    const newadd_res = await api.post("api/customers/add_address/", {
      postcode: newAddressDetails.postcode,
      address: newAddressDetails.address,
      county: newAddressDetails.county,
      city: newAddressDetails.city,
    });
    const order_response = await api.post("/api/orders/", {
      customer: customer.id,
      customer_address: newadd_res.data.id,
      delivery_date: "2024-10-21",
      total_amount: 59.99
    });
    async function createOrderItem(item) {
      await api.post("/api/orderitems/", {
        order_id: order_response.data.id,
        meal_id: item.id,
        quantity: item.quantity,
      });
    }
    await Promise.all(orderItems.map((item) => createOrderItem(item)));
    navigate("/cart", { state: { order_id: order_response.data.id } });
  }

  function goBack() {
    setUseAnotherAddress(false);
  }

  //    console.log(customer)
  // console.log(selected.length > 0 && selected[0].id)

  return (
    <div>
      <Navbar />
      <div className="existing-container">
        <h2>Select a Previously Used Address</h2>
        {hasSubmit && useAnotherAddress ? (
          <div className="new-address-form-container">
            <button
              className="existing-customer-submit"
              onClick={goBack}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ArrowLeft color="#FFFFFF" /> Go Back
            </button>
            <div>
              <label htmlFor="postcode">Postcode</label>
              <input
                name="postcode"
                value={newAddressDetails.postcode}
                id="postcode"
                onChange={handleNewAddressChange}
              />
            </div>

            <div>
              <label htmlFor="city">City/Town</label>
              <input
                name="city"
                value={newAddressDetails.city}
                id="city"
                onChange={handleNewAddressChange}
              />
            </div>

            <div>
              <label htmlFor="county">County</label>
              <input
                name="county"
                value={newAddressDetails.county}
                id="postcode"
                onChange={handleNewAddressChange}
              />
            </div>
            <div>
              <label htmlFor="address">Address</label>
              <input
                name="address"
                value={newAddressDetails.address}
                id="address"
                onChange={handleNewAddressChange}
              />
            </div>
            <button
              className="existing-customer-submit"
              onClick={handleNewAddressSubmit}
            >
              Next
            </button>
          </div>
        ) : (
          <div>
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
            <div
              className="address-card"
              onClick={handleAnotherAddress}
              style={{
                border: useAnotherAddress
                  ? "solid #000000 1px"
                  : "solid transparent 1px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "none",
                  margin: "none",
                  gap: "0.5rem",
                }}
              >
                <Plus /> <h4>Or Use Another Address</h4>
              </div>
            </div>
            <button className="existing-customer-submit" onClick={handleSubmit}>
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// eslint-disable-next-line react/prop-types
function AddressCard({ id, street, city, postcode, selectAddress, selected }) {
  return (
    <div
      className="address-card"
      onClick={() => selectAddress(id)}
      style={{
        border: selected ? "solid #000000 1px" : "solid transparent 1px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "none",
          margin: "none",
          gap: "0.5rem",
        }}
      >
        <MapPin />
        <h4 style={{ margin: 0, border: "none", height: "fit-content" }}>
          {street}
        </h4>
      </div>
      <p>
        {city}, {postcode}
      </p>
    </div>
  );
}
