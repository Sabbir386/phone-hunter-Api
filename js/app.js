const loadPhones = async (searchText,dataLimit) => {
    const URL=`https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res=await fetch (URL);
    const data=await res.json();
    displayPhones(data.data,dataLimit);
}
const displayPhones= (phones,dataLimit) =>{
   // maximum 20 phones 
    const showAll=document.getElementById('show-all');
    if(dataLimit && phones.length>10){
    phones=phones.slice(0,10);
    showAll.classList.remove('d-none');
    }
    else{
        showAll.classList.add('d-none');
    }
    const phonesContainer=document.getElementById('phones-container');
    phonesContainer.innerHTML="";

    
    // dispaly no phones 
    const noPhoneDetect=document.getElementById('no-found matching');
     if(phones.length===0){
        noPhoneDetect.classList.remove('d-none');
     }
     else{
        noPhoneDetect.classList.add('d-none');
     }
    // display all phons 
    phones.forEach(phone => {
        phoneDiv=document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML=`
                      <div class="card p-4">
                      <img src="${phone.image}" class="card-img-top" alt="...">
                      <div class="card-body">
                        <h5 class="card-title">${phone.phone_name}</h5>
                        <p class="card-text">${phone.slug}</p>
                      </div>
                    </div>
        `
        phonesContainer.appendChild(phoneDiv);
    });
    // stop Loader spinner 
    toggleSpinner(false);

}
 const processSearch=(dataLimit)=>{
    toggleSpinner(true);
    const searchField=document.getElementById('search-field');
    const searchText=searchField.value;
    //document.getElementById('search-field').value="";
    loadPhones(searchText,dataLimit);
 }
document.getElementById('btn-search').addEventListener('click', function(){
    processSearch(10);
})

const toggleSpinner= isLoading =>{
    const loaderSection=document.getElementById('loader');
    if(isLoading===true){
        loaderSection.classList.remove('d-none');
    }
    else{
        loaderSection.classList.add('d-none');
    }
}


// this is not the the best way to all data 
document.getElementById('btn-show-all').addEventListener('click',function(){
    processSearch();
})

// loadPhones();