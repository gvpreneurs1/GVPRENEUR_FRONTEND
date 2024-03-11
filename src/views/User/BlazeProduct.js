import React from "react"
import useEsewa from "./useEsewa"

const BlazeProduct = ({ productData }) => {
    const [openEsewaPortal] = useEsewa()
  
    const proceedToBuy = () => {
      const payload = {
          "amount": "1000",
          "product_delivery_charge": "0",
          "product_service_charge": "0",
          "product_code": "EPAYTEST",
          "signed_field_names": "total_amount,transaction_uuid,product_code",
          "success_url": "http://localhost:3005/api/esewa-success",
          "failure_url": "http://localhost:3000/get-client-course",
          "tax_amount": "0",
          "total_amount": "1000",
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