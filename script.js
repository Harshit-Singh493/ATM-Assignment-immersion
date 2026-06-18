const actual_pin = '123456'
const inputs = document.querySelectorAll('.opt-field')

inputs.forEach((input, index) => {

  input.addEventListener('focus', () => input.select())
  input.addEventListener('input', (e) => {
    const value = e.target.value
    if (value.length > 1) {
      handlePaste(value)
      return;
    }
    if (value && index < inputs.length - 1) {      
      inputs[index + 1].focus();
    }
  })

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Backspace' && !e.target.value && index > 0) {
      inputs[index - 1].focus()
    }
  })
})

function handlePaste(data) {
  const pasteData = data.trim().slice(0, inputs.length);
  if (/^\d+$/.test(pasteData)) {
    pasteData.split('').forEach((char, i) => {
      if (inputs[i]) {
        inputs[i].value = char
        if (i === pasteData.length - 1 || i === inputs.length - 1) {
          inputs[i].focus()
        }
      }
    })
  }
}

function validate_otp() {
  const otp = [...inputs]
    .map(input => input.value)
    .join('');

  if (otp === actual_pin) {
    alert('PIN is Correct...Redirecting')
    window.location.href = 'https://harshit-singh493.github.io/ATM-Assignment-immersion/dashboard.html'
  } else {
    inputs.forEach(e => e.value = '')
    alert("Wrong OTP")
  }
}