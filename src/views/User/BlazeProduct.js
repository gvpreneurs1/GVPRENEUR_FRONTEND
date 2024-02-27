import React from "react"
import useEsewa from "./useEsewa"

const BlazeProduct = ({ productData }) => {
    const [openEsewaPortal] = useEsewa()
  
    const proceedToBuy = () => {
      const payload = {
          "amount": "100",
          "product_delivery_charge": "0",
          "product_service_charge": "0",
          "product_code": "EPAYTEST",
          "signed_field_names": "total_amount,transaction_uuid,product_code",
          "success_url": "http://localhost:3000/client-login",
          "failure_url": "http://google.com",
          "tax_amount": "0",
          "total_amount": "100",
        }
  
        openEsewaPortal(payload)
    }
  
  
    return (
      <div className="product rounded-md border">
          <button
            type="button"
            onClick={proceedToBuy}
          >
            Buy with esewa
          </button>
      </div>
    )
  }
  
  export default BlazeProduct