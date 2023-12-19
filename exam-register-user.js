
    const nameRegister = document.getElementById('name-register');
    const nameIdRegister = document.getElementById('id-register');
    const nameRegisterEmail = document.getElementById('email-register');
    const registerButton = document.getElementById('register');

    if (registerButton) {
        registerButton.addEventListener('click', function (event) {
            event.preventDefault();

            const nameRegisterValue = nameRegister.value;
            const passwordRegisterValue = nameIdRegister.value;
            const emailRegisterValue = nameRegisterEmail.value;

            const registerToAdd = {
                userName: nameRegisterValue,
                password: passwordRegisterValue,
                email: emailRegisterValue
            };

            fetch('https://localhost:7171/api/Auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(registerToAdd),
            })
            .then ()
                .then(result => {                    
                      alert(`Register: ${nameRegisterValue}`); 
                      window.location.href = "Pre_exam.html";                
                })
                .catch(error => console.log(error));
        });
    }

