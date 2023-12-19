window.onload = () => {
       
        const registerButton = document.getElementById('registerButton');
    
        if (registerButton) {
            registerButton.addEventListener('click', function () {
                window.location.href = 'exam-register-user.html';
            });
        };        
        const login = document.getElementById('login');
        if(login){

        login.addEventListener('click', function (event) {
           event.preventDefault(); 
        const nameLogin = document.getElementById('name-login');    
        const nameIdLogin = document.getElementById('id-login');        

        const nameLoginValue = nameLogin.value;
        const paswordLoginValue = nameIdLogin.value;

        fetch(`https://localhost:7171/api/Auth?username=${nameLoginValue}&password=${paswordLoginValue}`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json'
                }
            })
            .then(response => {
                console.log('response status', response.status);
                return response.json()
            })
            .then(result => {
                if (result.userName !== nameLoginValue) {
                    window.location.href = 'user-not-found-pre-exam.html';
                
                } else {
                    checkAcceptFromSessionStorage(result);
                    console.log(`Login: ${result.userName}`);
                    window.location.href = "exam-login.html";
                    
                }
            })
            .catch(error => console.log(error));
        });
    };
    
        function checkAcceptFromSessionStorage(result) {            
            sessionStorage.clear();           
                sessionStorage.setItem('userResult', JSON.stringify(result));
                sessionStorage.setItem(`${result.userName}`, 'accept');
                console.log('Pridėtas į sessionStorage');           
    
        };
   
};
