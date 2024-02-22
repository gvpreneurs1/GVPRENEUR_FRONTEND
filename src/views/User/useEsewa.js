const useEsewa = () => {
  const openEsewaPortal = async (product) => {
    const response = await fetch("http://localhost:3005/api/esewa/payload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    })

    const { success, formData, esewaLink } = await response.json()

    if (!success) {
      return alert('error')
    }

    createEsewaFormAndSubmit(formData, esewaLink)
  }

  const createEsewaFormAndSubmit = (payload, esewaLink) => {
    const esewaForm = document.createElement('form')

    esewaForm.setAttribute("method", "POST");
    esewaForm.setAttribute("action", esewaLink);

    for (const field in payload) {
      const input = document.createElement("input")

      input.type = "text"
      input.id = field
      input.name = field
      input.setAttribute("value", payload[field])
      input.required = true
      esewaForm.appendChild(input)
    }
    
    document.body.appendChild(esewaForm)
    esewaForm.submit()
  }
  
  return [openEsewaPortal]
}

export default useEsewa