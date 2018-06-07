  var toFund;

$(document).ready(function() {
  getTravelList().then(renderTravelList);
  if (typeof web3 === 'undefined') {
    alert('You need <a href="https://metamask.io/">MetaMask</a> browser plugin to run this example');
  } else console.log("MetaMask detected!");

  $("#create_btn").click(async function (){
    await storeTravel(sha3_256(document.getElementById('dest').value + web3.eth.coinbase),
      document.getElementById('title').value,
      web3.toWei(document.getElementById('goal').value, "ether"),
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
});

function renderTravelList(travelList){
  var status;
  var expires;
  var closeButton;
  var fundButton;
  var contWord;
  console.log('render: '+travelList[0].InArrayIndex)
  $('.list-group').html('');
  for(let t=0; t<travelList.length; t++){

    if(web3.eth.coinbase==travelList[t].owner) {
      if(!travelList[t].closed) {
        closeButton = `<button type="button" class="btn btn-danger btn-lg btn-block" id="abort`+travelList[t].InArrayIndex+`">Close</button>`;
        fundButton = `<button type="button" class="btn btn-primary btn-lg btn-block" id="fund`+travelList[t].InArrayIndex+`">Fund now!</button>`;
        expires = `<p> Expires on <b> `+moment(travelList[t].expiration).format("D MMMM YYYY")+`</b></p>`
      } else {
        closeButton = `<button type="button" class="btn btn-danger btn-lg btn-block" id="abort`+travelList[t].InArrayIndex+`" disabled>Close</button>`
        fundButton = `<button type="button" class="btn btn-primary btn-lg btn-block" id="fund`+travelList[t].InArrayIndex+`" disabled>Fund now!</button>`
        expires = `<p><b>Closed</b></p>`
      }
    } else {
      closeButton =``;
      if(!travelList[t].closed){
        fundButton = `<button type="button" class="btn btn-primary btn-lg btn-block" id="fund`+travelList[t].InArrayIndex+`">Fund now!</button>`    
        expires = `<p> Expires on <b> `+moment(travelList[t].expiration).format("D MMMM YYYY")+`</b></p>`
      } else {
        fundButton = `<button type="button" class="btn btn-primary btn-lg btn-block" id="fund`+travelList[t].InArrayIndex+`" disabled>Fund now!</button>`
        expires = `<p><b>Closed</b></p>`
      }
    }

    if((travelList[t].numberOfContributors>1)||(travelList[t].numberOfContributors==0)){
      contWord = 'contributors';
    } else {contWord='contributor'}

    


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
                      <p><b>`+travelList[t].numberOfContributors+`</b> `+contWord+`</p>
                    </div>  
                </div>
                <div class="col-md-3 text-center">
                    <h2> `+web3.fromWei(travelList[t].balance,'ether')+` / `+web3.fromWei(travelList[t].goal,'ether')+`<small> ether </small></h2>`
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
}

function checkOwner(travel) {
  if(web.eth.coinbase==travel.owner) return true;
  else return false;
}

//UTIL
function clearTravelList() {
  $(".list-group").html('')
}

