  var toFund;

$(document).ready(function() {
  getTravelList().then(renderTravelList);
  if (typeof web3 === 'undefined') {
    alert('You need MetaMask browser plugin to run this example');
  } else console.log("MetaMask detected!");

  $("#create_btn").click(async function (){
    await storeTravel(sha3_256(document.getElementById('dest').value + web3.eth.coinbase),
      document.getElementById('title').value,
      web3.toWei(document.getElementById('goal').value, "finney"),
      document.getElementById('dest').value,
      document.getElementById('desc').value,
      moment(document.getElementById('exp').value).format("D MMMM YYYY"),
      document.getElementById("img"));
    document.getElementById('createModal').style.display='none';
    $('#createModal').find('input').val('')
  });

  $("#send_btn").click(async function (){
    await fundTravel(toFund, document.getElementById('fundAmount').value);
    document.getElementById('fundModal').style.display='none';
    $('#fundModal').find('input').val('');
  });

  $.get("https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=EUR", function(data, status){
    if(status=="success"){
      ethPrice = data["EUR"]
      console.log("Ether price:" + ethPrice);
      document.getElementById("eth-price").innerHTML= `1 <small>finney</small> ≈  <span style="color: #1ac600">` + Number((ethPrice/1000).toFixed(2)) + `</span> <small>EUR</small>`; 
    }
    else alert("Eth price not available")
  });

  $( "#fundAmount" ).change(function() {
  document.getElementById('converter-fund').innerHTML = `<small>≈</small>  <span style="color: #1ac600">` + Number(document.getElementById('fundAmount').value*(ethPrice/1000).toFixed(2)) + `</span> <small>EUR</small>`; 
  });

  $( "#goal" ).change(function() {
  document.getElementById('converter-create').innerHTML = `<small>≈</small>  <span style="color: #1ac600">` + Number(document.getElementById('goal').value*(ethPrice/1000).toFixed(2)) + `</span> <small>EUR</small>`; 
  });
});

function renderTravelList(travelList){
  var status;
  var expires;
  var closeButton;
  var fundButton;
  var contWord;
  $('.list-group').html('');
  for(let t=0; t<travelList.length; t++){

    if(web3.eth.coinbase==travelList[t].owner) {
      if(!travelList[t].closed) {
        closeButton = `<button type="button" class="btn btn-danger btn-lg btn-block" id="abort`+travelList[t].InArrayIndex+`">Close</button>`;
        fundButton = `<button type="button" class="btn btn-primary btn-lg btn-block" id="fund`+travelList[t].InArrayIndex+`">Fund now!</button>`;
        expires = `<p> Expires on <b> `+travelList[t].expiration+`</b></p>`
      } else {
        closeButton = `<button type="button" class="btn btn-danger btn-lg btn-block" id="abort`+travelList[t].InArrayIndex+`" disabled>Close</button>`
        fundButton = `<button type="button" class="btn btn-primary btn-lg btn-block" id="fund`+travelList[t].InArrayIndex+`" disabled>Fund now!</button>`
        expires = `<p><b>Closed</b></p>`
      }
    } else {
      closeButton =``;
      if(!travelList[t].closed){
        fundButton = `<button type="button" class="btn btn-primary btn-lg btn-block" id="fund`+travelList[t].InArrayIndex+`">Fund now!</button>`    
        expires = `<p> Expires on <b> `+travelList[t].expiration+`</b></p>`
      } else {
        fundButton = `<button type="button" class="btn btn-primary btn-lg btn-block" id="fund`+travelList[t].InArrayIndex+`" disabled>Fund now!</button>`
        expires = `<p><b>Closed</b></p>`
      }
    }

    if((travelList[t].numberOfContributors>1)||(travelList[t].numberOfContributors==0)){
      contWord = 'contributors';
    } else {contWord='contributor'}

    $('.list-group').prepend(
      `<a href="#" class="list-group-item" id="travel`+travelList[t].InArrayIndex+`">
                <div class="media col-md-3">
                    <figure class="pull-left">
                        <img class="media-object img-rounded img-responsive" src="`+/*"https://media-cdn.tripadvisor.com/media/photo-s/06/5b/f4/fb/view-from-the-top.jpg"+*/travelList[t].img+`" heigth="250" width="350">
                    </figure>
                </div>
                <div class="col-md-6">
                    <h4 class="title">`+travelList[t].title+`</h4>
                    <p class="description"> `+travelList[t].description+` 
                    </p>
                    <div class="stars">
                      <p><b>`+travelList[t].numberOfContributors+`</b> `+contWord+`</p>
                    </div>  
                </div>
                <div class="col-md-3 text-center">
                    <h4 class="finney">`+web3.fromWei(travelList[t].balance,'finney')+`<small> / </small>`+web3.fromWei(travelList[t].goal,'finney')+`<small> finney </small></h4>
                    <h6 class="eur">(<span style="color: #1ac600">`+Number(web3.fromWei(travelList[t].goal,'finney')*(ethPrice/1000)).toFixed(2)+`</span> <small>EUR</small>)</h6>`
                    +fundButton+closeButton+
                    `<div class="stars">`
                      +expires+ 
                    `</div>   
                </div>
          </a>`
    );
    $("#fund"+travelList[t].InArrayIndex).click(function () {
      document.getElementById('fundModal').style.display='block';
      toFund=travelList[t].id;
    });
    $("#abort"+travelList[t].InArrayIndex).click(function () {
    abortTravel(travelList[t].id);
    });
  }
  console.log('> rendered')
}

//UTIL
function clearTravelList() {
  $(".list-group").html('')
}

