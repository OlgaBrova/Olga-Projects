const API_URL = 'http://localhost:3000';

const getBtn = document.querySelector("#getBtn");
const posts = document.querySelector("#posts");
const postBtn = document.querySelector("#postBtn");
const userForm = document.querySelector("#userForm");
const saveUser = document.querySelector("#saveUser");


const inputCompany = document.getElementById("inputCompany");
const inputWebsite = document.getElementById("inputWebsite");
const inputOwner = document.getElementById("inputOwner");
const inputStreet = document.getElementById("inputStreet");
const inputCity = document.getElementById("inputCity");
const inputEmail = document.getElementById("inputEmail");
const inputDescription = document.getElementById("inputDescription");


getBtn.addEventListener('click', () => {
    getPosts();
    userForm.style.display = "none";
    posts.style.display = "block";
   
});

postBtn.addEventListener('click', () => {
    userForm.style.display = "block";
    posts.style.display = "none";
});

saveUser.addEventListener('click', (e) => {
    e.preventDefault();

    let user = getFormInput();
    addNewUser(user);

});



const getFormInput = () => {
    const company = inputCompany.value;
    const website = inputWebsite.value;
    const owner = inputOwner.value;
    const street = inputStreet.value;
    const city = inputCity.value;
    const email = inputEmail.value;
    const description = inputDescription.value;

    const newUser = {
        name: owner,
        email: email,
        address: {
            street: street,
            city: city
        },
        website: website,
        company: {
            name: company,
            bs: description
        }
    };

    return newUser;
}


const addNewUser = (newUser) => {
    fetch(`${API_URL}/posts`, {
        method: 'POST',
        headers: {
            "Content-Type": "text/plain"
        },
        body: JSON.stringify(newUser)
    })
    .then((response) => response.json())
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.log(error);
    })  
}


const getPosts = () => {
    fetch(`${API_URL}/posts`)
        .then((response) => response.json())
        .then((result) => {
            
            renderPosts(result);
        })
}


const renderPosts = (users) => {
    let inner = '';
    inner += `<div class="row">`;
    
    users.forEach(user => {
            inner += `<div class="col-md-4 col-sd-6 my-3" >
                    <div class="card">
                        <div class="card-body bg-light">
                            <div class="card-header">
                                <h3 class="card-title">${user.company.name}</h3>
                                <h5>Website: "${user.website}"</h5>
                            </div>
                            
                            </br>
                            <h4 class="card-text">Owner:${user.name}</h4>
                            </br>
                            <h5 class="card-text">Address: "${user.address.street}"</h5> 
                            <h5 class="card-text">City: ${user.address.city}</h5> 
                            <h5 class="card-text">Email: ${user.email}</h5> 

                            </br>
                            <ul class="list-group list-group-flush">
                                <h5>Company description</h5>
                                <p>${user.company.bs}</p>
                            </ul>
                        </div>
                    </div>
                </div>`;
    });
    inner += `</div>`;
    posts.innerHTML = inner;
  
}

