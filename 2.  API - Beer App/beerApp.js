function BeerApp() {
    this.dataProcessingService = new DataProcessingService();

    this.result = document.getElementById("result");
    this.mainContainer = document.getElementById("mainContainer");
    this.beerBarBtn = document.getElementById("beerBarBtn");
    this.allBeers = document.getElementById("allBeers");
    this.randomBeer = document.getElementById("randomBeer");
    this.selectionBtn = document.getElementById("selectionBtn");
    this.backBtn = document.getElementById("backBtn");
    this.backBtnDiv = document.getElementById("backBtnDiv");
    this.pageNavigation = document.getElementById("pageNavigation");
    
    this.sortByName = document.getElementById("sortByName");
    this.alcoholByVolume = document.getElementById("alcoholByVolume");
    this.firstBrewed = document.getElementById("firstBrewed");
    this.beerBitterness = document.getElementById("beerBitterness");

    this.searchBtn = document.getElementById("searchBtn");
    this.searchInput = document.getElementById("searchInput");

    this.pageSizeBtn = document.getElementById("pageSize");
    this.prevBtn = document.getElementById("prev");
    this.nextBtn = document.getElementById("next");
    
    this.currentPage = 1;
    this.maxPages = 0;
    this.pageSize = 8;

   
    this.init = function() {

        this.beerBarBtn.addEventListener("click", () => {
            this.mainContainer.style.display = "block";

            this.result.style.display = "none";
            this.selectionBtn.style.display = "none";
            this.pageNavigation.style.display = "none";
            this.backBtnDiv.style.display = "none";
            this.backBtn.style.display = "none";
            
        });
        
        this.allBeers.addEventListener("click", () => {

            this.dataProcessingService.getAllBeers(this.result);
            this.toggleSelectBtns(this.result);
            this.mainContainer.style.display = "block";
            this.pageNavigation.style.display = "none";
        });

        this.randomBeer.addEventListener("click", () => {
            this.dataProcessingService.getRandomBeer(this.result);
            this.selectionBtn.style.display = "none"; 
            this.mainContainer.style.display = "block";
            this.pageNavigation.style.display = "none";
        });

        this.result.addEventListener("click", (event) => {
            //console.log(event.target);

            if (event.target.matches(".btn")) {
                //console.log("tocno");
                let id = event.target.id;
                this.dataProcessingService.getMoreDetailsById(id, this.result);

                this.selectionBtn.style.display = "none";
                this.backBtnDiv.style.display = "block";
                this.backBtn.style.display = "block";
                this.pageNavigation.style.display = "none";
            }     
        });

        this.backBtn.addEventListener("click", () => {
            this.dataProcessingService.getAllBeers(this.result);
            this.toggleSelectBtns(this.result);
            this.backBtnDiv.style.display = "none";
            this.mainContainer.style.display = "block";
        });

        this.sortByName.addEventListener("click", () => {
            this.dataProcessingService.getBeersByName(this.result);
           
        });

        this.alcoholByVolume.addEventListener("click", () => {
            this.dataProcessingService.getBeersByAlcohol(this.result);
        });

        this.firstBrewed.addEventListener("click", () => {
            this.dataProcessingService.getFirstBrewed(this.result);
        });

        this.beerBitterness.addEventListener("click", () => {
            this.dataProcessingService.getBeerBitterness(this.result);
        });


        this.searchBtn.addEventListener("click", () => {
            this.beerName();
            this.mainContainer.style.display = "none";
            this.pageNavigation.style.display = "none";
        });

        this.searchInput.addEventListener("keyup", () => {
            this.beerName();
            this.mainContainer.style.display = "none";
            this.pageNavigation.style.display = "none";
        });

       
        this.pageSizeBtn.addEventListener("change", (event) => {

            this.pageSize = event.target.value;
            console.log(this.pageSize);
            this.dataProcessingService.beerPagination(this.currentPage, this.pageSize, this.result);
            
            this.maxPages = this.dataProcessingService.getMaxPages(this.pageSize).then(res => {
                console.log(res); 
                this.maxPages = res; 
            });

            this.pageNavigation.style.display = "block";
        });
        
        this.prevBtn.addEventListener("click", () => {
            
            if(this.currentPage <= 1) {
                return;
            }
            this.currentPage--;
            this.dataProcessingService.beerPagination(this.currentPage, this.pageSize, this.result);
        });

        this.nextBtn.addEventListener("click", () => {

            if(this.currentPage >= this.maxPages) {
                return;
            }
            this.currentPage++;
            this.dataProcessingService.beerPagination(this.currentPage, this.pageSize, this.result);
        });

    };


    this.beerName = function() {
        let name = this.searchInput.value;
        this.dataProcessingService.searchBeerByName(name, this.result);
    }

    this.toggleSelectBtns = function () {
        if (this.result === null) {
            this.selectionBtn.style.display = "none";
            this.result.style.display = "none";
        } else {
            this.selectionBtn.style.display = "block";
            this.result.style.display = "block";
        }
    }
}



function DataProcessingService() {
    this.apiService = new ApiService();


    this.getAllBeers = function (element) {
        this.apiService.getAll()
            .then(response => response.json())
            .then(data => this.mapBeers(data))
            .then( beers => {

                this.showBeers(beers, element)
            })
            .catch(error => {
                // TODO: implement error handling
                console.log(error);
            });
    };


    this.mapBeers = function (beers) {
        return new Promise((resolve, reject) => {
            if (!beers || beers.length === 0) {
                reject("Something went wrong!");
            }

            let mapedBeers = beers.map(beer => {
                return {
                    id: beer.id,
                    image_url: beer.image_url,
                    name: beer.name,
                    description: beer.description
                }
            });
            resolve(mapedBeers);
        });
    };

    this.showBeers = function(beers, element) {
        element.innerHTML = "";
        let html = `<div class="row">`;

        for (let beer of beers) {
            let col = `<div class="col-md-3 col-sd-6">
                <div class="card mt-3 bg-light" style="width: 18rem;">
                    <img class="card-img-top" height="200" src="${beer.image_url}" alt="${beer.name}">
                    <div class="card-body">
                        <h5 class="card-title">${beer.name}</h5>
                        <p class="card-text">${beer.description}</p>
                        <a href="#backBtnDiv" id="${beer.id}" class="btn btn-dark">More details</a>
                    </div>
                </div>
            </div>`;
            html += col;
            
        }
        html += "</div>";
        element.innerHTML = html;
    };
  

    this.getRandomBeer = function (element) {
        this.apiService.getRandom()
            .then(response => response.json())
            .then(data => this.mapMoreDetails(data))
            .then( beers => {

                this.showMoreDetails(beers, element)
            })
            .catch(error => {
                // TODO: implement error handling
                console.log(error);
            });

    };

    
    this.mapMoreDetails = function (beers) {
        return new Promise((resolve, reject) => {
            if (!beers || beers.length === 0) {
                reject("Something went wrong!");
            }
            
            let mapedMoreDetails = beers.map(beer => {
                return {
                    id: beer.id,
                    name: beer.name,
                    tagline: beer.tagline,
                    first_brewed: beer.first_brewed,
                    description: beer.description,
                    image_url: beer.image_url,
                    abv: beer.abv,
                    ibu: beer.ibu,
                    food_pairing: beer.food_pairing
                }
            });
            resolve(mapedMoreDetails);
        });
    };


    this.showMoreDetails = function(beers, element) {
        element.innerHTML = "";
        let html = `<div class="row">`;

        for (let beer of beers) {
            let cardDetails = `<div class="col-sm-6">
                    <div class="card-body mb-3 rounded bg-light">
                        <img class="" src="${beer.image_url}" alt="${beer.name}">
                    </div>
                </div>

                <div class="col-sm-6">
                    <div class="card">
                        <div class="card-body bg-light">
                            <div class="card-header">
                                <h5 class="card-title">${beer.name}</h5><p>"${beer.tagline}"</p>
                            </div>
                            
                            </br>
                            <p class="card-text">${beer.description}</p>
                            </br>
                            <p class="card-text">Brewed: "${beer.first_brewed}"</p> 
                            <p class="card-text">Alcohol: ${beer.abv}%</p> 
                            <p class="card-text">Bitterness: ${beer.ibu} IBU</p> 

                            </br>
                            <ul class="list-group list-group-flush">
                                <h5>Food pairing</h5>
                                <li class="list-group-item">${beer.food_pairing[0]}</li>
                                <li class="list-group-item">${beer.food_pairing[1]}</li>
                                <li class="list-group-item">${beer.food_pairing[2]}</li>
                            </ul>
                        </div>
                    </div>
                </div>`;
            
            html += cardDetails;
            
        }
        html += "</div>";
        element.innerHTML = html;
    };


    this.getMoreDetailsById = function (id, element) {
        this.apiService.getBeerId(id)
            .then(data => this.mapMoreDetails(data))
            .then( beers => {

                this.showMoreDetails(beers, element)
            })
            .catch(error => {
                // TODO: implement error handling
                console.log(error);
            });

    }

    this.getBeersByName = function (element) {
        this.apiService.getAll()
            .then(response => response.json())
            .then(data => this.sortBeersByName(data))
            .then( beers => {

                this.showBeers(beers, element)
            })
            .catch(error => {
                // TODO: implement error handling
                console.log(error);
            });

    };

    this.sortBeersByName = function (beers) {
        return new Promise((resolve, reject) => {
            if (!beers || beers.length === 0) {
                reject("Something went wrong!");
            }

            let sortByName = beers.sort((beer1, beer2) =>
            beer1.name.localeCompare(beer2.name));

            resolve(sortByName);
        });
    };


    this.getBeersByAlcohol = function (element) {
        this.apiService.getAll()
            .then(response => response.json())
            .then(data => this.sortBeersByAlcohol(data))
            .then( beers => {

                this.showMoreDetails(beers, element)
            })
            .catch(error => {
                // TODO: implement error handling
                console.log(error);
            });

    };

    this.sortBeersByAlcohol = function (beers) {
        return new Promise((resolve, reject) => {
            if (!beers || beers.length === 0) {
                reject("Something went wrong!");
            }

            let sortByAlcohol = beers.sort((beer1, beer2) =>
            beer1.abv - beer2.abv);

            resolve(sortByAlcohol);
        });
    };


    this.getFirstBrewed = function (element) {
        this.apiService.getAll()
            .then(response => response.json())
            .then(data => this.sortBeersByFirstBrewed (data))
            .then( beers => {

                this.showMoreDetails(beers, element)
            })
            .catch(error => {
                // TODO: implement error handling
                console.log(error);
            });

    };

    this.sortBeersByFirstBrewed = function (beers) {
        return new Promise((resolve, reject) => {
            if (!beers || beers.length === 0) {
                reject("Something went wrong!");
            }
    
            let sortByFirstBrewed = beers.sort((beer1, beer2) =>
            new Date(`01/${beer1.first_brewed}`) - new Date(`01/${beer2.first_brewed}`));
          
            resolve(sortByFirstBrewed);
        });
    };

    
    this.getBeerBitterness = function (element) {
        this.apiService.getAll()
            .then(response => response.json())
            .then(data => this.sortBeersByBitterness (data))
            .then( beers => {

                this.showMoreDetails(beers, element)
            })
            .catch(error => {
                // TODO: implement error handling
                console.log(error);
            });

    };

    this.sortBeersByBitterness = function (beers) {
        return new Promise((resolve, reject) => {
            if (!beers || beers.length === 0) {
                reject("Something went wrong!");
            }

            let sortByBitterness = beers.sort((beer1, beer2) =>
            beer1.ibu - beer2.ibu);

            resolve(sortByBitterness);
        });
    };


    this.searchBeerByName = async function (name, element) {
        let data = await this.apiService.searchByName(name);
        let beers = await this.mapBeers(data);
        this.showBeers(beers, element);
    };



    this.beerPagination = async function (page, pageSize, element) {

        let data = await this.apiService.getBeersPerPage(page, pageSize);
        let beers = await this.mapBeers(data);

        return this.showBeers(beers, element);
    };


    this.getMaxPages = function (pageSize) {
        return new Promise((resolve, reject) => {
            this.apiService.getAll()
            .then(response => response.json())
            .then( beers => {

                console.log(beers.length);
                let max = Math.ceil(beers.length / pageSize);
                console.log(max);
                resolve(max);
                
            })
            .catch(error => {
                // TODO: implement error handling
                reject(0);
                console.log(error);
            });
        });
    }; 


}



function ApiService() {

    this.baseUrl = "https://api.punkapi.com/v2/";
    
    this.getAll = function () {
        let url = `${this.baseUrl}beers?per_page=80`;
        //console.log("getAll", url);
        return fetch(url);
    };

    this.getRandom = function () {
        let urlRandom = `${this.baseUrl}beers/random`;
        return fetch(urlRandom);
    };

    this.getBeerId = async function (id) {

        let urlId = `${this.baseUrl}beers?ids=${id}`;
        let response = await fetch(urlId);
        return await response.json();
    };

    this.searchByName = async function (name) {

        let urlName = `${this.baseUrl}beers?beer_name=${name}`;
        let response = await fetch(urlName);
        return await response.json();
    };


    this.getBeersPerPage = async function (page, pageSize) {
        let urlPage = `${this.baseUrl}beers?page=${page}&per_page=${pageSize}`; 
        let response = await fetch(urlPage);
        return await response.json();
    }

}


let api = new ApiService();
api.getAll();


let beerApp = new BeerApp();
beerApp.init();

