import axios from "axios";

function Landing() {

  const handlePayment = async () => {
    const url = "http://localhost:3005/api/e-sewa";

    try {
        const response = await axios.post(url, {}, {
          headers: {
            "Content-Type": "application/json",
            /// Add any other headers as needed
          },
        });
  
        /// Check if the request was successful (status code 2xx)
        if (response.status === 200) {
          const responseData = response.data;
          console.log(responseData);
          esewaCall(responseData.formData);
        } else {
          console.error("Failed to fetch:", response.status, response.statusText);
        }
      } catch (error) {
        console.error("Error during fetch:", error);
      }
    };


  const esewaCall = (formData) => {
    console.log(formData);
    var path = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

    var form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", path);

    for (var key in formData) {
      var hiddenField = document.createElement("input");
      hiddenField.setAttribute("type", "hidden");
      hiddenField.setAttribute("name", key);
      hiddenField.setAttribute("value", formData[key]);
      form.appendChild(hiddenField);
    }

    document.body.appendChild(form);
    form.submit();
  };

  return (
    <>
      <h1>Esewa Test</h1>
      <button
        style={{ background: "#55aa33", margin: 10 }}
        onClick={() => handlePayment()}
      >
        Handle Esewa Payment
      </button>

    </>
  );
}

export default Landing;