  var toFund;

$(document).ready(function() {
  getTravelList().then(renderTravelList);
  if (typeof web3 === 'undefined') {
    alert('You need <a href="https://metamask.io/">MetaMask</a> browser plugin to run this example');
  } else console.log("MetaMask detected!");

  $("#create_btn").click(async function (){
    var tx = await storeTravel(sha3_256(document.getElementById('dest').value + web3.eth.coinbase),
      document.getElementById('title').value,
      web3.toWei(document.getElementById('goal').value, "ether"),
      document.getElementById('dest').value,
      document.getElementById('desc').value,
      document.getElementById('exp').value,
      document.getElementById("img"));
    document.getElementById('createModal').style.display='none';
    /*var result = await web3.eth.getTransactionReceiptMined(tx)
    console.log('Transaction status: '+ result.status); 
    console.log('Block hash: ' + result.blockHash);
    var travelList = await getTravelList();
    renderTravelList(travelList);*/
  });

  $("#send_btn").click(async function (){
    var tx = await fundTravel(toFund, document.getElementById('fundAmount').value);
    /*var result = await web3.eth.getTransactionReceiptMined(tx)
    console.log('Transaction status: '+ result.status); 
    console.log('Block hash: ' + result.blockHash);
    var travelList = await getTravelList();
    renderTravelList(travelList);*/
    document.getElementById('fundModal').style.display='none';
  });
});

function renderTravelList(travelList){
  var status;
  console.log('render: '+travelList[0].InArrayIndex)
  $('.list-group').html('');
  for(let t=0; t<travelList.length; t++){
    if(!travelList[t].closed){
      status='OPEN'
    } else{
      status='CLOSED'
    }
    $('.list-group').prepend(
      `<a href="#" class="list-group-item" id="travelexample" id="travel`+travelList[t].InArrayIndex+`">
                <div class="media col-md-3">
                    <figure class="pull-left">
                        <img class="media-object img-rounded img-responsive" src="`+/*"https://media-cdn.tripadvisor.com/media/photo-s/06/5b/f4/fb/view-from-the-top.jpg"+*/travelList[t].img+`" heigth="250" width="350">
                    </figure>
                </div>
                <div class="col-md-6">
                    <h4 class="list-group-item-heading">`+travelList[t].title+`</h4>
                    <p class="list-group-item-text"> `+travelList[t].description+` 
                    </p>
                    <div class="stars">
                      <p>Status: <small><b>`+status+`</b></small> with <b>`+travelList[t].numberOfContributors+`</b> contributors</p>
                    </div>  
                </div>
                <div class="col-md-3 text-center">
                    <h2> `+web3.fromWei(travelList[t].balance,'ether')+` / `+web3.fromWei(travelList[t].goal,'ether')+`<small> ether </small></h2>
                    <button type="button" class="btn btn-primary btn-lg btn-block" id="fund`+travelList[t].InArrayIndex+`">Fund now!</button>
                    <button type="button" class="btn btn-danger btn-lg btn-block" id="abort`+travelList[t].InArrayIndex+`">Close</button>
                    <div class="stars">
                      <p> Expiration <small> : </small> `+travelList[t].expiration+` </p>  
                    </div>   
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
}

//UTIL
function clearTravelList() {
  $(".list-group").html('')
}

function renderSingleTravel(travelData) {
  var status;
  if(!travelData.closed){
      status='OPEN'
    } else{
      status='CLOSED'
    }
    $('.list-group').prepend(
      `<a href="#" class="list-group-item" id="travelexample" id="travel`+travelData.InArrayIndex+`">
                <div class="media col-md-3">
                    <figure class="pull-left">
                        <img class="media-object img-rounded img-responsive" src="`+/*"https://media-cdn.tripadvisor.com/media/photo-s/06/5b/f4/fb/view-from-the-top.jpg"+*/travelData.img+`" heigth="250" width="350">
                    </figure>
                </div>
                <div class="col-md-6">
                    <h4 class="list-group-item-heading">`+travelData.title+`</h4>
                    <p class="list-group-item-text"> `+travelData.description+` 
                    </p>
                    <div class="stars">
                      <p>Status: <small><b>`+status+`</b></small> with <b>`+travelData.numberOfContributors+`</b> contributors</p>
                    </div>  
                </div>
                <div class="col-md-3 text-center">
                    <h2> `+web3.fromWei(travelData.balance,'ether')+` / `+web3.fromWei(travelData.goal,'ether')+`<small> ether </small></h2>
                    <button type="button" class="btn btn-primary btn-lg btn-block" id="fund`+travelData.InArrayIndex+`">Fund now!</button>
                    <button type="button" class="btn btn-danger btn-lg btn-block" id="abort`+travelData.InArrayIndex+`">Close</button>
                    <div class="stars">
                      <p> Expiration <small> : </small> `+travelData.expiration+` </p>  
                    </div>   
                </div>
          </a>`
    );
    $("#fund"+travelData.InArrayIndex).click(function () {
      document.getElementById('fundModal').style.display='block';
      toFund=travelData.id;
    });
    $("#abort"+travelData.InArrayIndex).click(function () {
    abortTravel(travelData.id);
    });
}